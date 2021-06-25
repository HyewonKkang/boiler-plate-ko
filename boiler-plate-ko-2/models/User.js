const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10;
var jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next) { // save 전 실행 후 next로 (index.js -> user.save)
    var user = this;

    if(user.isModified('password')) { // 사용자가 비밀번호를 번경할 때만 암호화
        // 비밀번호 암호화 시킴
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) { // hash = 암호화된 비밀번호
                if(err) return next(err)
                user.password = hash // plainPassword -> hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {

    // plainPassword 123456      암호화된 비밀번호 $2b$10$udcL4s1x6dkusiKfFz7.F.izkr52gWARbjS/PKnmzNJ.vkc0CGL1i
    // plainPassword를 암호화해야함
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb) {

    var user = this;

    //jsonwebtoken을 이용해서 toekn을 생성하기
    let token = jwt.sign(user._id.toHexString(),'secretToken')

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    // user._id + '' = token
    // 토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id" : decoded, "token": token}, function(err,user) {
            if(err) return cb(err);
            cb(null, user)
          })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }
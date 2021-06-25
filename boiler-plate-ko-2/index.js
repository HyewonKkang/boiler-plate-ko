const express = require('express') // 다운받은 express 모듈 가져옴
const app = express() // express app 생성
const port = 5000
const { auth } = require('./middleware/auth');
const { User } = require('./models/User')
const cookieParser = require('cookie-parser')
const config = require('./config/key')


// application/x-www-form-urlencoded 타입을 분석해서 가져옴
app.use(express.urlencoded({extended:true}))
// application/json 타입을 분석해서 가져옴
app.use(express.json())
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => { // root directory
  res.send('Hello World!')
})

app.post('/register', (req, res) => { // callback function = (req, res)

  // clinet에서 가져온 회원 가입 시 필요한 정보들을 데이터 베이스에 넣어준다
  const user = new User(req.body)

  user.save((err, userInfo) => { // 받아온 정보들을 user모델에 저장
    if(err) return res.json({ success: false, err }) //json 형식으로 전달
    return res.status(200).json({ success: true })
  }) // 받아온 정보들을 user모델로 저장
  
})

app.post('/login', (req, res) => {

  // 요청된 이메일을 데이터베이스에서 있는지 찾음
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    } 

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => { // 참고 : 함수는 User.js에 있음
      if(!isMatch) return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})

      // 비밀번호까지 맞다면 토큰을 생성
      user.generateToken((err, user) => { // User.js의 generateToken()에서 user 전달받음
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에 ? 쿠키 / 로컬스토리지 등 여러 방법 존재
        res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id })
      })
    })
  }) 
})

// role 0 -> 일반유저, role 0이 아니면 관리자
app.get('/api/users/auth', auth, (req, res) => {
  // 여기까지 미들웨어를 통과했다는 얘기는 Authentication 이 True 라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id},
    {token: ""},
    (err,user) => {
    if(err) return res.json({success:false, err});
      return res.status(200).send({
        success: true
      })
    })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const express = require('express') // 다운받은 express 모듈 가져옴
const app = express() // express app 생성
const port = 5000


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://hyewonKang:sweet0304@boilerplate.twv9r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => { // root directory
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
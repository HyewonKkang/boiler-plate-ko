// 개발환경이 배포 모드일 때 (ex -> heroku 서비스를 통한 배포)
module.exports = {
    mongoURI: process.env.MOMGON_URI
}
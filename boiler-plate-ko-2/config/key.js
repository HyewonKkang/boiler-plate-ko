if (process.env.NODE_ENV === 'production') { // 환경변수(process.env.NODE_ENV) -> production mode
    module.exports = require('./prod')
} else { // development mode
    module.exports = require('./dev')
}
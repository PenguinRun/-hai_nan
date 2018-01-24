require('dotenv').config()

module.exports = {
    mysql: {
      host: process.env.HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE
    },
    facebook: {
        id: process.env.FACEBOOK_APPID,
        key: process.env.FACEBOOK_KEY
    },
    sessionSecret: process.env.SESSION_SECRET,
    secretKey: process.env.SECRET_KEY,
    hostIP: process.env.HOST_IP,
}
const jwt = require('jsonwebtoken')
const {secret} = require('./config')

const check_auth = (token) => {
    try {
        if (!token) {
            return false
        }
        const pay_load = jwt.verify(token, secret)
        return pay_load.user_id
    } catch (e) {
        console.log(e)
        return false
    }
}

module.exports = check_auth;
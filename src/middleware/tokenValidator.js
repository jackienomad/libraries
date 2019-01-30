let jwt = require('jsonwebtoken')
const config = require('../config/config')

let sliceToken = (token) => {
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length)
        }
    }
    return token
}

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']

    if (token) {
        token = sliceToken(token)

        try {
            const decoded = jwt.verify(token, config.secret)
            req.decoded = decoded
            next()
        } catch (e) {
            return res.status(401).send({
                success: false,
                message: 'Token is not valid'
            })
        }
        
    } else {
        return res.status(401).send({
            success: false,
            message: 'Auth token is not supplied'
        })
    }
}

module.exports = {
    checkToken,
    sliceToken
}
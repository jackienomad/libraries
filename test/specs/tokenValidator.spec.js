import { checkToken, sliceToken } from '../../src/middleware/tokenValidator'
import faker from 'faker'
import express from 'express'
import supertest from 'supertest'
import jwt from 'jsonwebtoken'

const { secret } = require('../../src/config/config')

const app = express()
app.use(checkToken)

// mock a test route
app.get('/test/checkToken', (req, res) => {
    return res.status(200).send({success: true})
})

const client = supertest(app)

describe('Token Validator', () => {
    describe('Express middleware', () => {
        // generate token
        const payload = {
            test: 'test'
        }
        const options = {
            expiresIn: '1d'
        }
        const validToken = jwt.sign(payload, secret, options)
        const invalidToken = 'invalid token'

        it('Middleware should return 401 for invalid tokens', async () => {
            const { status, body } = await client.get('/test/checkToken').set('Authorization', `Bearer ${invalidToken}`)
            expect(+status).toBe(401)
        })

        it('Middleware should proceed to route handler for valid tokens', async () => {
            const { status, body } = await client.get('/test/checkToken').set('Authorization', `Bearer ${validToken}`)
            expect(+status).toBe(200)
        })
    })

    describe('check starts of the token', () => {
        it('slice Bearer from token if exist', () => {
            const sampleString = 'code-ninja'
            expect(sliceToken(`Bearer ${sampleString}`)).toBe(sampleString)
        })
    })
})
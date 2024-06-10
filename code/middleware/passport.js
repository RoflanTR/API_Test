const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const dataDB = require('../dataBase/dataDB')
const passport = require('passport')
const keys = require('../keys')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.JWT
}
module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = (await dataDB.findUserById(payload.userId)).dataValues
                const outputData = {id: user.id, email: user.email}
                if (user) {
                    done(null, outputData)
                }
                else {
                    done(null, false)
                }
            } catch (error) {
                console.log(error)
            }
        })
    )
}
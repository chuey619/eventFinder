const passport = require("passport")
const User = require('../models/User')

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.username)
    })

    passport.deserializeUser(async (username, done) => {
        try {
            let foundUser = User.findByUsername(username)
            done(null, foundUser)
        } catch(err) {
            done(err, null)
        }
    })
}
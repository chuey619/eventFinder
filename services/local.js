const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;

const init = require('passport')
const User = require('../models/User')
const authHelpers = require('./auth-helpers')

const options = {}

init()

passport.use(
    new LocalStrategy(options, async (username, password, done) => {
        try {
            let foundUser = await User.findByUsername(username)
        if (!foundUser) {
            return done(null, false)
        }
        if (!authHelpers.comaprePassword(password, user.password_digest)) {
            return done(null, false)
        } else {
            return done(null, user)
        }
        } catch(err) {
            console.log(err)
            return done(err)
        }
        
    })
)

module.exports = passport
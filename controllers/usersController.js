const bcrypt = require('bcryptjs')
const User = require('../models/User')

const usersController = {}

usersController.create = async (req, res, next) => {
    console.log(req.body)
    try {
        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSync(req.body.password, salt)
        let user = new User({
            username: req.body.username,
            name: req.body.name,
            password_digest: hash,
            email: req.body.email
        })
        user = await user.save()
        req.login(user, (err) => {
            if (err) return next(err)
            res.status(201).json({
                message: 'User created',
                auth: true,
                data: {
                    user
                }
            })
        })
    } catch(err) {
        next(err)
    }
}

module.exports = usersController
const bcrypt = require('bcryptjs')

const comparePassword = (userPassword, databasePassword) => {
    return bcrypt.compareSync(userPassword, databasePassword)
}

module.exports = {comparePassword}
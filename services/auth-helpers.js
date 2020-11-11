const bcrypt = reqiure('bcryptjs')

const comaprePassword = (userPassword, databasePassword) => {
    return bcrypt.compareSync(userPassword, databasePassword)
}

module.exports = {comaprePassword}
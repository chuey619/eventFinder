const db = require('../db/config')

class User {
    constructor(user) {
        this.id = user.id || null;
        this.username = user.username;
        this.name = user.name;
        this.password_digest = user.password_digest;
        this.email = user.email;
    }
    static findByUsername = async (username) => {
        try {
            const foundUser = await db.oneOrNone(
                `SELECT * FROM users WHERE username = $1`,
                username
            )
            return new this(foundUser)
        } catch(error) {
            throw new Error('Could not find user')
        }
    }
    static findById = async(id) => {
        try {
            const foundUser = await db.oneOrNone(`SELECT * FROM users WHERE id = $1`,
            id)
            return new this(foundUser)
        } catch(err) {
            throw new Error('Could not find user')
        }
    }
    save = async () => {
        try {
            const user = await db.one(`
            INSERT INTO users
            (username, name, email, password_digest)
            VALUES ($/username/, $/name/, $/email/, $/password_digest/)
            RETURNING *`, this)
            return Object.assign(this, user)
        } catch(error) {
            throw new Error('Could not save user')
        }
    }
}

module.exports = User
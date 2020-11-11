require('dotenv').config()
const options = {
    query: (e) => {
        console.log(e.query)
    }
}

const pgp = require('pg-promise')(options)

const setDatabase = () => {
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        return pgp({
            database: 'event_finder',
            port: 5432,
            host: 'localhost',
            user: 'postgres',
            password: process.env.DB_PASSWORD
        })
    } else if (process.env.NODE_ENV === 'production') {
        return pgp(process.env.DATABASE_URL)
    }
}

module.exports = setDatabase()
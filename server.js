const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const app = express()

require('dotenv').config()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(cookieParser())

app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    console.log('---------', req.user ? req.user : 'Unauthenticated')
    next()
})


app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
    res.send('hello world')
})
const authRoutes = require('./routes/authRouter')
app.use('/auth', authRoutes)
const itemsRoutes = require('./routes/itemsRouter')
app.use('/items', itemsRoutes)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/public', 'index.html'))
})

app.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT,() => {
    console.log(`listening on port ${PORT}`)
})
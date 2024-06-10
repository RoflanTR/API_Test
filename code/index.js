const express = require('express')
const passport = require('passport')
const sequelize = require('./dataBase/connect')
const user = require('./routes/user')
const fileMiddleware = require('./middleware/file')

const app = express()
const PORT = process.env.PORT || 3000


app.use(fileMiddleware.single('avatar'))
app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(express.json())
app.use('/api', user)

async function startServer() {
    try {
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
          })
    } catch (error) {
        console.log(error)
    }
}

startServer()
const express = require('express')
const app = express()

require('dotenv').config()
const port = process.env.PORT

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const dbConnection = require('./db/connection')
dbConnection()

app.use(express.json())

const userRoute = require('./routes/user.route')
app.use('',userRoute)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
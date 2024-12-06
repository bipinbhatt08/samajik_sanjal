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
const profileRoute = require('./routes/profile.route')
const postRoute = require('./routes/post.route')
const friendshipRoute = require('./routes/freindShip.route')
const commentRoute= require('./routes/comment.route')
app.use('',userRoute)
app.use('',profileRoute)
app.use('',postRoute)
app.use('',friendshipRoute)
app.use('',commentRoute)
app.listen(port, () => {
  console.log(`Samajik Sanjal app listening on port ${port}`)
})
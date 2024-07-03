const express = require('express')
const users = require('./MOCK_DATA.json')
const fs = require('fs')
const { CLIENT_RENEG_WINDOW } = require('tls')
const { log } = require('console')
const  {connectMongoDb} = require('./connection')
const userRouter = require('./routes/user')
const {logReqRes} = require('./middlewares/index')

const app  = express()
const PORT=8000

// Connection
connectMongoDb('mongodb://127.0.0.1:27017/project-01').then(()=>{
    console.log("MongoDB connected!")
})


// Middleware - plugin
app.use(express.urlencoded({extended:false}))

app.use(logReqRes('log.txt'))


// Routes
app.use('/api/users', userRouter)



app.listen(PORT,()=>console.log(`Server started at port: ${ PORT}`))


import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connect from "./utils/db.js"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import testRoute from './routes/test.js'
import questionRoute from './routes/question.js'

const app = express()
dotenv.config()

//middlewares

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:"30mb"}))
app.use('/api/auth',authRoute)
app.use('/api/test',testRoute)
app.use('/api/question',questionRoute)

app.listen(5000,()=>{
    console.log("server running at port 5000")
    connect()
})

mongoose.connection.on('connected',()=>{
    console.log("MongoDB connected")
})

mongoose.connection.on('disconnected',()=>{
    console.log("MongoDB disconnected")
})
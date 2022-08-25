const express = require("express");
const passport = require(`passport`)
require(`./middleware/auth.middleware`)(passport)

const userRouter = require("./users/user.router").router
const authRouter = require(`./auth/auth.router`).router
const postRouter = require(`./post/post.router`).router

const app = express()

app.use(express.json())

app.get('/',(req, res)=>{
    res.status(200).json({message: "all ok"})
})

app.use('/api/v1/users', userRouter)
app.use(`/api/v1/auth`, authRouter)
app.use(`/api/v1/posts`, postRouter)

app.listen(8000,()=>{
    console.log("server starte at port 8000");
})
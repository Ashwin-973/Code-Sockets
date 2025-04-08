import express from "express"
import cors from "cors"
import codeBuddy from './routes/codeBuddyRoutes.js'
import UserCreation from './routes/userRoutes.js'
const app=express()
const PORT=3000

app.use(cors()) //sets server's HTTP response headers in a way that CORS policy of the client's browser is obliged (like access-control-allow.....) 
app.use(express.json())

app.get("/",(_,res)=>
{
  res.json("Welcome to code sockets!!")
})


app.listen(PORT,()=>{
    console.log('Your server is all ears!!')
})

app.use('/codebuddy',codeBuddy)
app.use('/user',UserCreation)

// loads .env file contents into process.env by default
// here we imported .env express cors
require('dotenv').config()
const express=require('express')
const cors=require('cors')// diff ports resource sharing only applicable when use cors



// imported router from router.js
const router=require('./router')




// imported connection file for database connection
require("./config/connection")






// using server creating a server through router

const CookBookServer=express()  // here we calls express
CookBookServer.use(cors({
    origin:'https://recipe-app-backend-htqw.onrender.com' //update cors with vercel deployed url

}))  //frontend and backend are in diff port,so brower blocking it for security....so we use cors (cross-origin resource sharing)....then backend will share data to frontend with trustly




// application specific middleware
CookBookServer.use(express.json())
CookBookServer.use(router)




const PORT=4000||process.env.PORT //if browser loads ,4000 is busy then redirected to another port-defined in .env






// listening msg : to check port and server created is running or not
CookBookServer.listen(PORT,()=>{  //here we used a call back fn.
    console.log(`Cook-Book-Server started running at port:${PORT}...and waiting for client request`);
    // take a terminal and command as >nodemon index.js...then if code is correct above msg will be displayed
    
})





// bring data to the browser while search localhost:4000....we use GET 

CookBookServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style ="color:red"> Cook-Book-Server started running </h1>`) //search localhost4000 to see it
})

// These are basic steps for creating server for all project......................
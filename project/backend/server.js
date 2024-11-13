const express = require('express')
const fs = require("fs")
const bodyparser = require('body-parser')
const path = require("path")
// port running server
const port = 3000
// app instance
const app = express()

//render static code from frontend directory
app.use(express.static(path.join(__dirname,'../frontend')))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))



//index route
app.get("/",(req,res)=>{
    res.redirect('index.html')
})



//app listening
app.listen(port,()=>{
    console.log("Backend Connected!")
})


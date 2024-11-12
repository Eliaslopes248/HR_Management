const express = require('express')
const fs = require("fs")
const bodyparser = require('body-parser')
const path = require("path")

const port = 3000


const app = express()

app.use(express.static('../',__dirname,'frontend'))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))




app.listen(port,()=>{
    console.log("Backend Connected!")
})


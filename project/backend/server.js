const express = require('express')
const fs = require("fs")
const bodyparser = require('body-parse')
const path = require("path")

const port = 3000


const app = express()




app.listen(port,()=>{
    console.log("Backend Connected!")
})


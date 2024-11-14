// Use require instead of import
const express = require('express');
const fs = require('fs');
const bodyparser = require('body-parser');
const path = require('path');
const {signup,login} = require('./functions/signup_logic')

// Port running server
const port = 3000;
// App instance
const app = express();

// Render static code from frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Index route
app.get('/', (req, res) => {
  res.redirect('index.html');
});


// Define POST route for signup
app.post('/signup', (req, res) => {
  let formData = req.body;

  if (signup(formData)) {
    res.send('Signed up successfully');
    //hi(formData)
  } else {
    res.send('ERROR!');
  }
});

//define request to login
app.post('/login',(req,res)=>{

  let filedata = req.body;

  if(login(filedata)){
    res.send('Logged in!')
  }else{
    res.send("ERROR!")
  }

})

// Start the server
app.listen(port, () => {
  console.log('Backend Connected!');
});

// Use require instead of import
const express = require('express');
const fs = require('fs');
const bodyparser = require('body-parser');
const path = require('path');
const {handle_signup,handle_login} = require('./functions/signup_logic')
const {displayOrgs,addOrg,removeOrg} = require("./functions/accountpage")

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

  if (handle_signup(formData)) {
    res.redirect('account.html');
    //hi(formData)
  } else {
    res.send('ERROR!');
  }
});

//define request to login
app.post('/login',(req,res)=>{

  let filedata = req.body;

  if(handle_login(filedata)){
    res.redirect('account.html')
    

    //FIXME HAVE FRONT END FETCH REQUEST THE USERS DATA FROM ACCOUNTPAGE.JS
      app.get('/vieworgs',(req,res)=>{
        //send data in JSON format 
          res.json(displayOrgs(filedata))
      })


  }else{
    res.send("ERROR!")
  }

})

// Start the server
app.listen(port, () => {
  console.log('Backend Connected!');
});

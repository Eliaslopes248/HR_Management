// Use require instead of import
const express = require('express');
const fs = require('fs');
const bodyparser = require('body-parser');
const path = require('path');

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

// Handle signup logic
function handle_signup(entry) {
  let STATUS = false;
  const filePath = path.join(__dirname, 'users.json');
  let temp_db = [];

  if (fs.existsSync(filePath)) {
    let filedata = fs.readFileSync(filePath, 'utf-8');
    temp_db = JSON.parse(filedata);
  }

  let newID = temp_db.length+1;
  let password_passes = false;
  entry = {
    ID: newID,
    ...entry,
    organizations:[]
  };

  if(entry.password == entry.confirmpasswordlabel){
    password_passes = true
  }

  while(password_passes){

        let entryExists = temp_db.some(user => user.ID === entry.ID || user.username === entry.username);

      if (!entryExists) {
        temp_db.push(entry);
        STATUS = true;
      } else {
        console.error("Couldn't sign up with those credentials");
      }

      fs.writeFileSync(filePath, JSON.stringify(temp_db, null, 2), 'utf-8');
      console.log('New user created:', entry.username);

      return STATUS;
    }
}

// Define POST route for signup
app.post('/signup', (req, res) => {
  let formData = req.body;

  if (handle_signup(formData)) {
    res.send('Signed up successfully');
  } else {
    res.send('ERROR!');
  }
});

// Start the server
app.listen(port, () => {
  console.log('Backend Connected!');
});

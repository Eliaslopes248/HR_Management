//dependecies
const fs = require('fs')
const path = require('path');
//signup logic
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
  
        password_passes = false
      }
      return STATUS;
  }

//login logic
  function handle_login(entry){
    
    //vars and paths
    let STATUS = false;
    const filePath = path.join(__dirname, 'users.json');
    let temp_db = [];

    //read file
    if(fs.existsSync(filePath)){
        let filedata = fs.readFileSync(filePath,'utf-8')
        temp_db = JSON.parse(filePath)
    }

    //loop through database
    let entryExists = temp_db.some(user => user.password === entry.password || user.username === entry.username);

    if(STATUS){
        return true
    }
  }

  
module.exports = {
            handle_signup,
            handle_login
         }
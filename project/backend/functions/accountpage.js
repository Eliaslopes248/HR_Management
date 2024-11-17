const fs = require('fs')
const path = require("path")

//pass req.body data to function
function displayOrgs(user){

    //database file path
    const filePath = path.join(__dirname, '..','users.json');
    let temp = []


    //read file
    if(fs.existsSync(filePath)){
        let filedata = fs.readFileSync(filePath,'utf-8')
        temp = JSON.parse(filedata)
    }

    //get users profile
    console.log("Current user: ",user)

    //placeholder for current user
    let currentUser;

    //loop to access the logged in user
    temp.forEach(i => {
        let obj = {username:i.username,password:i.password}

        if(obj.username == user.username && obj.password == user.password){
            currentUser = i;
            console.log("user found: ",i)
        }

    });
    //returns json data of user
    return currentUser;
}

function addOrg(user,org){

}

function removeOrg(user,org){

}



module.exports = {
                displayOrgs,
                addOrg,
                removeOrg 
            }
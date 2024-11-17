async function getUserData() {
   
    //fetches get request
    let response = await fetch('http://localhost:3000/vieworgs')

    if(response.ok){
        let data = response.json()
        //TEST SENDING TO FRONTEND
        console.log("logged in user: ",data)
        return data
    }
}

//runs this function of load up of the page
document.addEventListener('DOMContentLoaded', async () => {
    const orgs = await getUserData();
    console.log('Fetched Organizations:', orgs);
});
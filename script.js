
function saveToLocalStorage(event){
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    const phonenumber = event.target.phonenumber.value;

    // localStorage.setItem('name',name);
    // localStorage.setItem('email',email); 
    // localStorage.setItem('phonenumber',phonenumber);

    const obj = {
        name,
        email,
        phonenumber
    }

    axios.post("https://crudcrud.com/api/e435cfd73f0e488b9c88f6e647e83d88/appointment",obj)
    .then((response) =>{
        showNewUserOnScreen(response.data)
        // console.log(response)
    })
    .catch((err) =>{
        // document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>"
        console.log(err)
    })
    // localStorage.setItem(obj.email, JSON.stringify(obj))
    // showNewUserOnScreen(obj);
}

window.addEventListener("DOMContentLoaded", () =>{
    axios.get("https://crudcrud.com/api/e435cfd73f0e488b9c88f6e647e83d88/appointment")
    .then((response) =>{
        console.log(response)

        for(var i=0; i<response.data.length; i++){
            showNewUserOnScreen(response.data[i])
        }
    })
    .catch((error) =>{
        console.log(error)
    })
    // const localStorageObj = localStorage;
    // const localStoragekeys = Object.keys(localStorageObj)

    // for(var i=0; i<localStoragekeys.length; i++){
    //     const key = localStoragekeys[i];
    //     const userDetailsString = localStorageObj[key];
    //     const userDetailsObj = JSON.parse(userDetailsString);

    //     showNewUserOnScreen(userDetailsObj);
    // }
})

function showNewUserOnScreen(user){
    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('phonenumber').value = '';

    // console.log(localStorage.getItem(user.emailId));

    if(localStorage.getItem(user.email)!==null){
        removeUserFromScreen(user.email)
    }

    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${user._id}> ${user.name} - ${user.email} - ${user.phonenumber}
    <button onclick = deleteUser('${user._id}')>DELETE</button>
    <button onclick = editUserDetails('${user.email}','${user.name}','${user.phonenumber}','${user._id}')>EDIT</button>
    </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}


function editUserDetails(emailId, name, phonenumber, userId){
    document.getElementById('email').value = emailId;
    document.getElementById('username').value = name;
    document.getElementById('phonenumber').value = phonenumber;

    deleteUser(userId);
}

function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/e435cfd73f0e488b9c88f6e647e83d88/appointment/${userId}`)
    .then((response) =>{
        removeUserFromScreen(userId)
    })
    .catch((error)=>{
        console.log(error)
    })
    // console.log(emailId)
    // localStorage.removeItem(emailId);
    // removeUserFromScreen(emailId);
}

function removeUserFromScreen(userId){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(userId);
    if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted)
    }
}
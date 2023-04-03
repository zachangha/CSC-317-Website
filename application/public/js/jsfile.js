document.getElementById("username").addEventListener("input", function(ev) {
    let userIput = ev.currentTarget;
    let username = userIput.value;
    var firstCharacter = username.charAt(0);
    var alphanumeric = username.match(/[a-zA-Z0-9]/g);
    if (alphanumeric.length >= 3 && firstCharacter.match(/[a-zA-Z]/)){
        userIput.classList.add("valid_text")
        userIput.classList.remove("invalid_text")
    }
    else{
        userIput.classList.add("invalid_text")
        userIput.classList.remove("valid_text")
    }
});

document.getElementById("password").addEventListener("input", function(ev){
    let userIput = ev.currentTarget;
    let password = userIput.value;
    if (password.length >= 8 && password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[/*-+!@#$^&~[]/)){
        userIput.classList.add("valid_text")
        userIput.classList.remove("invalid_text")
    }
    else{
        userIput.classList.add("invalid_text")
        userIput.classList.remove("valid_text")
    } 
});

document.getElementById("confirm_password").addEventListener("input", function(ev){
    let userIput = ev.currentTarget;
    var confirm_password = userIput.value;
    var password = document.getElementById("password").value;
    if (confirm_password == password){
        userIput.classList.add("valid_text")
        userIput.classList.remove("invalid_text")
    }
    else{
        userIput.classList.add("invalid_text")
        userIput.classList.remove("valid_text")
    } 
});

document.getElementsByTagName('form').addEventListener("submit", function(ev){
    ev.preventDefault();
    console.log(ev);
});
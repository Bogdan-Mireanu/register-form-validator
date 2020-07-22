const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//Show input error message
function showError(input, message){
   const formItem = input.parentElement; 
   formItem.className= "form-item error";
   const small = formItem.querySelector("small");
   small.innerText = message;
}

//Show succes outline
function showSuccess(input){
    const formItem = input.parentElement;
    formItem.className = "form-item success";
}

// Function for required fields
function checkRequired(inputArr){
    inputArr.forEach(input => {
        if(input.value.trim() === ""){
            showError(input, `${getInputName(input)} is required`);
        }else{
            showSuccess(input);
        }
    });
}
function getInputName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Function to verify if email is valid
function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
       showSuccess(input) ; 
    }else {
       showError(input, "Email is not valid");
    }
}

//Function to check length for username and password
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getInputName(input)} must be at least ${min} characters`)
    } else if(input.value.length > max){
        showError(input, `${getInputName(input)} must be less than ${max} characters`)
    } else {
        showSuccess(input);
    }
}

// Function to check passwords match
function checkPasswordsMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, "Passwords do not match")
    }
}

// Add the event listeners
form.addEventListener("submit", function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 5, 15);
    checkLength(password, 6, 15)
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});
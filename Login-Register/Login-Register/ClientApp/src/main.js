function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        if (username.length > 0 && username.length > 6 && password.length > 0 && password.length > 8) {
            alert("You have successfully logged in!");
            location.reload();

        } else {
            setFormMessage(loginForm, "error", "Invalid username/password combination");
        }
       
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 6) {
                setInputError(inputElement, "Username must be at least 6 characters in length");
            }
            if (e.target.id === "signupPassword" && e.target.value.length > 0 && e.target.value.length < 8) {
                setInputError(inputElement, "Password must be at least 8 characters in length");
            }
            
        });
        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);    
        });
        
    });
    createAccountForm.addEventListener("submit", e => {
        //e.preventDefault();
        const user = createAccountForm.user.value;
        const pass = createAccountForm.pass.value;

        if (user.length > 0 && user.length > 6 && pass.length > 0 && pass.length > 8) {
            alert("Registration Successful");
            //location.reload();

        }
    });
});


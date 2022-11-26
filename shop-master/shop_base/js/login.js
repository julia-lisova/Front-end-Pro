import {API_User, requestPost, requestGet, requestPut} from './main.js';

const containerForm=document.createElement('div');
containerForm.classList.add("container");
document.body.append(containerForm);
const containerColumns=document.createElement('div');
containerColumns.classList.add("columns");
containerForm.append(containerColumns);

//renderLoginForm
const renderLoginForm=(USER_DATA)=>{
    const loginForm=document.createElement('form');
    loginForm.id='loginForm';
    loginForm.classList.add('userForm');
    loginForm.innerHTML=`<p class="title">Secure Sign In</p2>
        <p class="description">For current customers</p>`;

    const loginError=document.createElement('div');
    loginError.classList.add('error');

    const labelForUserEmail=document.createElement('label');
    labelForUserEmail.setAttribute('for','userEmail');
    const userEmail=document.createElement('input');
    userEmail.setAttribute('type','email');
    userEmail.setAttribute('placeholder','Email Address');
    userEmail.dataset.name='email';
    userEmail.id='userEmail';
    userEmail.required;

    const labelForUserPassword=document.createElement('label');
    labelForUserPassword.setAttribute('for','userPassword');
    const userPassword=document.createElement('input');
    userPassword.setAttribute('type','password');
    userPassword.setAttribute('placeholder','Password');
    userPassword.dataset.name='password';
    userPassword.id='userPassword';
    userPassword.required;

    const loginBtn=document.createElement('button');
    loginBtn.classList.add('btn','btnForm');
    loginBtn.innerText='Sign in';

    let dataLogIn = {};
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        dataLogIn = {
            email: userEmail.value,
            password: userPassword.value
        }
        const loggedUser = USER_DATA.find((user) => user.email === dataLogIn.email);
        const userPasswordExist = loggedUser.password === dataLogIn.password;

        switch (true) {
            case !loggedUser:
                loginError.classList.add('active');
                loginError.innerHTML = 'Invalid email';
                break;
            case !userPasswordExist:
                loginError.classList.add('active');
                loginError.innerHTML = 'Invalid password';
                break;
            default:
                loggedUser.status = true;
                localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
                await requestPut(API_User + `/${loggedUser.id}`, {status: true});
                window.location.href = './index.html';
        }
    })
    loginForm.append(loginError,labelForUserEmail,userEmail,labelForUserPassword,userPassword,loginBtn);
    containerColumns.append(loginForm);
}
// renderLoginForm

// renderRegistrationForm
const renderRegistrationForm=(USER_DATA)=> {
    const registrationForm = document.createElement('form');
    registrationForm.id = 'registrationForm';
    registrationForm.classList.add('userForm');
    registrationForm.innerHTML = `<p class="title">Quick Registration</p2>
        <p class="description">For new customers</p>`;

    const registrationError = document.createElement('div');
    registrationError.classList.add('error');

    const labelForRegFullName = document.createElement('label');
    labelForRegFullName.setAttribute('for', 'userFullName');
    const userFullName = document.createElement('input');
    userFullName.setAttribute('type', 'text');
    userFullName.setAttribute('placeholder', 'Full name');
    userFullName.dataset.name = 'name';
    userFullName.id = 'userFullName';
    userFullName.required;

    const labelForUserEmail = document.createElement('label');
    labelForUserEmail.setAttribute('for', 'userRegEmail');
    const userEmail = document.createElement('input');
    userEmail.setAttribute('type', 'email');
    userEmail.setAttribute('placeholder', 'Email Address');
    userEmail.dataset.name = 'email';
    userEmail.id = 'userRegEmail';
    userEmail.required;

    const labelForUserPassword = document.createElement('label');
    labelForUserPassword.setAttribute('for', 'userRegPassword');
    const userPassword = document.createElement('input');
    userPassword.setAttribute('type', 'password');
    userPassword.setAttribute('placeholder', 'Password');
    userPassword.dataset.name = 'password';
    userPassword.id = 'userRegPassword';
    userPassword.required;
    const labelForVerifyPassword = document.createElement('label');
    labelForVerifyPassword.setAttribute('for', 'passwordVerify');
    const passwordVerify = document.createElement('input');
    passwordVerify.setAttribute('type', 'password');
    passwordVerify.setAttribute('placeholder', 'Verify Password');
    passwordVerify.dataset.name = 'passwordVerify';
    passwordVerify.id = 'passwordVerify';
    passwordVerify.required;

    const registrationBtn = document.createElement('button');
    registrationBtn.classList.add('btn','btnForm');
    registrationBtn.innerText = 'Create Account';

    let dataRegistration = {};
    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        dataRegistration = {
            name: userFullName.value,
            email: userEmail.value,
            password: userPassword.value,
        }
        let emailExist = USER_DATA.find((user) => user.email === dataRegistration.email);
        switch (true) {
            case dataRegistration.password !== passwordVerify.value:
                registrationError.classList.add('active');
                registrationError.innerHTML = 'Password not matches!';
                break;
            case !!emailExist:
                registrationError.classList.add('active');
                registrationError.innerHTML = `User with email ${dataRegistration.email} already exist!`;
                break;
            default:
                dataRegistration.status = true;
                try {
                    await requestPost(API_User, dataRegistration);
                    const getRequestUsers = await requestGet(API_User);
                    const findUser=getRequestUsers.find((user)=>user.email===dataRegistration.email);
                    localStorage.setItem('loggedUser', JSON.stringify(findUser));
                    window.location.href = './index.html';
                } catch (e) {
                    console.log(e);
                }
        }
    })
    registrationForm.append(registrationError, labelForRegFullName,userFullName, labelForUserEmail, userEmail, labelForUserPassword, userPassword, labelForVerifyPassword, passwordVerify, registrationBtn);
    containerColumns.append(registrationForm);
}
// renderRegistrationForm

(async function init() {
    const USER_DATA = await requestGet(API_User);

    renderLoginForm(USER_DATA);
    renderRegistrationForm(USER_DATA);
})();

export const headerUser = document.querySelector('.header #headerUser');
export const headerLogout = document.querySelector('.header #headerLogout');
export const headerShoppingCartCount=document.querySelector('#headerShoppingCartCount');
export const API_DataProduct = 'https://634e9f834af5fdff3a625f84.mockapi.io/products';
export const API_User = 'https://63760e93b5f0e1eb85016862.mockapi.io/users';

export const requestGet = async (url) => {
    const response = await fetch(url);
    return response.ok
        ? response.json()
        : Promise.reject([response.status, response.statusText]);
}

export const requestPost= async (API,obj)=>{
    return await fetch(API, {
        method: `POST`,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(obj)
    }).then(data => data.json());
}

export const requestPut= async (API,obj)=>{
    return await fetch(API, {
        method: `PUT`,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(obj)
    }).then(data => data.json());
}

export const renderHeaderCounter=()=>{
    let userSignIn = JSON.parse(localStorage.getItem('loggedUser'));
    const count= userSignIn?.shoppingCart.reduce((acc, obj)=>acc + +obj.count,0);
    headerShoppingCartCount.innerHTML = `${count ?? '0'}`;
}

const addLoginListener=(userSignIn)=>{
    if (userSignIn) {
        headerUser.innerHTML = userSignIn.name;
        headerShoppingCartCount.innerHTML = userSignIn.shoppingCart.length;
        headerLogout.classList.add('active');
    }
    headerUser.addEventListener('click',e=>{
        if(userSignIn){
            headerUser.href ='./account.html';
        }
    })
};

const addLogoutListener=(userSignIn)=>{
    headerLogout.addEventListener('click',async (e)=>{
        if(confirm('Are you sure you want to exit?')){
            headerUser.innerHTML = 'Log in';
            headerShoppingCartCount.innerHTML = '0';
            headerLogout.classList.remove('active');
            localStorage.clear();
            await requestPut(API_User+`/${userSignIn.id}`, {status:false})
            .then(()=>window.location.href = './index.html');
        }
    })
}

(function init(){
    let userSignIn = JSON.parse(localStorage.getItem('loggedUser'));
    addLoginListener(userSignIn);
    addLogoutListener(userSignIn);
    renderHeaderCounter();
})();

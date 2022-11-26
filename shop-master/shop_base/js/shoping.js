import {API_DataProduct, API_User, renderHeaderCounter, requestGet, requestPut} from './main.js';

const categoriesContainer = document.querySelector('#categoriesContainer');
const renderCart = (productList, mapProductsCart, userSignIn) => {
    for (let category in mapProductsCart) {
        const section = document.createElement('section')
        section.classList.add('category');
        section.dataset.name = category;

        section.innerHTML = `<h2>${category}</h2>`;

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category__container');
        mapProductsCart[category].forEach((product) => {
            const priceWithDiscount = Math.floor(product.price * (1 - product.salePercent / 100));
            const productPrice = product.sale ? priceWithDiscount : product.price;

            const blockSale = `<span class="product__sale--old">$${product.price}</span>
                        <span class="product__sale--percent">-${product.salePercent}%</span>`;

            const productWrapper = document.createElement('div');
            productWrapper.dataset.id = product.id;
            productWrapper.classList.add('product')
            productWrapper.innerHTML = `<img
                            src="images/products/${product.img}.png"
                            class="product__img"
                            alt="${product.title}"
                            height="80"
                    />
                    <p class="product__title">${product.title}</p>
                    <div class="product__sale">
                         ${product.sale ? blockSale : ''}
                    </div>`
            categoryContainer.append(productWrapper);
            const saleInfo = document.createElement('div');
            saleInfo.classList.add('product__info');
            saleInfo.innerHTML = ` <span class="product__price">$${productPrice}</span>`;
            productWrapper.append(saleInfo);

            const buyBtns = document.createElement('button');
            buyBtns.classList.add('product__cart');

            if (userSignIn) {
                userSignIn.shoppingCart?.forEach((prodInCart) => {
                    if (+prodInCart.id === +product.id) {
                        buyBtns.classList.add('product__cart--in')
                    }
                });
            }
            buyBtns.innerHTML = '<img src="images/shopping-cart.png" alt="shopping cart" height="20"/>';
            saleInfo.append(buyBtns);
            btnListener(buyBtns, userSignIn, productList);
        });
        categoriesContainer.append(section);
        section.append(categoryContainer);
    }
}

function btnListener(button, userSignIn, productList) {
    button.addEventListener('click', async (e) => {
        const productSelectID = e.target.closest('div .product').dataset.id;
        if (!userSignIn) {
            return window.location.href = './login.html';
        }

        const prodInCartIndex = userSignIn.shoppingCart.findIndex((prodInCart) => prodInCart.id === productSelectID);
        const prodInCatalog = productList.find((product) => product.id === productSelectID);
        if (prodInCartIndex !== -1) {
            button.classList.remove('product__cart--in');
            userSignIn.shoppingCart.splice(prodInCartIndex, 1);
        } else {
            button.classList.add('product__cart--in');
            const priceWithDiscount = Math.floor(prodInCatalog.price * (1 - prodInCatalog.salePercent / 100));
            const productPrice = prodInCatalog.sale ? priceWithDiscount : prodInCatalog.price;
            userSignIn.shoppingCart.push({
                id: productSelectID,
                count: 1,
                img: prodInCatalog.img,
                price: prodInCatalog.price,
                sale: prodInCatalog.sale,
                salePercent: prodInCatalog.salePercent ? prodInCatalog.salePercent : '',
                totalPrice: productPrice,
                title: prodInCatalog.title
            });
        }
        try {
            await requestPut(API_User + `/${userSignIn.id}`, {
                shoppingCart: userSignIn.shoppingCart
            });
            localStorage.setItem(`loggedUser`, JSON.stringify(userSignIn));
            renderHeaderCounter();
        } catch (e) {
            console.log(e);
        }
    })
}

(async function init() {
    const productList = await requestGet(API_DataProduct);
    let userSignIn = JSON.parse(localStorage.getItem('loggedUser'));

    const mapProductsCart = {};
    for (let product of productList) {
        if (!mapProductsCart[product.category]) {
            mapProductsCart[product.category] = [];
        }
        mapProductsCart[product.category].push(product);
    }

    renderCart(productList, mapProductsCart, userSignIn);
})()

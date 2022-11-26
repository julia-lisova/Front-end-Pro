import {API_DataProduct, API_User, renderHeaderCounter, requestGet, requestPut} from "./main.js";

const container = document.createElement('div');
container.classList.add('container');
document.body.append(container);

const shoppingCartContainer = document.createElement('div');
shoppingCartContainer.classList.add('shoppingCart__container');
container.append(shoppingCartContainer);

const tableContainer = document.createElement('div');
tableContainer.classList.add('table__container');

const orderTable = document.createElement('table');
orderTable.classList.add('order__table');
orderTable.id = 'shoppingCartTable';
tableContainer.append(orderTable);

const orderSummary = document.createElement('div');
orderSummary.classList.add('order__summary');
shoppingCartContainer.append(tableContainer, orderSummary);

let userSignIn = JSON.parse(localStorage.getItem('loggedUser'));

const renderTHead = () => {
    orderTable.innerHTML = `<caption>
        Items in Shopping Cart
    </caption>
    <thead>
    <tr>
        <th>Item Description</th>
        <th>Price</th>
        <th>Sale</th>
        <th>Quantity</th>
        <th>Total</th>
        <th>Action</th>
    </tr>
    </thead>`
}

const renderTbody = (productsInCart) => {
    const tbody = document.createElement('tbody');
    orderTable.append(tbody);

    productsInCart.forEach((product) => {
        const priceWithDiscount = Math.floor(product.price * (1 - product.salePercent / 100));

        const tr = document.createElement('tr');
        tbody.append(tr);

        const tdItemDescription = document.createElement('td');
        const itemInfo = document.createElement('div');
        itemInfo.classList.add('item__info')
        itemInfo.innerHTML = `<img
                        src="images/products/${product.img}.png"
                        alt="${product.title}"
                        height="100"
                    />
                    <div>
                        <p class="item__info--title">${product.title}</p>
                    </div>`;
        tdItemDescription.append(itemInfo);

        const tdPrice = document.createElement('td');
        const productPrice = product.sale ? priceWithDiscount : product.price;

        tdPrice.innerHTML = `$${product.price}`;
        const tdSale = document.createElement('td');
        const spanSale = document.createElement('span');
        if (product.sale) {
            spanSale.classList.add('item__sale')
        }
        if (product.sale) {
            spanSale.innerHTML = `-${product.salePercent}%`
        } else {
            tdSale.innerHTML = '-'
        }
        tdSale.append(spanSale);

        // tdQuantity
        const tdQuantity = document.createElement('td');
        const inputQuantity = document.createElement('input');
        inputQuantity.setAttribute('type', 'number');
        inputQuantity.setAttribute('min', '1');
        const productStorage = userSignIn.shoppingCart.find((productStorage) => +productStorage.id === +product.id)
        inputQuantity.value = productStorage.count;

        inputQuantity.addEventListener(`input`, async e => {
            if(e.target.value < 1) {
                e.target.value = productStorage.count;
                return;
            }
            productStorage.count = e.target.value;
            const totalPriceProduct= +productStorage.count * productPrice;
            tdTotal.innerHTML = `$${totalPriceProduct}`;

            const summaryTotal=document.querySelector('#orderSummaryTotal');
            const totalPriceProducts = userSignIn.shoppingCart.reduce((acc,obj)=>acc + (+obj.count * +obj.totalPrice),0)
            summaryTotal.innerText=  `$${totalPriceProducts}`;

            localStorage.setItem(`loggedUser`, JSON.stringify(userSignIn));
            renderHeaderCounter();
            let request = await requestPut(API_User + `/${userSignIn.id}`, {
                shoppingCart: userSignIn.shoppingCart
            });
        })
        tdQuantity.append(inputQuantity);
        // tdQuantity

        const tdTotal = document.createElement('td');
        const totalPriceProduct= +productStorage.count * productPrice;
        tdTotal.innerHTML = `$${totalPriceProduct}`;

        const tdAction = document.createElement('td');
        tdAction.dataset.id = product.id;
        const itemRemove = document.createElement('div');
        itemRemove.classList.add('item__remove');
        itemRemove.innerHTML = '<img src="images/delete.png" alt="delete" height="20" />\n';
        itemRemove.addEventListener('click', async e => {
            const productSelectID = e.target.closest(`td`).dataset.id
            const prodInCartIndex = userSignIn.shoppingCart.findIndex((productStorage) => +productStorage.id === +productSelectID);
            userSignIn.shoppingCart.splice(prodInCartIndex, 1);

            const summaryTotal=document.querySelector('#orderSummaryTotal');
            const totalPriceProducts = userSignIn.shoppingCart.reduce((acc,obj)=>acc + (+obj.count * +obj.totalPrice),0)
            summaryTotal.innerText=  `$${totalPriceProducts}`;

            await requestPut(API_User + `/${userSignIn.id}`, {
                shoppingCart: userSignIn.shoppingCart
            });
            localStorage.setItem(`loggedUser`, JSON.stringify(userSignIn));
            e.target.closest(`tr`).remove();
            renderHeaderCounter();
        })
        tdAction.append(itemRemove);

        tr.append(tdItemDescription, tdPrice, tdSale, tdQuantity, tdTotal, tdAction);
    })
}

function renderOrderSummaryForm () {
    const totalPriceProducts = userSignIn.shoppingCart.reduce((acc,obj)=>acc + (+obj.count * +obj.totalPrice),0)
    const orderSummaryForm = document.createElement('form');
    orderSummaryForm.dataset.id = 'orderSummary';
    const orderSummaryTable = document.createElement('table');
    orderSummaryTable.innerHTML = `<caption>My Order Summary</caption>
              <tbody>
                <tr>
                  <th>Order Total</th>
                  <td id="orderSummaryTotal">$${totalPriceProducts}</td>
                </tr>
              </tbody>`;
    const btnCompleteOrder=document.createElement('button');
    btnCompleteOrder.classList.add('btn');
    btnCompleteOrder.innerText='Complete Order';
    orderSummaryForm.append(orderSummaryTable,btnCompleteOrder)

    orderSummaryForm.addEventListener('submit',async e=>{
        e.preventDefault();

        const order =userSignIn.shoppingCart.splice(0);

        userSignIn.orders.push({
            createdAt:Date.now(),
            products:order
        });
        try{
            await requestPut(API_User + `/${userSignIn.id}`, {
                orders:userSignIn.orders,
                shoppingCart: userSignIn.shoppingCart
            });
            localStorage.setItem(`loggedUser`, JSON.stringify(userSignIn));
        } catch (e){
            console.log(e);
        }
        window.location.href = './account.html';
    })
    orderSummary.append(orderSummaryForm);
}

(async () => {
    const productList = await requestGet(API_DataProduct);

    let productsInCart = [];
    userSignIn.shoppingCart.forEach((selectProduct) => {
        const find = productList.find((product) => selectProduct.id === product.id)
        productsInCart.push(find);
    });
    renderTHead();
    renderTbody(productsInCart);
    renderOrderSummaryForm();

})()
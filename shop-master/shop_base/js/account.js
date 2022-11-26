import {
    API_User,
    headerLogout,
    headerShoppingCartCount,
    headerUser,
    renderHeaderCounter,
    requestPut
} from "./main.js";

const container = document.createElement('div');
container.classList.add('container');
document.body.append(container);

const shoppingCartContainer = document.createElement('div');
shoppingCartContainer.classList.add('shoppingCart__container');
container.append(shoppingCartContainer);

let userSignIn = JSON.parse(localStorage.getItem('loggedUser'));

const renderTHead = (orderTable, title) => {
    orderTable.innerHTML = `<caption>
       ${title}
    </caption>
    <thead>
    <tr>
       <th>Item Description</th>
                <th>Price</th>
                <th>Sale</th>
                <th>Quantity</th>
                <th>Total</th>
    </tr>
    </thead>`
}

const renderOrderTable = () => {
    const wrapperTables = document.createElement('div');
    wrapperTables.classList.add('table__container');
    shoppingCartContainer.append(wrapperTables);

    userSignIn.orders.forEach((order) => {
        const tableContainer = document.createElement('div');
        tableContainer.classList.add('table__container');
        wrapperTables.prepend(tableContainer);
        const orderTable = document.createElement('table');
        orderTable.classList.add('order__table');
        orderTable.id = 'orderTable';
        tableContainer.append(orderTable);

        const totalPrice = order.products.reduce((acc, obj) => acc + (+obj.totalPrice * +obj.count), 0);
        const date = new Date(order.createdAt);
        const createAt = date.toISOString().slice(0, 10).split('-').reverse().join('.');

        const title = `Order from ${createAt}`;
        renderTHead(orderTable, title);
        const tbody = document.createElement('tbody');
        orderTable.append(tbody);

        order.products.forEach((product) => {
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
            tdPrice.innerHTML = `$${product.price}`;

            const tdSale = document.createElement('td');
            const spanSale = document.createElement('span');
            if (product.sale) {
                spanSale.classList.add('item__sale');
            }
            if (product.sale) {
                spanSale.innerHTML = `-${product.salePercent}%`;
            } else {
                tdSale.innerHTML = '-';
            }
            tdSale.append(spanSale);

            const tdQuantity = document.createElement('td');
            tdQuantity.innerHTML = product.count;

            const tdTotal = document.createElement('td');
            tdTotal.innerHTML = `${product.totalPrice * product.count}`;

            tr.append(tdItemDescription, tdPrice, tdSale, tdQuantity, tdTotal);
        })
        const wrapperTotal = document.createElement('div');
        wrapperTotal.classList.add('wrapper--order--total');
        wrapperTotal.innerHTML = `<b>Total price</b>: $${totalPrice}`;
        tableContainer.append(wrapperTotal);
    })
}

const renderOrderSummary = () => {
    const orderSummary = document.createElement('div');
    orderSummary.classList.add('order__summary');
    shoppingCartContainer.append(orderSummary);

    const orderSummaryTable = document.createElement('table');
    orderSummaryTable.innerHTML = `<caption>My Info</caption>
            <tbody>
              <tr>
                <th>Name:</th>
                <td id="userInfoName">${userSignIn.name}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td id="userInfoEmail">${userSignIn.email}</td>
              </tr>
            </tbody>`;
    const orderSummaryBtns = document.createElement('div');
    orderSummaryBtns.classList.add('order__summary&#45;&#45;btns');

    const btnDeleteAcc = document.createElement('button');
    btnDeleteAcc.classList.add('btn', 'delete__acc');
    btnDeleteAcc.setAttribute('type', 'button');
    btnDeleteAcc.id = 'deleteAcc';
    btnDeleteAcc.innerText = 'Delete account';
    orderSummaryBtns.append(btnDeleteAcc);
    orderSummary.append(orderSummaryTable, orderSummaryBtns)

    orderSummaryBtns.addEventListener('click', e => {
        if (confirm('Are you sure you want delete your account?')) {
            headerUser.innerHTML = 'Log in';
            headerShoppingCartCount.innerHTML = '0';
            headerLogout.classList.remove('active');
            requestPut(API_User + `/${userSignIn.id}`, {status: false}).then(() => {
                localStorage.clear();
                renderHeaderCounter();
                window.location.href = './index.html'
            });
        }
    })
}

(function init() {
    renderOrderTable();
    renderOrderSummary();
})();
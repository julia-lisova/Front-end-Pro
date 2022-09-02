const products = [
    ['apple', 10],
    ['banana', 8],
    ['mango', 20],
    ['grape', 18]
];
const summerValue = (value) => value * 0.8;

const winterValue = (value) => value * 2;

function getPrice(products, seasonFunc) {
    // const copiedProducts = structuredClone(products);
    // let copiedProducts = JSON.parse(JSON.stringify(products));
     const copiedProducts = _.cloneDeep(products);

    const sumPrice = copiedProducts.reduce((sum, [productName, price]) => sum + (
        (typeof seasonFunc === 'function') ? seasonFunc(price) : price
    ), 0);
    return sumPrice;
}

document.write(`<div>Sum of summer products - ${getPrice(products, summerValue)}</div>`);
document.write(`<div>Sum of winter products - ${getPrice(products, winterValue)}</div>`);
document.write(`<div>Sum of products - ${getPrice(products)}</div>`);

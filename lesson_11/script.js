const products = [
    ['apple', 10],
    ['banana', 8],
    ['mango', 20],
    ['grape', 18]
];

function getPrice(products, seasonFunc, title = '') {
    let copiedProducts = _.cloneDeep(products);
    // let copiedProducts = JSON.parse(JSON.stringify(products));
    let sumPrice = copiedProducts.reduce((sum, current) => {
        return sum + ((typeof seasonFunc === 'function') ? seasonFunc(current[1]) : (current[1]))
    }, 0);
    return console.log(`Sum of ${title}products - ${sumPrice}`);

    //     let sum = 0;  
    //     for (i = 0; i < copiedProducts.length; i++) {

    //         if (typeof seasonFunc === 'function') {
    //             copiedProducts[i][1] = seasonFunc(copiedProducts[i][1]);
    //         }
    //         sum += copiedProducts[i][1];
    //     }
    //     return console.log(`Sum of ${title}products - ${sum}`);
}

function summerValue(value) {
    return value * 0.8;
}

function winterValue(value) {
    return value * 2;
}

getPrice(products, summerValue, 'summer ');
getPrice(products, winterValue, 'winter ');
getPrice(products);
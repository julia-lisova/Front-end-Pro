const getFile = async (file) => {
    let response = await fetch(file);
    return response.ok
        ? response.json()
        : Promise.reject([response.status, response.statusText]);
};

const getMoney = Promise.resolve(confirm(`Do you want check balance?`));

const getSelectCurrency = (defaultCurrency)=>{
    return (prompt(`Enter the currency:`, `${defaultCurrency}`) || ``)
        .toUpperCase()
        .replaceAll(' ', '');
};

Promise.all([
    getFile('./balance.json'),
    getFile('./bankData.json')
]).then(async ([balance, bankData]) => {

    try {
        await getMoney
            ? showBalance(balance)
            : getCash(balance, bankData)
    } finally {
        console.log('Thank you, have a nice day 😊')
    }
});

const showBalance = (balance) => {
    let selectedCurrency;

    while (!selectedCurrency) {
        selectedCurrency = getSelectCurrency('UAH');

        for (let key in balance) {
            if (key === selectedCurrency) {
                console.log(`The balance on the card is: ${balance[key]} ${key}`);
                return;
            }
        }
        selectedCurrency = '';
    }
}

const getCash = (balance, bankData) => {
    let selectedCurrency;

    while (!selectedCurrency) {
        selectedCurrency = getSelectCurrency('USD');

        const currencyMatchingCard = Object.keys(balance).some(cardCurrency => cardCurrency === selectedCurrency);
        const currencyMatchingBank = Object.keys(bankData).some(bankCurrency => bankCurrency === selectedCurrency);

        if (!currencyMatchingCard || !currencyMatchingBank || Number(bankData[selectedCurrency].max) === 0) {
            selectedCurrency = '';
        }
    }
    let maxAvailableMoney = Math.min(bankData[selectedCurrency].max, balance[selectedCurrency]);

    const minAvailableMoney = bankData[selectedCurrency].min;
    const imgCash = bankData[selectedCurrency].img;

    const value = +prompt(`Enter the value to ${maxAvailableMoney}`, `${maxAvailableMoney}`);

    switch (true) {
        case (!value):
            return;
        case (value > maxAvailableMoney):
            return console.log(`The entered amount is greater than the available amount. Maximum withdrawal amount: ${maxAvailableMoney}`);
        case (value < minAvailableMoney):
            return console.log(`The amount entered is less than available. Minimum withdrawal amount: ${minAvailableMoney}`);
        default:
            return console.log(`take your money ${value} ${selectedCurrency} ${imgCash}`);
    }
}

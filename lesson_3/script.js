let captionString = `Food prices ≠ <ВИВІД ПОТОЧНОГО ДНЯ>.<ВИВІД ПОТОЧНОГО МІСЯЦЯ>.<ВИВІД ПОТОЧНОГО РОКУ>`,

    apple = `🍎`,
    applePrice = 10,
    appleCount = 3,
    appleSalePercent = 7,

    orange = `🍊`,
    orangePrice = 12,
    orangeCount = 2,
    orangeSalePercent = 3,

    kiwi = `🥝`,
    kiwiPrice = 15,
    kiwiCount = 10,
    kiwiCountryPercent = 10;

captionString = captionString.replaceAll('≠', '-');
let indexOfHyphen = captionString.indexOf(`-`),
    now = new Date(), //для того щоб отримати різні параметри однієї і тієї ж дати(включно з мікросекундами)
    day = now.getDate(),
    month = now.getMonth() + 1,
    year = now.getFullYear();

// captionString = captionString.slice(0, indexOfHyphen + 2) + day + '.' + month + '.' + year;
// console.log(captionString);

// console.log(' ');

// let priceString = 'Final price for ';

// let appleFinalPrice = appleCount * applePrice * (1 - (appleSalePercent / 100));
// console.log(priceString + appleCount + ' ' + apple + ' = ' + appleFinalPrice.toFixed() + ' UAH');

// let orangeFinalPrice = orangeCount * orangePrice * (1 - (orangeSalePercent / 100));
// console.log(priceString + orangeCount + ' ' + orange + ' = ' + orangeFinalPrice.toFixed() + ' UAH');

// let kiwiFinalPrice = kiwiCount * kiwiPrice * (1 + (kiwiCountryPercent / 100));
// console.log(priceString + kiwiCount + ' ' + kiwi + ' = ' + kiwiFinalPrice.toFixed() + ' UAH');

// console.log(' ');

// let finalPriceOfAllProducts = appleFinalPrice + orangeFinalPrice + kiwiFinalPrice;
// console.log('Final price for all products = ' + finalPriceOfAllProducts.toFixed() + ' UAH');


captionString = captionString.slice(0, indexOfHyphen + 2) + day + '.' + month + '.' + year;
// captionString = captionString.slice(0, indexOfHyphen + 2) + now.toLocaleDateString(); // дата з 02.08.2022

let priceString = 'Final price for ';
appleFinalPrice = (appleCount * applePrice * (1 - (appleSalePercent / 100))).toFixed(); // метод toFixed() повертає значення з типом String
orangeFinalPrice = (orangeCount * orangePrice * (1 - (orangeSalePercent / 100))).toFixed();
kiwiFinalPrice = Math.round(kiwiCount * kiwiPrice * (1 + (kiwiCountryPercent / 100))); // метод Math.round заокруглює до найближчого і повертає значення з типом Number
finalPriceOfAllProducts = Number(appleFinalPrice) + Number(orangeFinalPrice) + kiwiFinalPrice;


console.log(`${captionString}

${priceString}${appleCount} ${apple} = ${appleFinalPrice} UAH
${priceString}${orangeCount} ${orange} = ${orangeFinalPrice} UAH
${priceString}${kiwiCount} ${kiwi} = ${kiwiFinalPrice} UAH

Final price for all products = ${finalPriceOfAllProducts} UAH
`);
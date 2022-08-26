const animals = [
    ['🐭', 'mouse', 'Jerry'],
    ['🐹', 'hamster', 'Biscuit'],
    ['🐰', 'rabbit', 'Bugs'],
    ['🦊', 'fox', 'Mrs. Fox'],
    ['🐻', 'bear', 'Paddington']
];

const food = [
    ['🍎', 'apple', 10],
    ['🍐', 'pear', 12],
    ['🍊', 'tangerine', 15],
    ['🍋', 'lemon', 5],
    ['🍌', 'banana', 7]
];

function getInfo(array, titleArr) {
    let TRs = [];

    for (let tr of array) {
        let TDs = [];

        for (let td of tr) {
            TDs.push(`<td>${td}</td>`);
        }

        TRs.push(`<tr>${TDs.join(``)}</tr>`);
    }

    return document.write(`<table><caption>${titleArr} info</caption>${TRs.join(``)}</table>`);
}

getInfo(animals, `Animals`);
getInfo(food, `Food`);
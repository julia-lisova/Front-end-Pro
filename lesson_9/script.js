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

const arrTables = [
    [animals, `Animals`],
    [food, `Food`]
];


function getTable(array, titleArr = 'default Title') {
    let TRs = [];
    for (let tr of array) {
        let TDs = [];
        for (let td of tr) {
            TDs.push(`<td>${td}</td>`);
        }
        TRs.push(`<tr>${TDs.join(``)}</tr>`);
    }
    return `<table><caption>${titleArr} info</caption>${TRs.join(``)}</table>`;
}




// запис у document.write через функцію
function renderArrayOfTables(arr) {
    let tables = [];
    for (let config of arr) {
        tables.push(getTable(config[0], config[1]));
    }

    return tables.join(``);
}
document.write(renderArrayOfTables(arrTables));

// щоб не писати через функцію, то можна замапить:
// document.write(arrTables
//     .map(([content, title]) => getTable(content, title))
//     .join(''));
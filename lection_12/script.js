const CARD__SUIT = ['clubs', 'spades', 'diamonds', 'hearts'];
const PEPSON = {
    'jack': 'J',
    'queen': 'Q',
    'king': 'K',
}
let result_2to10 = [];
let resultPerson = [];

function getCard(cardsSuit, whichCard) {
    let a = `<div class="card__info">${whichCard}<img src="images/${cardsSuit}.svg" alt="${cardsSuit}"></div>`;
    return a + a;
}

function getCard_person(cardsSuit, whichCard) {
    let a = `<div class="card__info">${PEPSON[whichCard] || 'T'}<img src="images/${cardsSuit}.svg" alt="${cardsSuit}"></div>`;
    return `${a}${`<img class="person" src="images/${whichCard || cardsSuit}.svg" alt="${cardsSuit}">`}${a}`;
}

for (let i = 2; i <= 14; i++) {
    for (let j of CARD__SUIT) {

        switch (true) {

        case 2 <= i && i <= 10:
            result_2to10.push(`<div class="card">${getCard(j, i)}</div>`);
            break;
        case i === 11:
            resultPerson.push(`<div class="card card--person">${getCard_person(j, 'jack')}</div>`);
            break;
        case i === 12:
            resultPerson.push(`<div class="card card--person">${getCard_person(j, 'queen')}</div>`);
            break;
        case i === 13:
            resultPerson.push(`<div class="card card--person">${getCard_person(j, 'king')}</div>`);
            break;
        case i === 14:
            resultPerson.push(`<div class="card card--person">${getCard_person(j)}</div>`);
            break;
        }
    }
}

 let randerCard = (arr1, arr2) =>`<div class="wrapper">${arr1.join('') + arr2.join('')}</div>`;
document.write(randerCard(result_2to10, resultPerson));


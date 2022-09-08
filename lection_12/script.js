const CARD__SUIT = ['clubs', 'spades', 'diamonds', 'hearts'];
const PEPSON = {
    'jack': 'J',
    'queen': 'Q',
    'king': 'K',
}
const result_2to10 = [];
const resultPerson = [];

function getCard(cardsSuit, whichCard) {
    const a = `<div class="card__info">${whichCard}<img src="images/${cardsSuit}.svg" alt="${cardsSuit}"></div>`;
    return a + a;
}

function getCardPerson(cardsSuit, whichCard) {
    const PERSON_Entries = Object.entries(PEPSON).find(el => el[0] === whichCard);
    const a = `<div class="card__info">${PERSON_Entries && PERSON_Entries[1] || 'T'}<img src="images/${cardsSuit}.svg" alt="${cardsSuit}"></div>`;
    // const a = `<div class="card__info">${PEPSON[whichCard] || 'T'}<img src="images/${cardsSuit}.svg" alt="${cardsSuit}"></div>`;

    return a + `<img class="person" src="images/${whichCard || cardsSuit}.svg" alt="${cardsSuit}">` + a;
}

for (let i = 2; i <= 14; i++) {
    for (let j of CARD__SUIT) {

        switch (true) {
        case 2 <= i && i <= 10:
            result_2to10.push(`<div class="card">${getCard(j, i)}</div>`);
            break;
        case i === 11:
            resultPerson.push(`<div class="card card--person">${getCardPerson(j, 'jack')}</div>`);
            break;
        case i === 12:
            resultPerson.push(`<div class="card card--person">${getCardPerson(j, 'queen')}</div>`);
            break;
        case i === 13:
            resultPerson.push(`<div class="card card--person">${getCardPerson(j, 'king')}</div>`);
            break;
        case i === 14:
            resultPerson.push(`<div class="card card--person">${getCardPerson(j)}</div>`);
            break;
        }
    }
}

let randerCard = (arr1, arr2) => `<div class="wrapper">${arr1.join('') + arr2.join('')}</div>`;

document.write(randerCard(result_2to10, resultPerson));

let square = document.createElement('div');
square.className = 'block';
document.body.append(square);

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomColor = (min, max) => {
    let colors = [];
    for (let i = 0; i <= 2; i++) {
        colors.push(getRandomIntInclusive(min, max));
    }
    return `rgb(${colors.join(`,`)})`;
}

square.style.left = 0;
square.style.top = 0;

let bodyWidth = document.body.offsetWidth;
let bodyHeight = document.body.offsetHeight;

let maxHorizontalCoordinate = bodyWidth - square.offsetWidth;
let maxVerticalCoordinate = bodyHeight - square.offsetHeight;

setInterval(() => square.style.backgroundColor = getRandomColor(0, 255), 1000);

setInterval(() => {
    square.style.left = getRandomIntInclusive(0, maxHorizontalCoordinate) + `px`;
    square.style.top = getRandomIntInclusive(0, maxVerticalCoordinate) + `px`;
    }, 1000);



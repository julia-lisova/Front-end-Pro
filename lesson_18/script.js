let square = document.createElement('div');
square.className = 'block';
square.style.left = 0;
square.style.top = 0;

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

// const maxHorizontalCoordinate = () => document.body.offsetWidth - square.offsetWidth;
// const maxVerticalCoordinate = () => document.body.offsetHeight - square.offsetHeight;

setInterval(() => {
    const maxHorizontalCoordinate = document.body.offsetWidth - square.offsetWidth;
    const maxVerticalCoordinate = document.body.offsetHeight - square.offsetHeight;

    square.style.backgroundColor = getRandomColor(0, 255);
    square.style.left = getRandomIntInclusive(0, maxHorizontalCoordinate) + `px`;
    square.style.top = getRandomIntInclusive(0, maxVerticalCoordinate) + `px`;
}, 1000);



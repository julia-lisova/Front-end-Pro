const block = document.createElement('div');
const body = document.querySelector('body');
block.id = 'square';
block.classList.add("has-animation");

body.append(block);

block.innerHTML = '<img class="notify has-animation" src="boom.png" alt="БАМС!">';
const image = document.querySelector('.notify');

block.style.left = 0;
block.style.top = 0;

const STEP = 10;

const boom = () => {
    setTimeout(() => {
        const maxHorizontalCoordinate = body.offsetWidth - block.offsetWidth;
        const maxVerticalCoordinate = body.offsetHeight - block.offsetHeight;
        const imgBoom = () => {
            image.classList.add("show");
        }

        if (block.offsetLeft <= 0) {
            block.style.left = parseInt(block.style.left) + STEP * 2 + `px`;
            imgBoom();
        } else if (block.offsetLeft >= maxHorizontalCoordinate) {
            block.style.left = parseInt(block.style.left) - STEP * 2 + `px`;
            imgBoom();
        } else if (block.offsetTop <= 0) {
            block.style.top = parseInt(block.style.top) + STEP * 2 + `px`;
            imgBoom();
        } else if (block.offsetTop >= maxVerticalCoordinate) {
            block.style.top = parseInt(block.style.top) - STEP * 2 + `px`;
            imgBoom();
        }

        setTimeout(() => image?.classList.remove("show"), 500);
    }, 500)
}

const sitDownCtrl = () => {
    boom();
    const scaleHeight = 0.6;
    const scaleWidth = 1.2;
    block.style.height = block.offsetHeight * scaleHeight + 'px';
    block.style.width = block.offsetWidth * scaleWidth + 'px';
    setTimeout(() => {
        block.style.height = '';
        block.style.width = '';
    }, 400)
}

const jumpWhiteSpace = () => {
    boom();
    const topGap = STEP * 2;
    const startTop = block.style.top;

    block.style.top = parseInt(block.style.top) - topGap + 'px';
    setTimeout(() => block.style.top = startTop, 600);
}

const moveLeft = () => {
    block.style.left = parseInt(block.style.left) - STEP + `px`;
    boom();
}

const moveRight = () => {
    block.style.left = parseInt(block.style.left) + STEP + `px`;
    boom();
}
const moveUp = () => {
    block.style.top = parseInt(block.style.top) - STEP + `px`;
    boom();
}

const moveDown = () => {
    block.style.top = parseInt(block.style.top) + STEP + `px`;
    boom();
}

const ACTION_MAP_BY_KEYCODE = {
    17: sitDownCtrl,
    32: jumpWhiteSpace,
    37: moveLeft,
    38: moveUp,
    39: moveRight,
    40: moveDown,
}

document.addEventListener(`keydown`, e => ACTION_MAP_BY_KEYCODE[e.keyCode] && ACTION_MAP_BY_KEYCODE[e.keyCode]());

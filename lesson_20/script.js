const element = document.querySelector('#element');
const form = document.querySelector('#form');
const shapeSelect = document.querySelector('#select');
const colorInput = document.querySelector('#color');
const resetBtn = document.querySelector('#reset');

form.addEventListener(`submit`, e => {
    e.preventDefault();

    element.className = `element ${shapeSelect.value} show`;
    element.style.background = colorInput.value;
});

resetBtn.addEventListener('click', () => {
    element.className = `element`;
});

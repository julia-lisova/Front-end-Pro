import {
    Bulka
} from './classes/Bulka.js';
import {
    Cheeseburger
} from './classes/Cheeseburger.js';

let myHumburger = new Bulka('Humburger', 'small');
let myCheeseburger = new Cheeseburger('Cheeseburger', 'small');

//маніпуляція з елементами DOM дерева
const [body] = document.getElementsByTagName('body');

const json = data => JSON.stringify(data, undefined, 2);

function createEl(tag, content) {
    let element = document.createElement(tag);
    element.textContent = content;
    body.appendChild(element);
}

function renderElements(titleObj, obj){
    if (obj) {
        createEl('h2', titleObj);
        createEl('pre', json({before : obj}));
        createEl('pre', json({after : obj.setAdditionalIngredients('egg', 'onion')}));    
    } else {
        createEl('h1', titleObj);
    }
}

renderElements('lection 15');
renderElements('My humburger', myHumburger);
renderElements('My cheeseburger', myCheeseburger);

// document.open();
// document.write(`<h1>lection 15</h1>`);

// document.write(`<h2>My humburger</h2>`);
// document.write(`<pre>${json(myHumburger)}</pre>`);
// document.write(`<pre>${json(myHumburger.setAdditionalIngredients('egg', 'onion'))}</pre>`);
    
// document.write(`<h2>My cheeseburger</h2>`);
// document.write(`<pre>${json(myCheeseburger)}</pre>`);
// document.write(`<pre>${json(myCheeseburger.setAdditionalIngredients('egg', 'onion'))}</pre>`);
// document.close();

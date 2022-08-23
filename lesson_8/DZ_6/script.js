let hero = ['Ivan'];
let native = ['York', 'Of'];
let destination = ['Poltava', 'In'];
let rainbow = hero
    .concat(native, destination)
    .reverse();

let magicArray = ['Gave', 'Battle', 'In', 'Vain', 'Richard'];
rainbow.splice(0, 2, magicArray.pop());
rainbow.splice(3, 1, ...magicArray);
console.log(rainbow);

document.write(`<ul class="list">`);
for (let i = 0; i < rainbow.length; i++) {
    document.write(`<li class = "list_item__${i}">${rainbow[i]}</li>`)
}
document.write(`</ul>`);
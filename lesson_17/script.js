const COFFEE_TYPES = {
    Espresso: [
        {
            title: `Ristretto`,
            ingredients: {
                espresso: 20
            }
        },
        {
            title: `Espresso`,
            ingredients: {
                espresso: 60
            }
        },
        {
            title: `Lungo`,
            ingredients: {
                espresso: 100
            }
        },
        {
            title: `Americano`,
            ingredients: {
                espresso: 40,
                water: 60
            }
        }
    ],
    EspressoMilk: [
        {
            title: `Macchiato`,
            ingredients: {
                espresso: 20,
                "milk foam": 10
            }
        },
        {
            title: `Flat White`,
            ingredients: {
                espresso: 55,
                "milk foam": 45
            }
        },
        {
            title: `Cappuccino`,
            ingredients: {
                espresso: 20,
                milk: 20,
                "milk foam": 15
            }
        },
        {
            title: `Latte`,
            ingredients: {
                espresso: 20,
                milk: 20,
                "milk foam": 20
            }
        },
        {
            title: `Mocha`,
            ingredients: {
                "chocolate syrop": 15,
                espresso: 15,
                milk: 18,
                "milk foam": 15
            }
        }
    ],
    Alcoholic: [
        {
            title: `Irish Coffee`,
            ingredients: {
                espresso: 50,
                whiskey: 10,
                "whipped cream": 40
            }
        },
        {
            title: `Corretto`,
            ingredients: {
                espresso: 90,
                brandy: 10
            }
        },
        {
            title: `Baileys Hot Coffee`,
            ingredients: {
                espresso: 30,
                "warm milk": 20,
                "baileys irish cream": 30
            }
        }
    ],
    Dessert: [
        {
            title: `Affogato`,
            ingredients: {
                espresso: 25,
                "ice cream": 20,
                "whipped cream": 10,
                chocolate: 10
            }
        },
        {
            title: `Frappe`,
            ingredients: {
                espresso: 30,
                ice: 10,
                milk: 50
            }
        },
        {
            title: `Glace`,
            ingredients: {
                espresso: 50,
                "grated chocolate": 10,
                "ice cream": 30
            }
        }
    ]
};

class Coffee {
    constructor(objCoffee) {
        Object.assign(this, objCoffee);
    }

    static defaultCoffee = {
        title: `Default Coffee`,
        ingredients: {
            espresso: 50,
            whiskey: 10,
            "whipped cream": 40
        }
    }

    makeCoffee() {
        return `<div class="cup">
                    ${this.makeCoffeeType()}
                    ${this.renderTitle()}
                </div>`
    }

    makeCoffeeType(classCoffeeType = '') {
        return `<div class="coffee ${classCoffeeType}">
                    ${this.makeIngredients()}
                </div>`;
    }

    makeIngredients() {
        const ingredients = Object.entries(this.ingredients)
            .reduce((result, [key, value]) => {
                return result + `<p style="height: ${value}%" class="ingredient ${key.replaceAll(' ', '__')}">${key}</p>`
            }, '');

        return `<div class="coffee__ingredients">${ingredients}</div>`;
    }

    renderTitle() {
        return `<p class="coffee__title">${this.title}</p>`;
    }
}

class Espresso extends Coffee {
    makeCoffeeType() {
        return super.makeCoffeeType(`coffee--espresso`);
    }
}

class EspressoMilk extends Coffee {
    makeCoffeeType() {
        return super.makeCoffeeType(`coffee--espressoMilk`);
    }
}

class Alcoholic extends Coffee {
    makeCoffeeType() {
        return super.makeCoffeeType(`coffee--alcoholic`);
    }
}

class Dessert extends Coffee {
    makeCoffeeType() {
        return super.makeCoffeeType(`coffee--dessert`);
    }
}

let renderDefaultCoffee = new Coffee(Coffee.defaultCoffee).makeCoffee();

const COFFEE_TYPE = {
    Espresso: objCoffee => new Espresso(objCoffee),
    EspressoMilk: objCoffee => new EspressoMilk(objCoffee),
    Alcoholic: objCoffee => new Alcoholic(objCoffee),
    Dessert: objCoffee => new Dessert(objCoffee)
};

let coffeeWithClass = Object.keys(COFFEE_TYPES)
    .map(key => COFFEE_TYPES[key]
        .map(type => COFFEE_TYPE[key](type)
            .makeCoffee()
        ).join('')
    );

document.write(`<section class="cups">${renderDefaultCoffee}${coffeeWithClass.join('')}</section>`);
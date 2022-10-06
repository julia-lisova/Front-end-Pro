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
}

class Coffee{
    constructor(coffee){
        Object.assign(this, coffee);
    }

    makeCoffee(){
        return `<div class="cup">
            <div class="${this.getCupClasses().join(` `)}">
                <div class="coffee__ingredients">${this.setIngredients()}</div>
            </div>
            <p class="coffee__title">${this.title}</p>
        </div>`;
    }

    getCupClasses(){
        return [`coffee`];
    }

    setIngredients(){
        return Object
            .keys(this.ingredients)
            .map(key => `<p style="height: ${this.ingredients[key]}%" class="ingredient ${key.replaceAll(` `,`__`)}">${key}</p>`)
            .join(``);
    }
}

class Espresso extends Coffee{
    constructor(coffee){
        super(coffee);
    }

    getCupClasses(){
        let classes = super.getCupClasses();
        classes.push(`coffee--espresso`);
        return classes;
    }
}

class EspressoMilk extends Coffee{
    constructor(coffee){
        super(coffee);
    }

    getCupClasses(){
        let classes = super.getCupClasses();
        classes.push(`coffee--espressoMilk`);
        return classes;
    }
}

class Alcoholic extends Coffee{
    constructor(coffee){
        super(coffee);
    }

    getCupClasses(){
        let classes = super.getCupClasses();
        classes.push(`coffee--alcoholic`);
        return classes;
    }
}

class Dessert extends Coffee{
    constructor(coffee){
        super(coffee);
    }

    getCupClasses(){
        let classes = super.getCupClasses();
        classes.push(`coffee--dessert`);
        return classes;
    }
}

const COFFEE_CLASSES = {
    Espresso: coffee => new Espresso(coffee),
    EspressoMilk: coffee => new EspressoMilk(coffee),
    Alcoholic: coffee => new Alcoholic(coffee),
    Dessert: coffee => new Dessert(coffee),
}

let allCoffee = Object
    .keys(COFFEE_TYPES)
    .map(type => {
        let currentType = COFFEE_TYPES[type];
        return currentType
            .map(coffee => {
                return COFFEE_CLASSES[type] ? COFFEE_CLASSES[type](coffee) : new Coffee(coffee)
            })
    })
    .map(coffee => {
        console.log(coffee);
        return coffee;
    })
    .reduce((finalArr, arr) => finalArr.concat(arr), [])
    .map(coffee => coffee.makeCoffee())
    .join(``);

let defaultCoffee = new Coffee(
    {
        title: `Default Coffee`,
        ingredients: {
            espresso: 50,
            whiskey: 10,
            "whipped cream": 40
        }
    }
);

document.write(`<section class="cups">
    ${defaultCoffee.makeCoffee()}
    ${allCoffee}
</section>`);
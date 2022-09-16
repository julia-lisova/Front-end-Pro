export class Bulka {
    constructor(name, size) {
        this.name = name;
        this.size = size;
        this.ingredients = ['cutlet', 'salada', 'tomato'];
    }

    setAdditionalIngredients(...newIngredients) {
        this.ingredients.push(...newIngredients);
        return this;
    }
}

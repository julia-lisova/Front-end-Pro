import {
    Bulka
} from './Bulka.js';

export class Cheeseburger extends Bulka {
    constructor(name, size) {
        super(name, size);
        this.setAdditionalIngredients('cheese');
    }
}

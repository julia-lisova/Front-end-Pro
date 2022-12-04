
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function myRandomInts(quantity, min, max) {
    var set = new Set();
    while (set.size < quantity) {
        set.add(getRandomIntInclusive(min, max));
    }
    return Array.from(set);
}
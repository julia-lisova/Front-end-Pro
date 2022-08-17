let lengthOfArray;
let minValue;
let maxValue;
let arr = [];

while (!lengthOfArray || isNaN(lengthOfArray) || !(lengthOfArray >= 2 && lengthOfArray <= 10)) {
    lengthOfArray = Math.round(Math.abs((prompt(`Enter the length of the array: from 2 to 10`) || '').replaceAll(' ', '')));
}

while (!minValue || isNaN(minValue) || !(minValue >= -10 && minValue <= 10)) {
    minValue = (prompt(`Enter the minimum value of a random array: from -10 to 10`) || '').replaceAll(' ', '');
}
minValue = Math.round(minValue);

while (!maxValue || isNaN(maxValue) || !(maxValue > minValue && maxValue <= 50)) {
    maxValue = (prompt(`Enter the maximum value of a random array: from ${minValue+1} to 50`) || '').replaceAll(' ', '');
}
maxValue = Math.round(maxValue);

for (let i = 0; i < lengthOfArray; i++) {
    arr[i] = getRandomInt(minValue, maxValue);
}
console.log(arr.join(', '));
let minIndex = maxIndex = 0;

for (let i = 1; i < lengthOfArray; i++) {
    if (arr[i] <= arr[minIndex]) {
        minIndex = i;
    }
    if (arr[i] >= arr[maxIndex]) {
        maxIndex = i;
    }
}

console.log(`Minimum value:\t${arr[minIndex]},\tindex:\t${minIndex}`);
console.log(`Maximum value:\t${arr[maxIndex]},\tindex:\t${maxIndex}`);

[arr[minIndex], arr[maxIndex]] = [arr[maxIndex], arr[minIndex]];

console.log(arr.join(', '));

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
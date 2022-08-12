if (confirm('Tell me three most important words 💚')) {
    const COUNT_OF_WORDS = 3;
    let words = new Array(COUNT_OF_WORDS);


    for (let indexWord = 0; indexWord < COUNT_OF_WORDS; indexWord++) {

        while (!words[indexWord] || (/\d/.test(words[indexWord]))) {
            words[indexWord] = (prompt(`Enter word #${indexWord+1}`) || ``).trim();
        }
        let wordTransform;

        while (!wordTransform) { // !wordTransform + default = !wordTransform && wordTransform !=='uppercase' && wordTransform !=='lowercase' && wordTransform !=='capitalize')
            wordTransform = (prompt(`Choose type of transformation for "${words[indexWord]}" : uppercase|lowercase|capitalize`, 'lowercase') || ``).toLowerCase().replaceAll(' ', '');

            switch (wordTransform) {
                case "uppercase":
                    words[indexWord] = words[indexWord].toUpperCase();
                    break;
                case "lowercase":
                    words[indexWord] = words[indexWord].toLowerCase();
                    break;
                case "capitalize":
                    words[indexWord] = words[indexWord][0].toUpperCase() + words[indexWord].slice(1).toLowerCase();
                    break;
                default:
                    wordTransform = null;
            }
        }
    }

    console.log(`${words.join(' ')}!`);
}
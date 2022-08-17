if (confirm('Tell me three most important words 💚')) {
    const COUNT_OF_WORDS = 3;
    let words = ``;




    for (let indexWord = 0; indexWord < COUNT_OF_WORDS; indexWord++) {
        let word;
        let notValidWord;

        while (!word || notValidWord) { //в циклі ходимо поки в нас немає нічого(null, '') або є щось з цифрою
            word = (prompt(`Enter word #${indexWord+1}`) || ``).trim();
            let allLetter = '';

            for (let i = 0; i < word.length; i++) {
                if (isNaN(parseInt(word[i]))) {
                    allLetter += word[i];
                }
            }
            notValidWord = (allLetter !== word);
        }
        let wordTransform;

        while (!wordTransform) { // !wordTransform + default = !wordTransform && wordTransform !=='uppercase' && wordTransform !=='lowercase' && wordTransform !=='capitalize')
            wordTransform = (prompt(`Choose type of transformation for "${word}" : uppercase|lowercase|capitalize`, 'lowercase') || ``).toLowerCase().replaceAll(' ', '');

            switch (wordTransform) {
                case "uppercase":
                    word = word.toUpperCase();
                    break;
                case "lowercase":
                    word = word.toLowerCase();
                    break;
                case "capitalize":
                    word = word[0].toUpperCase() + word.slice(1).toLowerCase();
                    break;
                default:
                    wordTransform = null;
            }
        }
        words += ` ${word}`;
    }
    words += `!`;
    console.log(words);
}
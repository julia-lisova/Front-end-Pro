const sports = [
    ['🤺', 'fencing'],
    ['⛸', 'figure skating'],
    ['⛷', 'skier'],
    ['🏂', 'snowboarder'],
    ['🏌', 'golfing'],
    ['🚣', 'rowing boat'],
    ['🏊', 'swimming'],
    ['🤸', 'gymnastics'],
    ['🤾', 'handball']
];

const winners = [
    ['fencing', '🥇', 'fr'],
    ['fencing', '🥈', 'it'],
    ['fencing', '🥉', 'us'],

    ['figure skating', '🥇', 'ca'],
    ['figure skating', '🥈', 'fr'],
    ['figure skating', '🥉', 'us'],

    ['skier', '🥇', 'no'],
    ['skier', '🥈', 'us'],
    ['skier', '🥉', 'fr'],

    ['snowboarder', '🥇', 'us'],
    ['snowboarder', '🥈', 'jp'],
    ['snowboarder', '🥉', 'au'],

    ['golfing', '🥇', 'gb'],
    ['golfing', '🥈', 'se'],
    ['golfing', '🥉', 'us'],

    ['rowing boat', '🥇', 'us'],
    ['rowing boat', '🥈', 'ml'],
    ['rowing boat', '🥉', 'ro'],

    ['swimming', '🥇', 'us'],
    ['swimming', '🥈', 'gb'],
    ['swimming', '🥉', 'au'],

    ['gymnastics', '🥇', 'it'],
    ['gymnastics', '🥈', 'fr'],
    ['gymnastics', '🥉', 'ua'],

    ['handball', '🥇', 'dk'],
    ['handball', '🥈', 'ke'],
    ['handball', '🥉', 'de'],
];

const olympic = ['🔵', '⚫', '🔴', '🟡', '🟢'];
// Європа — синій, Африка — чорний, Америка — червоний, Азія — жовтий, Австралія — зелений

const continents = [
    ['fr', 'Europe'],
    ['it', 'Europe'],
    ['us', 'America'],
    ['ca', 'America'],
    ['no', 'Europe'],
    ['jp', 'Asia'],
    ['au', 'Oceania'],
    ['gb', 'Europe'],
    ['se', 'Europe'],
    ['ro', 'Europe'],
    ['ua', 'Europe'],
    ['dk', 'Europe'],
    ['de', 'Europe'],
    ['ke', 'Africa'],
    ['ml', 'Africa']
];

const flags = [
    ['fr', '🇫🇷'],
    ['it', '🇮🇹'],
    ['us', '🇺🇸'],
    ['ca', '🇨🇦'],
    ['no', '🇳🇴'],
    ['jp', '🇯🇵'],
    ['au', '🇦🇺'],
    ['gb', '🇬🇧'],
    ['se', '🇸🇪'],
    ['ro', '🇷🇴'],
    ['ua', '🇺🇦'],
    ['dk', '🇩🇰'],
    ['de', '🇩🇪'],
    ['ke', '🇰🇪'],
    ['ml', '🇲🇱']
];

function prepareData(sports, olympic, winners, continents, flags) {
    const olympicContinents = ['Europe', 'Africa', 'America', 'Asia', 'Oceania'];
    const flagsMap = Object.fromEntries(flags);
    const continentsMap = Object.fromEntries(continents);

    let result = [];

    for (let s = 0; s < sports.length; s++) {
        result.push([]); // створили рядок

        for (let o = 0; o < olympicContinents.length; o++) {
            result[s].push(''); // створили комірку

            for (let w = 0; w < winners.length; w++) {

                // не крутимо цей цикл, бо індекс країни у flags === індекс країни у continents
                // for (let f = 0; f < flags.length; f++) {

                // не шукаємо індекс країни для заміни прапора і уточнення континенту,
                // так як беремо їх відразу з відповідних об'єктів (flagsMap/continentsMap)
                // for (let cf = 0; cf < continents.length; cf++) {

                if (winners[w][0] === sports[s][1] &&
                    continentsMap[winners[w][2]] == olympicContinents[o]) {

                    result[s][o] += `<div>${flagsMap[winners[w][2]]} - ${winners[w][1]}</div>`;
                }
            }
        }
        result[s].unshift(sports[s][0]);
    }
    result.unshift(['', ...olympic]);
    return result;
}

function getTable(array) {
    let TRs = [];
    for (let tr of array) {

        let TDs = [];
        for (let td of tr) {
            TDs.push(`<td>${td}</td>`);
        }
        TRs.push(`<tr>${TDs.join(``)}</tr>`);
    }
    return `<table>${TRs.join(``)}</table>`;
}

document.write(getTable(prepareData(sports, olympic, winners, continents, flags)));
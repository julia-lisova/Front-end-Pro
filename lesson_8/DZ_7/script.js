let sports = [
    ['skier', '⛷'],
    ['snowboarder', '🏂'],
    ['apple', '🍎'],
    ['hockey', '🏒'],
    ['ice skate', '⛸'],
    ['swimmer', '🏊'],
    ['surfer', '🏄‍'],
    ['watermelon', '🍉'],
    ['lemon', '🍋'],
    ['rowboat', '🚣'],
    ['bicyclist', '🚴‍']
];

sports = sports.map((element) => element.join(': '));

let winter_sports = sports.slice(0, 5);
let summer_sports = sports.slice(5);
let fruits = winter_sports.splice(2, 1);

fruits.push(...summer_sports.splice(2, 2));

let LiWinter = winter_sports.join(`\n`);
let LiSummer = summer_sports.join(`\n`);
let LiFruits = fruits.join(`\n`);

console.log(`*** Winter sports ***
${LiWinter}

*** Summer sports ***
${LiSummer}

*** Fruits ***
${LiFruits}`);
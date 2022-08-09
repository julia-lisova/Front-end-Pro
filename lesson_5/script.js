let userData = ``,
    userName,
    userSurname,
    userEmail,
    userAge;

while (!userName) {
    userName = (prompt('Enter your name', ' JulIA ') || ``).trim();
    if (userName) {
        userName = userName[0].toUpperCase() + userName.slice(1).toLowerCase();
        const indexOfWhiteSpace = userName.indexOf(` `);
        if (indexOfWhiteSpace > -1) {
            userName = userName.slice(0, indexOfWhiteSpace + 1) +
                userName[indexOfWhiteSpace + 1].toUpperCase() +
                userName.slice(indexOfWhiteSpace + 2);
        }
    }
}
userData += `<li>Full name:  ${userName}`;

while (!userSurname) {
    userSurname = (prompt('Enter your surname', ' liSOVA ') || ``).trim();
    if (userSurname) {
        userSurname = userSurname[0].toUpperCase() + userSurname.slice(1).toLowerCase();
        const indexOfHyphen = userSurname.indexOf(`-`);

        if (indexOfHyphen > -1) {
            userSurname = userSurname.slice(0, indexOfHyphen + 1) +
                userSurname[indexOfHyphen + 1].toUpperCase() +
                userSurname.slice(indexOfHyphen + 2);
        }
    }
}
userData += ` ${userSurname}</li>`;

while (!userEmail || !userEmail.includes(`@`) || userEmail.startsWith(`@`) || userEmail.endsWith(`@`)) {
    userEmail = prompt('Enter your email', ' test @  email ');
    if (userEmail) {
        userEmail = userEmail.replaceAll(` `, ``).toLowerCase();
    }
}
userData += ` <li> Email: ${userEmail}</li>`;

while (!userAge) {
    userAge = prompt('Enter your year of birth', '1 9 9 0 ');
    if (userAge) {
        userAge = userAge.replaceAll(` `, ``);
        userAge = new Date().getFullYear() - userAge;
    }
}
userData += ` <li> Age: ${userAge}</li>`;

document.write(`<ul class='list'>${userData}</ul>`);
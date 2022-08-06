let sumPrice = 0, //буду наліплювати як снігову кулю
    order = ``;

if (confirm(`Would you like to place an order?`)) {
    if (prompt(`Choose what kind of burger you want: hamburger/cheeseburger`) === `cheeseburger`) {
        sumPrice += 15;
        if (confirm(`Would you like to add double cheese?`)) {
            sumPrice += 5;
            order += `<li>Bulka 🍔:  Double cheeseburger</li>`;
        } else {
            order += `<li>Bulka 🍔:  cheeseburger</li>`;
        }

    } else {
        order += `<li>Bulka 🍔:  hamburger</li>`;
        sumPrice += 10;
    }


    if (confirm(`Would you like potato?`)) {
        let sizeOfPotato = prompt(`Choose potato size: small/middle/big`);
        if (sizeOfPotato === `middle`) {
            sumPrice += 15;
            order += `<li>Potato 🍟:  ${sizeOfPotato} </li>`;
        } else if (sizeOfPotato === `big`) {
            sumPrice += 20;
            order += `<li>Potato 🍟:  ${sizeOfPotato} </li>`;
        } else {
            sumPrice += 10;
            order += `<li>Potato 🍟:  small </li>`;
        }
        // Або можна зробити через  switch:
        //switch (sizeOfPotato) {
        //     case "middle":
        //         sumPrice += 15;
        //         order += `<li>Potato 🍟: ${sizeOfPotato} </li>`;
        //         break;
        //     case "big":
        //         sumPrice += 20;
        //         order += `<li>Potato 🍟: ${sizeOfPotato} </li>`;
        //         break;
        //     default:
        //         sumPrice += 10;
        //         order += `<li>Potato 🍟: small </li>`;
        // }
    }

    if (confirm(`Would you like sauce?`)) {
        if (prompt(`Choose sauce: ketchup/mayonnaise`) === `mayonnaise`) {
            sumPrice += 3;
            order += `<li>Sauce 🧂:  mayonnaise </li>`;
        } else {
            sumPrice += 2;
            order += `<li>Sauce 🧂:  ketchup </li>`;
        }
    }
    console.log(`$${sumPrice}`);
    document.write(`<h2>Your order:</h2>
    <ul>
        ${order}
    </ul>
    <p>Price: $${sumPrice} </p>`);

} else {
    alert(`Ok. Good day!`);
}
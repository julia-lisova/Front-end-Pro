let response = [];

const getFile = (file) => {
    const request = new XMLHttpRequest();
    request.open('GET', file);
    request.send();

    request.addEventListener(`readystatechange`, () => {
        if (request.readyState === 4 && request.status >= 200 && request.status < 400) {
            response.push(...JSON.parse(request.response).children);
        }
    })
}

getFile(`./data.json`);
getFile(`./data2.json`);
console.log(response);

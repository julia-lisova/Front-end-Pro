let response = [];

const getFile = (file) => {
    const request = new XMLHttpRequest();
    request.open('GET', file, false);
    request.send();

    if (request.status >= 200 && request.status < 400) {
        response.push(...JSON.parse(request.response).children);
    }
}

getFile(`./data.json`);
getFile(`./data2.json`);
console.log(response);

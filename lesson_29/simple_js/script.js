const wrapperCar = document.createElement('div');
const wrapperTitle = document.createElement('div');
const wrapperBtn = document.createElement('div');
const loader = document.createElement('div');
wrapperCar.classList.add("wrapperCar");
wrapperTitle.classList.add("title");
wrapperBtn.classList.add("wrapperBtn");
loader.classList.add("loader", "has-animation");
document.body.append(wrapperCar);
document.body.append(wrapperTitle);
document.body.append(wrapperBtn);
document.body.append(loader);

const API_Tesla = 'https://raw.githubusercontent.com/brightestsirius/Front-end-Pro-19/master/lesson_27/tesla.json';
const API_Car = ' https://mc-astro.github.io/tesla-roadster-colors/img';

const loaderShow = () => loader?.classList.remove("hidden");
const loaderHide = () => loader.classList.add("hidden");

// sendRequest
const sendRequest = async (url) => {
    const response = await fetch(url);
    return response.ok
        ? response.json()
        : Promise.reject([response.status, response.statusText]);
}
// sendRequest

// renderCar
const renderImgCar = (obj) => {
    // loaderShow();
    const img = document.createElement("img");
    img.classList.add("tesla-img", "has-animation");
    img.src = API_Car + `/${obj.img}.jpg`;
    wrapperCar.append(img);
}
// renderCar

// renderTitle
const renderTitle = (obj) => {
    const title = document.createElement('h2');
    title.classList.add("has-animation");
    title.innerText = obj.title;
    wrapperTitle.append(title);
}
// renderTitle

// renderBtnCar
const renderBtnCar = (obj) => {
    const btn = document.createElement("button");
    btn.classList.add("btn", `btn-${obj.img}`, "has-animation");
    wrapperBtn.append(btn);

    btn.addEventListener("click", (e) => {
        loaderShow();
        (()=>{
        let buttonsSelected = wrapperBtn.querySelector(".selected");
        buttonsSelected?.classList.remove("selected");
        e.target.classList.add("selected");

        const img = document.querySelector('img');
        const title = document.querySelector('h2');
        wrapperCar.removeChild(img);
        wrapperTitle.removeChild(title);

            renderImgCar(obj);
            renderTitle(obj);
        })()
       setTimeout( loaderHide, 1200);
    })
}
// renderBtnCar

(async () => {

    try {
        const teslaData = await sendRequest(API_Tesla);
        renderImgCar(teslaData[0]);
        renderTitle(teslaData[0]);
        teslaData.forEach((objColorType) => {
            renderBtnCar(objColorType);
        });
    } catch (e) {
        console.log(e);
    } finally {
        loaderHide();
    }
})();


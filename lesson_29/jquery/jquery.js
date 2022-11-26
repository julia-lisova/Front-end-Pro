$(function () {
    const wrapperCar = $('<div></div>')
        .addClass("wrapperCar")
        .appendTo("body")
    const wrapperTitle = $('<div></div>')
        .addClass("wrapperTitle")
        .appendTo("body");
    const wrapperBtn = $('<div></div>')
        .addClass("wrapperBtn")
        .appendTo("body");
    const loader = $("<div class='loader has-animation'></div>");
    loader.appendTo("body");

    const API_Tesla = 'https://raw.githubusercontent.com/brightestsirius/Front-end-Pro-19/master/lesson_27/tesla.json';
    const API_Car = ' https://mc-astro.github.io/tesla-roadster-colors/img';

    const loaderShow = () => loader?.removeClass("hidden");
    const loaderHide = () => loader.addClass("hidden");

// sendRequest
    const sendRequest = (url) => {
        loaderShow();
        return $.ajax({
            url: url,
            // async: false,
            type: "GET",
            dataType: "JSON",
            success: data => data,
            error: error => console.log(error)
        }).always(() => {
            loaderHide();
        });
    }
// sendRequest

// renderCar
    const renderImgCar = (obj) => {
        const img = $('<img>', {
            'class': 'tesla-img has-animation',
            'src': `${API_Car}/${obj.img}.jpg`,
        });
        wrapperCar.prepend(img);
    }
// renderCar

// renderTitle
    const renderTitle = (obj) => {
        const title = $("<h2></h2>");
        title.addClass("has-animation")
            .html(obj.title)
            .appendTo(wrapperTitle);
    }
// renderTitle

// renderBtnCar
    const renderBtnCar = (obj) => {
        const btn = $("<button></button>")
        btn.addClass(`btn btn-${obj.img} has-animation`)
            .appendTo(wrapperBtn);

        btn.on("click", (e) => {
            loaderShow();
            let buttonsSelected = $(".selected");
            buttonsSelected?.removeClass("selected");
            $(e.target).addClass("selected");

            const img = $("img", wrapperCar);
            const title = $("h2", wrapperTitle);
            img.remove();
            title.remove();

            renderImgCar(obj);
            renderTitle(obj);
            setTimeout( loaderHide, 1200);
        })
    }
// renderBtnCar

    $(() => {
        sendRequest(API_Tesla)
            .done((teslaData) => {
                renderImgCar(teslaData[0]);
                renderTitle(teslaData[0]);
                $(teslaData).each((index, objColorType) => {
                    renderBtnCar(objColorType);
                });
            })
            .fail((e) => console.log(e))
            .always(loaderHide);
    });
});

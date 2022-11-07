const API_Comics = `https://61c9d37520ac1c0017ed8eac.mockapi.io`;
const table = document.createElement('table');
const tbody = document.createElement('tbody');
// const loader = document.createElement('div');
// loader.classList.add('loader');

const comicsForm = document.getElementById('comicsForm');
const nameHero = document.getElementById('nameHero');
const selectComics = document.getElementById('selectComics');
const favourite = document.getElementById('favourite');
let heroes = [];

const sendRequest = async (url) => {
    let response = await fetch(url);
    return response.ok
        ? response.json()
        : Promise.reject([response.status, response.statusText]);
};

//renderHeroesTable
const renderHeroesTable = () => {
    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('tableWrapper');
    document.body.append(tableWrapper);
    tableWrapper.append(table);
    renderTableTitles();
    heroes.forEach(hero => {
        tbody.append(renderHero(hero));
    });

    table.append(tbody);
};

const renderTableTitles = () => {
    const thead = document.createElement('thead');
    const trTitle = document.createElement('tr');
    thead.appendChild(trTitle);

    const title = ['Name', 'Comics (DC, Marvel)', 'Favourite', 'Actions'];
    title.forEach(item => {
        const th = document.createElement('th');
        th.innerText = item;
        trTitle.appendChild(th);
    });
    table.prepend(thead);
};

const renderHero = (heroObj) => {
    const tr = document.createElement('tr');
    tr.dataset.id = heroObj.id;
    const name = document.createElement('td');
    const comics = document.createElement('td');
    const favourite = document.createElement('td');
    const action = document.createElement('td');
    name.innerText = heroObj.name;
    comics.innerText = heroObj.comics;

    const favCheckbox = document.createElement('input');
    favCheckbox.type = 'checkbox';
    favCheckbox.dataset.id = heroObj.id;
    favCheckbox.checked = heroObj.favourite;
    favCheckbox.name = 'favour';
    favCheckbox.classList.add('--checkbox-favour', 'checkbox-fav');
    favourite.append(favCheckbox);

    const btnDel = document.createElement('button');
    btnDel.dataset.id = heroObj.id;
    btnDel.innerText = 'Delete';
    btnDel.classList.add('--bnt-delete', 'btn-del');
    action.appendChild(btnDel);

    tr.appendChild(name);
    tr.appendChild(comics);
    tr.appendChild(favourite);
    tr.appendChild(action);

    favouriteListener(favCheckbox, false);
    deleteListener(btnDel, false);

    return tr;
}
//renderHeroesTable

//favouriteListener
const favouriteListener = (favour) => {
    favour.addEventListener('click', async () => {
        await fetch(API_Comics + `/heroes/${favour.dataset.id}`, {
            method: `PUT`,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({favourite: favour.checked})
        }).then(data => data.json());
    });
}
//favouriteListener

//deleteListener
const deleteListener = (btnDelete) => {
    btnDelete.addEventListener('click', async () => {
        let heroDelete = await fetch(API_Comics + `/heroes/${btnDelete.dataset.id}`, {method: `DELETE`});
        if (heroDelete.ok) {
            btnDelete.removeEventListener('click', favouriteListener, false);
            btnDelete.removeEventListener('click', deleteListener, false);

            const targetRow = document.querySelector(`tr[data-id="${btnDelete.dataset.id}"]`);
            targetRow.remove();
            const indexHero = heroes.findIndex((hero) => +hero.id === +btnDelete.dataset.id);
            if (indexHero !== -1) {
                heroes.splice(indexHero, 1);
            }
        }
    });
}
//deleteListener

// createHeroListener
const createHeroListener = () => {
    comicsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        let hero = nameHero.value;
        let comicsType = selectComics.value;
        let favChoice = favourite.checked;

        const newHero = {};
        const canCreate = heroes.every(h => hero.toLowerCase() !== h.name?.toLowerCase());
        if (canCreate) {
            newHero.name = hero;
            newHero.comics = comicsType;
            newHero.favourite = favChoice;

            const postNewHero = await fetch(API_Comics + `/heroes`, {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newHero)
            }).then(data => data.json());

            tbody.append(renderHero(postNewHero));
            heroes.push(postNewHero);

        } else {
            console.log('This HERO is already exist');
        }
    });
}
// createHeroListener

(async () => {
    try {
        heroes = await sendRequest(API_Comics + `/heroes`);
        renderHeroesTable();

        const universes = await sendRequest(API_Comics + `/universes`);
        universes.map((universe) => {
                const option = document.createElement('option');
                option.value = universe.name;
                option.innerText = universe.name;
                option.dataset.id = universe.id;
                selectComics.append(option);
            }
        );

        createHeroListener()

    } catch (e) {
        console.log(e);
    }
})();



const API = 'https://63760e93b5f0e1eb85016862.mockapi.io/users';
export const getList = () => fetch(API).then(data => data.json());

export const changeItem = (obj) => fetch(API + `/${obj.id}`, {
    method: 'PUT',
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(obj)
}).then(data => data.json())

export const deleteItem = (obj) => fetch(API + `/${obj.id}`, {method: 'DELETE'}).then(data => data.json());
export const addItem = (obj) => fetch(API, {
    method: 'POST',
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(obj)
}).then(data => data.json())

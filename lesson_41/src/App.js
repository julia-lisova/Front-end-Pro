import './App.css';
import Table from "./components/Table/Table";
import Form from "./components/Form/Form";
import React, {useState, useEffect} from "react";
import {getList, changeItem, deleteItem, addItem} from "./services/userService.js";
import {FILTER_ALL} from './constants/filter';

function App() {

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState(localStorage.getItem('filterMarried') ? localStorage.getItem('filterMarried') : FILTER_ALL);

    useEffect(() => {
        localStorage.setItem('filterMarried', filter)
    }, [filter]);

    const getListUser = async () => setUsers(await getList());
    const changeUser = async user => await changeItem(user);
    const deleteUser = async user => {
        await deleteItem(user);
        setUsers(prevState => prevState.filter(i => i.id !== user.id))
    };
    const addUser = async user => {
        const data = await addItem(user);
        setUsers(prevState => ([...prevState, data]));
    }

    return (
        <div className='wrapper'>
            <Table users={users}
                   getListUser={getListUser}
                   changeUser={changeUser}
                   deleteUser={deleteUser}
                   filter={filter}
                   setFilter={setFilter}
            />
            <Form addUser={addUser}/>
        </div>
    )
}

export default App;

import './Table.css';
import React, {useEffect, useState} from "react";
import TableItem from '../TableItem/TableItem.jsx';
import Filter from "../Filter/Filter";
import {FILTER_ALL, FILTER_MARRIED, FILTER_NOT_MARRIED} from '../../constants/filter';

function TableH({data, useFilter, filter, setFilter}) {
    if (useFilter) {
        return (<th>
            {data}
            <Filter filter={filter} setFilter={setFilter}/>
        </th>);
    }
    return <th>{data}</th>;
}

export default function Table({getListUser, users, changeUser, deleteUser, filter, setFilter}) {
    const titleTable = ['Name', 'Surname', 'Married', 'Actions'];
    const [usersFiltered, setUsersFiltered] = useState(users);

    useEffect(() => {
        getListUser();
    }, []);

    useEffect(() => {
        setUsersFiltered(users.filter(i => {
            if (filter === FILTER_ALL) return i;
            if (filter === FILTER_MARRIED) return i.married;
            if (filter === FILTER_NOT_MARRIED) return !i.married;
        }))
    }, [users, filter])

    return (
        <table>
            <thead>
            <tr>
                {titleTable.map((item, index) =>
                    <TableH key={index}
                            data={item}
                            filter={filter}
                            setFilter={setFilter}
                            useFilter={item === 'Married'}
                    />
                )}
            </tr>
            </thead>
            <tbody>
            {usersFiltered?.map(user => <TableItem key={Date.now() + `${Math.random()}`}
                                                   user={user}
                                                   changeUser={changeUser}
                                                   deleteUser={deleteUser}
                />
            )}
            </tbody>
        </table>
    );
}

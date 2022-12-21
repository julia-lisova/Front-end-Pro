import React, {useState} from "react";
import './Form.css'

export default function Form({addUser}) {
    const [newUser, setNewUser] = useState({
        name: ``,
        surname: ``,
        married: false,
    });

    const handleAddName = e => setNewUser(prevState => ({...prevState, name: e.target.value}));
    const handleAddSurname = e => setNewUser(prevState => ({...prevState, surname: e.target.value}));
    const handleAddMarried = e => setNewUser(prevState => ({...prevState, married: e.target.checked}));

    const handleSubmit = e => {
        e.preventDefault();
        addUser(newUser);
        e.target.reset();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div><label>Name: </label>
                <input type='text' onBlur={handleAddName}/></div>
            <div><label>Surname: </label><input type='text' onBlur={handleAddSurname}/></div>
            <div><label>Married: </label><input type='checkbox' onChange={(event) => handleAddMarried(event)}/></div>
            <button className='submitButton'>Add contact</button>
        </form>
    )
}
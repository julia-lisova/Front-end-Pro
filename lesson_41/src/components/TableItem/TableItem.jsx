import React, {useState} from "react";
import './TableItem.css'

export default function TableItem({user, changeUser, deleteUser}) {
    const [userChanged, setUserChanged] = useState(user);

    const handleName = e => setUserChanged(prevState => ({...prevState, name: e.target.value}));
    const handleSurname = e => setUserChanged(prevState => ({...prevState, surname: e.target.value}));
    const handleMarried = e => setUserChanged(prevState => ({...prevState, married: e.target.checked}));
    const handleSaveChange = () => changeUser(userChanged);
    const handleDeleteItem = () => deleteUser(user);

    return (
        <tr key={+user.id}>
            <td><input type='text' defaultValue={user.name} onBlur={handleName}/></td>
            <td><input type='text' defaultValue={user.surname} onBlur={handleSurname}/></td>
            <td><input type='checkbox' defaultValue={user.married} defaultChecked={user.married}
                       onChange={handleMarried}/></td>
            <td>
                <button onClick={handleSaveChange} className='saveChangesButton'>Save changes</button>
                <button onClick={handleDeleteItem} className='btn-del'>Delete</button>

            </td>
        </tr>
    )
}
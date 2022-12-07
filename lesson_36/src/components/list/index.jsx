import {Component} from "react";
import './style.css';

class List extends Component {
    render() {
        const {list, action} = this.props;
        return <div className='wrapper-list'>
            <ul>
                {list.map((item) => <li key={item.id}>{item.title}</li>)}
            </ul>
            {list.length
                ? <div className='wrapper-list-buttons'>
                    {action.map(({action, text}, index) => <button onClick={action} key={index}>{text}</button>)}
                </div>
                : undefined}
        </div>
    }
}

export default List;
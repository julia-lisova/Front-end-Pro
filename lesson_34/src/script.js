const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);

const todoList = [
    {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
    },
    {
        userId: 1,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        completed: true,
    },
    {
        userId: 1,
        id: 3,
        title: "fugiat veniam minus",
        completed: false,
    },
    {
        userId: 1,
        id: 4,
        title: "et porro tempora",
        completed: true,
    },
    {
        userId: 1,
        id: 5,
        title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
        completed: false,
    }
];

class App extends React.Component {
    render() {
        const {arr = []} = this.props;
        return <React.Fragment>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>To do</th>
                    <th>Completed</th>
                </tr>
                </thead>
                <tbody>
                    {arr.map((item, index) => <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>
                            <Checked key={index} item={item.completed}/>
                        </td>
                    </tr>)
                    }
                </tbody>
            </table>
        </React.Fragment>;
    }
}

class Checked extends React.Component {
    render(){
        return this.props.item ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-check2" viewBox="0 0 16 16">
                <path
                    d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
            : null
    }
}

root.render(<App arr={todoList}/>);
import Animals from './animals.js'
const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);

const animals = [
    {type: `turtle`, icon: `🐢`},
    {type: `octopus`, icon: `🐙`},
    {type: `fish`, icon: `🐠`},
    {type: `flamingo`, icon: `🦩`},
    {type: `penguin`, icon: `🐧`}
]

class App extends React.Component {
    render() {
        return <React.Fragment>
            <Animals animals={animals}/>
        </React.Fragment>
    }
}

root.render(<App/>);
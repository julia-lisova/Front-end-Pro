const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);

const animals = [
    {type: `turtle`, icon: `🐢`},
    {type: `octopus`, icon: `🐙`},
    {type: `fish`, icon: `🐠`},
    {type: `flamingo`, icon: `🦩`},
    {type: `penguin`, icon: `🐧`}
]

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function myRandomInts(quantity, min, max) {
    const set = new Set()
    while (set.size < quantity) {
        set.add(getRandomIntInclusive(min, max))
    }
    return Array.from(set)
}

class Animals extends React.Component {
    constructor(props) {
        super(props);
        const stateAnimList = this.state.animalList;
        const randomIndexes = myRandomInts(this.state.animalList.length, 0, this.state.animalList.length - 1);
        let randomIndex = 0;

        const chosenItem = setInterval(() => {
            do {
                stateAnimList[randomIndexes[randomIndex]].isActive = true;
                randomIndex++
            } while (randomIndex > this.state.animalList.length)

            this.setState({
                animalList: stateAnimList,
            }, () => {
                const activeAnimals = this.state.animalList.filter((i => i.isActive));
                if (activeAnimals.length === Math.round(this.props.animals.length / 2)) {
                    this.setState({
                        half: true,
                        borderWidth: '10px'
                    })
                }

                if (stateAnimList.every((i) => i.isActive)) {
                    clearInterval(chosenItem);
                    this.setState({
                        half: false,
                        borderWidth: '20px'
                    })
                }
            })
        }, 2000)
    }

    state = {
        animalList: this.props.animals,
        half: false,
        borderWidth: '1px'
    }

    render() {
        const {animalList = [], half, borderWidth} = this.state;
        return animalList.length ? <table style={{borderWidth: borderWidth}}>
            <tbody>
            {animalList.map((item, index) => <tr className={item.isActive ? 'chosen' : 'list'} key={index}>
                <td>{item.type}</td>
                <td>{item.icon}</td>
            </tr>)
            }
            </tbody>
        </table> : undefined
    }
}

class App extends React.Component {
    render() {
        return <React.Fragment>
            <Animals animals={animals}/>
        </React.Fragment>
    }
}

root.render(<App/>);
import TableItem from './tableItem.js'

export default class Animals extends React.Component {
    constructor(props) {
        super(props);

        const chosenItem = setInterval(() => {
            const randomIndex = this.state.listIndexes[Math.floor(Math.random() * this.state.listIndexes.length)];
            this.setState({
                animalList: this.state.animalList.map((value, index) => {

                    if (+randomIndex === index) {
                        value.isActive = true;
                    }
                    return value
                }),
                listIndexes: this.state.listIndexes.filter(item => item !== randomIndex)
            }, () => {

                const activeAnimals = this.state.animalList.filter((i => i.isActive));
                if (activeAnimals.length === Math.round(this.props.animals.length / 2)) {
                    this.setState({
                        half: true,
                        borderWidth: '10px'
                    })
                }

                if (this.state.animalList.every((i) => i.isActive)) {
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
        listIndexes: Object.keys(this.props.animals),
        half: false,
        borderWidth: '1px'
    }

    render() {
        const {animalList = [], half, borderWidth} = this.state;
        return animalList.length ? <table style={{borderWidth: borderWidth}}>
            <tbody>
            {animalList.map((item, index) => <TableItem key={index} item={item}/>
            )}
            </tbody>
        </table> : undefined
    }
}
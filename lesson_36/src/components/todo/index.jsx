import {Component} from "react";
import './style.css';
import List from "../list";

class ToDo extends Component {
    constructor(props) {
        super(props);

        this.transferToFirst = this.transferToFirst.bind(this);
        this.transferToSecond = this.transferToSecond.bind(this);
        this.transferToThird = this.transferToThird.bind(this);
        this.removeLastItem = this.removeLastItem.bind(this);
    }

    state = {
        firstList: this.props.list,
        secondList: [],
        thirdList: [],
    }

    transferToFirst() {
        this.setState({
            secondList: this.state.secondList.slice(1),
            firstList: [this.state.secondList[0], ...this.state.firstList]
        })
    }

    transferToSecond() {
        this.setState({
            secondList: [this.state.firstList[0], ...this.state.secondList],
            firstList: this.state.firstList.slice(1)
        })
    }

    transferToThird() {
        this.setState({
            thirdList: [this.state.secondList[0], ...this.state.thirdList],
            secondList: this.state.secondList.slice(1)
        })
    }

    removeLastItem() {
        this.setState({
            thirdList: this.state.thirdList.slice(0, -1)
        })
    }

    render() {
        const {
            firstList,
            secondList,
            thirdList,
        } = this.state;

        return <div className='wrapper-lists'>
            <List list={firstList} action={[
                {
                    text: 'Transfer first to right',
                    action: this.transferToSecond
                }
            ]}/>
            <List list={secondList} action={[
                {
                    text: "Transfer first to left",
                    action: this.transferToFirst
                },
                {
                    text: "Transfer first to right",
                    action: this.transferToThird
                }
            ]}/>
            <List list={thirdList} action={[
                {
                    text: "Remove last item",
                    action: this.removeLastItem
                }
            ]}/>
        </div>
    }
}

export default ToDo;
export default class TableItem extends React.Component {
    render() {
        const {item} = this.props;
        return <tr className={item.isActive ? 'chosen' : 'list'}>
            <td>{item.type}</td>
            <td>{item.icon}</td>
        </tr>
    }
}
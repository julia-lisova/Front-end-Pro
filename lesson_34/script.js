var domContainer = document.querySelector("#root");
var root = ReactDOM.createRoot(domContainer);

var todoList = [{
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false
}, {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    completed: true
}, {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    completed: false
}, {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    completed: true
}, {
    userId: 1,
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    completed: false
}];

function App(_ref) {
    var _ref$arr = _ref.arr,
        arr = _ref$arr === undefined ? [] : _ref$arr;

    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            "table",
            null,
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        "\u2116"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "To do"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Completed"
                    )
                )
            ),
            React.createElement(
                "tbody",
                null,
                arr.map(function (item, index) {
                    return React.createElement(
                        "tr",
                        { key: index },
                        React.createElement(
                            "td",
                            null,
                            item.id
                        ),
                        React.createElement(
                            "td",
                            null,
                            item.title
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(Checked, { key: index, item: item.completed })
                        )
                    );
                })
            )
        )
    );
}

function Checked(props) {
    return props.item ? React.createElement(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor",
            className: "bi bi-check2", viewBox: "0 0 16 16" },
        React.createElement("path", {
            d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
    ) : null;
}

root.render(React.createElement(App, { arr: todoList }));
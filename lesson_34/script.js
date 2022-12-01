var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            var _props$arr = this.props.arr,
                arr = _props$arr === undefined ? [] : _props$arr;

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
    }]);

    return App;
}(React.Component);

var Checked = function (_React$Component2) {
    _inherits(Checked, _React$Component2);

    function Checked() {
        _classCallCheck(this, Checked);

        return _possibleConstructorReturn(this, (Checked.__proto__ || Object.getPrototypeOf(Checked)).apply(this, arguments));
    }

    _createClass(Checked, [{
        key: "render",
        value: function render() {
            return this.props.item ? React.createElement(
                "svg",
                { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor",
                    className: "bi bi-check2", viewBox: "0 0 16 16" },
                React.createElement("path", {
                    d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
            ) : null;
        }
    }]);

    return Checked;
}(React.Component);

root.render(React.createElement(App, { arr: todoList }));
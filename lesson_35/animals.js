var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import TableItem from './tableItem.js';

var Animals = function (_React$Component) {
    _inherits(Animals, _React$Component);

    function Animals(props) {
        _classCallCheck(this, Animals);

        var _this = _possibleConstructorReturn(this, (Animals.__proto__ || Object.getPrototypeOf(Animals)).call(this, props));

        _this.state = {
            animalList: _this.props.animals,
            listIndexes: Object.keys(_this.props.animals),
            half: false,
            borderWidth: '1px'
        };


        var chosenItem = setInterval(function () {
            var randomIndex = _this.state.listIndexes[Math.floor(Math.random() * _this.state.listIndexes.length)];
            _this.setState({
                animalList: _this.state.animalList.map(function (value, index) {

                    if (+randomIndex === index) {
                        value.isActive = true;
                    }
                    return value;
                }),
                listIndexes: _this.state.listIndexes.filter(function (item) {
                    return item !== randomIndex;
                })
            }, function () {

                var activeAnimals = _this.state.animalList.filter(function (i) {
                    return i.isActive;
                });
                if (activeAnimals.length === Math.round(_this.props.animals.length / 2)) {
                    _this.setState({
                        half: true,
                        borderWidth: '10px'
                    });
                }

                if (_this.state.animalList.every(function (i) {
                    return i.isActive;
                })) {
                    clearInterval(chosenItem);
                    _this.setState({
                        half: false,
                        borderWidth: '20px'
                    });
                }
            });
        }, 2000);
        return _this;
    }

    _createClass(Animals, [{
        key: 'render',
        value: function render() {
            var _state = this.state,
                _state$animalList = _state.animalList,
                animalList = _state$animalList === undefined ? [] : _state$animalList,
                half = _state.half,
                borderWidth = _state.borderWidth;

            return animalList.length ? React.createElement(
                'table',
                { style: { borderWidth: borderWidth } },
                React.createElement(
                    'tbody',
                    null,
                    animalList.map(function (item, index) {
                        return React.createElement(TableItem, { key: index, item: item });
                    })
                )
            ) : undefined;
        }
    }]);

    return Animals;
}(React.Component);

export default Animals;
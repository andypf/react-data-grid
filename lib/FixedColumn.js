"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FixedColumn =
/*#__PURE__*/
function (_Component) {
  _inherits(FixedColumn, _Component);

  function FixedColumn() {
    _classCallCheck(this, FixedColumn);

    return _possibleConstructorReturn(this, _getPrototypeOf(FixedColumn).apply(this, arguments));
  }

  _createClass(FixedColumn, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return this.props.scrollTop != nextProps.scrollTop || this.props.offsetTop != nextProps.offsetTop || this.props.width != nextProps.width || this.props.height != nextProps.height || this.props.itemHeight != nextProps.itemHeight || this.props.rows != nextProps.rows;
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return _react.default.createElement("div", {
        style: {
          position: 'absolute',
          overflow: 'hidden',
          outline: 'none',
          left: 0,
          top: this.props.offsetTop,
          width: this.props.width,
          height: this.props.height - this.props.offsetTop
        }
      }, _react.default.createElement("div", {
        className: "".concat(this.props.className, "__fixed-column"),
        style: {
          position: 'relative',
          top: -this.props.scrollTop
        }
      }, this.props.rows.map(function (row) {
        return _react.default.createElement("div", {
          key: row,
          className: "".concat(_this.props.className, "--row ").concat(row % 2 == 0 ? 'even' : 'odd')
        }, _this.props.cellRenderer({
          row: row,
          column: 0
        }));
      })));
    }
  }]);

  return FixedColumn;
}(_react.Component);

FixedColumn.propTypes = {
  className: _propTypes.default.string,
  offsetTop: _propTypes.default.number,
  scrollTop: _propTypes.default.number,
  width: _propTypes.default.number,
  height: _propTypes.default.number,
  itemHeight: _propTypes.default.number,
  rows: _propTypes.default.array,
  cellRenderer: _propTypes.default.func
};
var _default = FixedColumn;
exports.default = _default;
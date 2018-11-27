"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Cell = _interopRequireDefault(require("./Cell"));

var _Header = _interopRequireDefault(require("./Header"));

var _FixedColumn = _interopRequireDefault(require("./FixedColumn"));

var _LeftTopCell = _interopRequireDefault(require("./LeftTopCell"));

var _Body = _interopRequireDefault(require("./Body"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    _this.state = {
      x: 0,
      y: 0,
      startX: 0,
      endX: 0,
      startY: 0,
      endY: 0,
      width: 0,
      height: 0,
      itemWidth: props.itemWidth,
      itemHeight: props.itemHeight,
      fixedColumnWidth: props.fixedLeftColumn ? props.fixedColumnWidth : 0,
      scrollWidth: (props.columnsCount - (props.fixedLeftColumn ? 1 : 0)) * props.itemWidth,
      scrollHeight: (props.rowsCount - (props.fixedHeader ? -1 : 0)) * props.itemHeight
    };
    _this.container = _react.default.createRef();
    _this.scroll = _react.default.createRef();
    _this.handleWheel = _this.handleWheel.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.resize = _this.resize.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.toggleColumnSelect = _this.toggleColumnSelect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.toggleRowSelect = _this.toggleRowSelect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.cellRenderer = _this.cellRenderer.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.container.current.addEventListener) // W3C DOM
        this.container.current.addEventListener('wheel', this.handleWheel);else if (this.container.current.attachEvent) {
        // IE DOM
        this.container.current.attachEvent('on' + 'wheel', this.handleWheel);
      }
      if (this.scroll.current.addEventListener) // W3C DOM
        this.scroll.current.addEventListener('scroll', this.handleScroll);else if (this.scroll.current.attachEvent) {
        // IE DOM
        this.scroll.current.attachEvent('on' + 'scroll', this.handleScroll);
      }
      if (window.addEventListener) // W3C DOM
        window.addEventListener('resize', this.resize);else if (window.attachEvent) {
        // IE DOM
        window.attachEvent('on' + 'resize', this.resize);
      }
      this.resize();
    }
  }, {
    key: "handleWheel",
    value: function handleWheel(e) {
      // console.info('handleWheel',e)
      // this.scroll.current.style.pointerEvents='none'
      this.scroll.current.scrollLeft = this.scroll.current.scrollLeft + e.deltaX;
      this.scroll.current.scrollTop = this.scroll.current.scrollTop + e.deltaY;
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(this.handleScroll, 1); // this.scroll.current.style.pointerEvents='auto'
    }
  }, {
    key: "handleScroll",
    value: function handleScroll() {
      // console.log('handleScroll')
      var x = this.scroll.current.scrollLeft;
      var y = this.scroll.current.scrollTop;
      var startX = Math.floor(x / this.state.itemWidth);
      var endX = Math.ceil(x / this.state.itemWidth) + this.state.width / this.state.itemWidth;
      var startY = Math.floor(y / this.state.itemHeight);
      var endY = Math.ceil(y / this.state.itemHeight) + this.state.height / this.state.itemHeight;
      if (endX > this.props.columnsCount) endX = this.props.columnsCount;
      if (endY > this.props.rowsCount) endY = this.props.rowsCount;
      this.setState({
        x: x,
        y: y,
        startX: startX,
        endX: endX,
        startY: startY,
        endY: endY
      });
    }
  }, {
    key: "resize",
    value: function resize() {
      var parent = this.container.current.parentElement;
      var parentWidth = Math.max(parent.clientWidth, parent.innerWidth || 0);
      var parentHeight = Math.max(parent.clientHeight, parent.innerHeight || 0); // console.log('parentWidth',parentWidth,'parentHeight',parentHeight)

      this.setState({
        width: parentWidth,
        height: parentHeight
      }, this.handleScroll);
    }
  }, {
    key: "toggleColumnSelect",
    value: function toggleColumnSelect(column) {
      if (column == this.state.selectedColumn) this.setState({
        selectedColumn: null
      });else this.setState({
        selectedColumn: column
      });
    }
  }, {
    key: "toggleRowSelect",
    value: function toggleRowSelect(row) {
      if (row == this.state.selectedRow) this.setState({
        selectedRow: null
      });else this.setState({
        selectedRow: row
      });
    }
  }, {
    key: "cellRenderer",
    value: function cellRenderer(_ref) {
      var row = _ref.row,
          column = _ref.column;
      var columnOffset = column > 0 && this.props.fixedLeftColumn ? -1 : 0;
      var rowOffset = row > 0 && this.props.fixedHeader ? -1 : 0;
      var width = column == 0 && this.props.fixedLeftColumn ? this.props.fixedColumnWidth : this.props.itemWidth;
      return _react.default.createElement(_Cell.default, {
        className: this.props.className,
        key: "".concat(column, "-").concat(row),
        height: this.props.itemHeight,
        width: width,
        left: (column + columnOffset) * this.props.itemWidth,
        top: (row + rowOffset) * this.props.itemHeight,
        selected: column == this.state.selectedColumn || row == this.state.selectedRow
      }, this.props.cellRenderer(row, column));
    }
  }, {
    key: "render",
    value: function render() {
      // console.log('width',this.state.width,'height',this.state.height)
      var rows = [];
      var columns = [];

      for (var row = this.state.startY; row <= this.state.endY; row++) {
        if (!this.props.fixedHeader || row > 0 && row < this.props.rowsCount) rows.push(row);
      }

      for (var column = this.state.startX; column <= this.state.endX; column++) {
        if (!this.props.fixedLeftColumn || column > 0 && column < this.props.columnsCount) columns.push(column);
      }

      return _react.default.createElement("div", {
        ref: this.container,
        className: this.props.className,
        style: {
          overflow: 'hidden',
          width: this.state.width + 'px',
          height: this.state.height + 'px'
        }
      }, _react.default.createElement("div", {
        className: "".concat(this.props.className, "__container"),
        style: {
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          maxWidth: 'inherit',
          maxHeight: 'inherit'
        }
      }, _react.default.createElement(_Body.default, {
        className: this.props.className,
        scrollRef: this.scroll,
        rows: rows,
        columns: columns,
        offsetTop: this.props.fixedHeader ? this.state.itemHeight : 0,
        offsetLeft: this.props.fixedLeftColumn ? this.state.fixedColumnWidth : 0,
        scrollWidth: this.state.scrollWidth,
        scrollHeight: this.state.scrollHeight,
        width: this.state.width,
        height: this.state.height,
        cellRenderer: this.cellRenderer
      }), this.props.fixedLeftColumn && _react.default.createElement(_FixedColumn.default, {
        className: this.props.className,
        rows: rows,
        offsetTop: this.state.itemHeight,
        scrollTop: this.state.y,
        width: this.state.fixedColumnWidth,
        height: this.state.height,
        itemHeight: this.state.itemHeight,
        cellRenderer: this.cellRenderer
      }), this.props.fixedHeader && _react.default.createElement(_Header.default, {
        className: this.props.className,
        scrollLeft: this.state.x,
        offsetLeft: this.state.fixedColumnWidth,
        width: this.state.width,
        height: this.state.itemHeight,
        itemWidth: this.state.itemWidth,
        columns: columns,
        selectedColumn: this.state.selectedColumn,
        toggleColumnSelect: this.toggleColumnSelect,
        cellRenderer: this.cellRenderer
      }), (this.props.fixedLeftColumn || this.props.fixedHeader) && _react.default.createElement(_LeftTopCell.default, {
        className: this.props.className,
        width: this.state.fixedColumnWidth,
        height: this.state.itemHeight,
        cellRenderer: this.cellRenderer
      })));
    }
  }]);

  return App;
}(_react.Component);

App.defaultProps = {
  className: 'andypf-react-data-grid',
  itemWidth: 100,
  itemHeight: 30,
  fixedLeftColumn: false,
  fixedHeader: false,
  fixedColumnWidth: 200,
  cellRenderer: function cellRenderer(row, column) {
    return "".concat(row, "-").concat(column);
  }
};
App.propTypes = {
  className: _propTypes.default.string,
  fixedLeftColumn: _propTypes.default.bool,
  fixedHeader: _propTypes.default.bool,
  columnsCount: _propTypes.default.number,
  rowsCount: _propTypes.default.number,
  cellRenderer: _propTypes.default.func,
  fixedColumnWidth: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.number]),
  itemWidth: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.number]),
  itemHeight: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.number])
};
var _default = App;
exports.default = _default;
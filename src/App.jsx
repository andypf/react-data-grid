/*eslint no-console: ["error", { allow: ["warn", "error","info"] }] */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Cell from './Cell'
import Header from './Header'
import FixedColumn from './FixedColumn'
import LeftTopCell from './LeftTopCell'
import Body from './Body'

class App extends Component {
  constructor(props) {
    super(props)

    this.state={
      x:0,
      y:0,
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
    }
    this.container = React.createRef()
    this.scroll = React.createRef()

    this.handleWheel = this.handleWheel.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.resize = this.resize.bind(this)
    this.toggleColumnSelect = this.toggleColumnSelect.bind(this)
    this.toggleRowSelect = this.toggleRowSelect.bind(this)
    this.cellRenderer = this.cellRenderer.bind(this)
  }

  componentDidMount(){
    if (this.container.current.addEventListener) // W3C DOM
      this.container.current.addEventListener('wheel', this.handleWheel)
    else if (this.container.current.attachEvent) { // IE DOM
      this.container.current.attachEvent('on' + 'wheel', this.handleWheel)
    }

    if (this.scroll.current.addEventListener) // W3C DOM
      this.scroll.current.addEventListener('scroll', this.handleScroll)
    else if (this.scroll.current.attachEvent) { // IE DOM
      this.scroll.current.attachEvent('on' + 'scroll', this.handleScroll)
    }

    if (window.addEventListener) // W3C DOM
      window.addEventListener('resize', this.resize)
    else if (window.attachEvent) { // IE DOM
      window.attachEvent('on' + 'resize', this.resize)
    }

    this.resize()
  }

  handleWheel(e){
    // console.info('handleWheel',e)
    // this.scroll.current.style.pointerEvents='none'
    this.scroll.current.scrollLeft = this.scroll.current.scrollLeft+e.deltaX
    this.scroll.current.scrollTop = this.scroll.current.scrollTop+e.deltaY
    if(this.timer) clearInterval(this.timer)
    this.timer = setInterval(this.handleScroll,1)
    // this.scroll.current.style.pointerEvents='auto'
  }

  handleScroll(){

    // console.log('handleScroll')
    var x = this.scroll.current.scrollLeft
    var y = this.scroll.current.scrollTop

    var startX = Math.floor(x / this.state.itemWidth)
    var endX = Math.ceil(x / this.state.itemWidth) + this.state.width / this.state.itemWidth

    var startY = Math.floor(y / this.state.itemHeight)
    var endY = Math.ceil(y / this.state.itemHeight) + this.state.height / this.state.itemHeight

    if(endX > this.props.columnsCount) endX=this.props.columnsCount
    if(endY > this.props.rowsCount) endY=this.props.rowsCount

    this.setState({x:x,y:y,startX: startX, endX: endX, startY: startY, endY: endY})
  }

  resize(){
    let parent = this.container.current.parentElement
    let parentWidth = Math.max(parent.clientWidth, parent.innerWidth || 0)
    let parentHeight = Math.max(parent.clientHeight, parent.innerHeight || 0)
    // console.log('parentWidth',parentWidth,'parentHeight',parentHeight)
    this.setState({
      width: parentWidth,
      height: parentHeight
    }, this.handleScroll)
  }

  toggleColumnSelect(column){
    if(column==this.state.selectedColumn)
      this.setState({selectedColumn: null})
    else
      this.setState({selectedColumn: column})
  }

  toggleRowSelect(row){
    if(row==this.state.selectedRow)
      this.setState({selectedRow: null})
    else
      this.setState({selectedRow: row})
  }

  cellRenderer({row,column}){
    let columnOffset = column>0 && this.props.fixedLeftColumn ? -1 : 0
    let rowOffset = row>0 && this.props.fixedHeader ? -1 : 0
    let width = column==0 && this.props.fixedLeftColumn ? this.props.fixedColumnWidth : this.props.itemWidth

    return(
      <Cell
        className={this.props.className}
        key={`${column}-${row}`}
        height={this.props.itemHeight}
        width={width}
        left={(column+columnOffset) * this.props.itemWidth}
        top={(row+rowOffset)*this.props.itemHeight}
        selected={column==this.state.selectedColumn || row==this.state.selectedRow}>
        {this.props.cellRenderer(row,column)}
      </Cell>
    )
  }

  render() {
    // console.log('width',this.state.width,'height',this.state.height)
    var rows = []
    var columns = []
    for (var row = this.state.startY; row <= this.state.endY; row++) {
      if (!this.props.fixedHeader || (row>0 && row<this.props.rowsCount)) rows.push(row)
    }

    for (var column = this.state.startX; column <= this.state.endX; column++) {
      if (!this.props.fixedLeftColumn || (column>0 && column<this.props.columnsCount)) columns.push(column)
    }

    return (
      <div
        ref={this.container}
        className={this.props.className}
        style={{
          overflow: 'hidden',
          width: this.state.width+'px',
          height: this.state.height+'px'
        }}>

        <div
          className={`${this.props.className}__container`}
          style={{
            position:'relative',
            width:'100%',
            height:'100%',
            overflow:'hidden',
            maxWidth:'inherit',
            maxHeight:'inherit'
          }}>

          <Body
            className={this.props.className}
            scrollRef={this.scroll}
            rows={rows}
            columns={columns}
            offsetTop={this.props.fixedHeader ? this.state.itemHeight : 0}
            offsetLeft={this.props.fixedLeftColumn ? this.state.fixedColumnWidth : 0}
            scrollWidth={this.state.scrollWidth}
            scrollHeight={this.state.scrollHeight}
            width={this.state.width}
            height={this.state.height}
            cellRenderer={this.cellRenderer}/>

          {this.props.fixedLeftColumn &&
            <FixedColumn
              className={this.props.className}
              rows={rows}
              offsetTop={this.state.itemHeight}
              scrollTop={this.state.y}
              width={this.state.fixedColumnWidth}
              height={this.state.height}
              itemHeight={this.state.itemHeight}
              cellRenderer={this.cellRenderer}/>
          }

          {this.props.fixedHeader &&
            <Header
              className={this.props.className}
              scrollLeft={this.state.x}
              offsetLeft={this.state.fixedColumnWidth}
              width={this.state.width}
              height={this.state.itemHeight}
              itemWidth={this.state.itemWidth}
              columns={columns}
              selectedColumn={this.state.selectedColumn}
              toggleColumnSelect={this.toggleColumnSelect}
              cellRenderer={this.cellRenderer}/>
          }

          {(this.props.fixedLeftColumn || this.props.fixedHeader) &&
            <LeftTopCell
              className={this.props.className}
              width={this.state.fixedColumnWidth}
              height={this.state.itemHeight}
              cellRenderer={this.cellRenderer}/>
          }
        </div>
      </div>
    )
  }
}

App.defaultProps = {
  className: 'andypf-react-data-grid',
  itemWidth: 100,
  itemHeight: 30,
  fixedLeftColumn: false,
  fixedHeader: false,
  fixedColumnWidth: 200,
  cellRenderer: (row,column) => `${row}-${column}`
}

App.propTypes = {
  className: PropTypes.string,
  fixedLeftColumn: PropTypes.bool,
  fixedHeader: PropTypes.bool,
  columnsCount: PropTypes.number,
  rowsCount: PropTypes.number,
  cellRenderer: PropTypes.func,
  fixedColumnWidth: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  itemWidth: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  itemHeight: PropTypes.oneOfType([PropTypes.func, PropTypes.number])
}

export default App

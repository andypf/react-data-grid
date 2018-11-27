/*eslint no-console: ["error", { allow: ["warn", "error","info"] }] */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Body extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.rows!=nextProps.rows ||
      this.props.columns!=nextProps.columns ||
      this.props.offsetTop!=nextProps.offsetTop ||
      this.props.offsetLeft!=nextProps.offsetLeft ||
      this.props.width!=nextProps.width ||
      this.props.height!=nextProps.height
  }

  render(){
    return(
      <div
        ref={this.props.scrollRef}
        style={{
          position:'absolute',
          left: this.props.offsetLeft,
          top: this.props.offsetTop,
          width:this.props.width-this.props.offsetLeft,
          height:this.props.height-this.props.offsetTop,
          overflow:'auto',
          maxWidth:'inherit',
          maxHeight:'inherit',
          /*pointerEvents: 'none'*/
        }}>

        <div
          className={`${this.props.className}__body`}
          style={{
            position: 'absolute',
            width: this.props.scrollWidth,
            height: this.props.scrollHeight
          }}>
          {this.props.rows.map(row =>
            <div
              key={row}
              className={`${this.props.className}--row ${row%2==0 ? 'even' : 'odd'}`}
              style={{position: 'absolute'}}>
              {this.props.columns.map(column => this.props.cellRenderer({row,column}))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

Body.propTypes = {
  className: PropTypes.string,
  scrollRef: PropTypes.object,
  rows: PropTypes.array,
  columns: PropTypes.array,
  offsetTop: PropTypes.number,
  offsetLeft: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  scrollWidth: PropTypes.number,
  scrollHeight: PropTypes.number,
  cellRenderer: PropTypes.func
}

export default Body

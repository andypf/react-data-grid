/*eslint no-console: ["error", { allow: ["warn", "error","info"] }] */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FixedColumn extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.scrollTop!=nextProps.scrollTop ||
      this.props.offsetTop!=nextProps.offsetTop ||
      this.props.width!=nextProps.width ||
      this.props.height!=nextProps.height ||
      this.props.itemHeight!=nextProps.itemHeight ||
      this.props.rows!=nextProps.rows
  }

  render(){
    return(
      <div style={{
        position: 'absolute',
        overflow: 'hidden',
        outline: 'none',
        left: 0,
        top: this.props.offsetTop,
        width: this.props.width,
        height: this.props.height-this.props.offsetTop
      }}>
        <div
          className={`${this.props.className}__fixed-column`}
          style={{position: 'relative', top: -this.props.scrollTop}}>
          {this.props.rows.map(row =>
            <div
              key={row}
              className={`${this.props.className}--row ${row%2==0 ? 'even' : 'odd'}`}>
              {this.props.cellRenderer({row,column:0})}
            </div>
          )}
        </div>
      </div>
    )
  }
}

FixedColumn.propTypes = {
  className: PropTypes.string,
  offsetTop: PropTypes.number,
  scrollTop: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  itemHeight: PropTypes.number,
  rows: PropTypes.array,
  cellRenderer: PropTypes.func
}

export default FixedColumn

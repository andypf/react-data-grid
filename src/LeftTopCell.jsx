/*eslint no-console: ["error", { allow: ["warn", "error","info"] }] */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LeftTopCell extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.width!=nextProps.width ||
    this.props.height!=nextProps.height
  }

  render(){
    return (
      <div
        style={{
          position: 'absolute',
          overflow: 'hidden',
          outline: 'none',
          left: 0,
          top: 0,
          width: this.props.width,
          height: this.props.height
        }}>
        <div
          className={`${this.props.className}__left-top-cell`}
          style={{position: 'relative'}}>
          <div className={`${this.props.className}--row`}>
            {this.props.cellRenderer({row:0,column:0})}
          </div>
        </div>
      </div>
    )
  }
}

LeftTopCell.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  cellRenderer: PropTypes.func
}

export default LeftTopCell

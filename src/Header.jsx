/*eslint no-console: ["error", { allow: ["warn", "error","info"] }] */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Header extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.offsetLeft!=nextProps.offsetLeft ||
      this.props.scrollLeft!=nextProps.scrollLeft ||
      this.props.width!=nextProps.width ||
      this.props.height!=nextProps.height ||
      this.props.columns!=nextProps.columns
  }

  render(){
    return(
      <div
        style={{
          position: 'absolute',
          overflow: 'hidden',
          outline: 'none',
          left: this.props.offsetLeft,
          top: '0px',
          height: this.props.height,
          width: this.props.width-this.props.offsetLeft}}>
        <div
          className={`${this.props.className}__fixed-header`}
          style={{position: 'relative', left: -this.props.scrollLeft}}>
          <div key='header' className={`${this.props.className}--row`}>
            {this.props.columns.map(column => this.props.cellRenderer({row:0,column}))}
          </div>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  className: PropTypes.string,
  offsetLeft: PropTypes.number,
  scrollLeft: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  columns: PropTypes.array,
  cellRenderer: PropTypes.func
}

export default Header

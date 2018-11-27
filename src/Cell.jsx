/*eslint no-console: ["error", { allow: ["warn", "error","info"] }] */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Cell Renderer
class Cell extends Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    return this.props.width!=nextProps.width ||
    this.props.height!=nextProps.height ||
    this.props.left!=nextProps.left ||
    this.props.top!=nextProps.top  ||
    this.props.selected!=nextProps.selected
  }

  render(){
    return(
      <div
        className={`${this.props.className}--cell-wrapper ${this.props.selected ? 'selected' : ''}`}
        style={{
          position: 'absolute',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          height: this.props.height,
          width: this.props.width,
          left: this.props.left,
          top: this.props.top
        }}>
        {this.props.children}
      </div>
    )
  }
}

Cell.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  left: PropTypes.number,
  top: PropTypes.number,
  selected: PropTypes.bool,
  children: PropTypes.node
}

export default Cell

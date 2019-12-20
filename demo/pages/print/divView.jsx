// 用于解决基本的左右布局
import React, { Component } from 'react'

import './divView.less'

export default class DivView extends Component {

  constructor() {
    super()
    this.state = {
      fullHeight: 'auto',
    }
  }

  componentDidMount() {
    const { autoHeight = true } = this.props
    // if (!autoHeight) {
    //   const fullHeight = `${this.refs.parent.offsetHeight}px`
    //   this.setState({
    //     fullHeight,
    //   })
    // }
  }

  render() {
    const {
      text,
      children,
      className = "",
      textStyles = {},
      style = {}
    } = this.props
    const { fullHeight } = this.state
    const space = typeof children === 'string'
    return (
      <div
        className={`div-row-view ${className}`}
        style={{ ...style }}
        ref="parent"
      >
        <div
          className="float-left"
          style={{ height: fullHeight, lineHeight: fullHeight, ...textStyles }}
        >
          {text}
        </div>
        <div className={`float-right ${space && 'space'}`}>
          {children}
        </div>
      </div>
    )
  }
}
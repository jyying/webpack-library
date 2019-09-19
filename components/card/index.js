import React, { Component } from 'react'

import './style/index.less'

export default class Card extends Component {
  render() {
    return (
      <div className="card">
        <h1>card</h1>
        {this.props.children}
      </div>
    )
  }
}
import React, { Component } from 'react'

import './style/index.less'

export default class ListView extends Component {
  render() {
    return (
      <div className="list-view">
        <h1>list-view</h1>
        {this.props.children}
      </div>
    )
  }
}
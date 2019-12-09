import React, { Component } from 'react'

import styles from './index.less'

export default class StyleHash extends Component {
  render() {
    return (
      <div className={styles.names}>
        style
        <div className="name">{this.props.data}</div>
      </div>
    )
  }
}
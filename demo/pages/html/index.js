import React, { Component, cloneElement } from 'react'
import { Link } from 'react-router-dom'

import { getInfo } from '../mobx/index'

import '../stylehash/index.less'

export default class AntdDemo extends Component {
  render() {
    console.log(this.props.children, getInfo())
    const children = this.props.children
    return (
      <div>
        htmldemo
        <Link to="style">style</Link> ||
        <Link to="gantt">gantt</Link>
        {
          children && (
            children instanceof Array ?
              children.map((child, key) => cloneElement(child, { key }))
              :
              cloneElement(children)
          )
        }
      </div>
    )
  }
}
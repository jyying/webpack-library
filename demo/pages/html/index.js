import React, { Component, cloneElement } from 'react'

export default class AntdDemo extends Component {
  render() {
    console.log(this.props.children)
    const children = this.props.children
    return (
      <div>
        htmldemo
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
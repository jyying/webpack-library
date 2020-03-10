import React, { Component } from 'react'

import { a } from './base1'

const base = require('./base.js')

import styles from './index.less'

export default class StyleHash extends Component {
  constructor() {
    super()
    this.state = {
      ue: {
        name: '张三',
        age: 20,
      },
      height: 180,
    }

    // console.log(a, base)

    // a.name = 10
    // base.age = 20
    // console.log(a, base)
  }

  change = () => {
    const { ue } = this.state
    ue.age++
    this.setState({
      ue,
    })
  }

  noChange = () => {
    const { ue } = this.state
    ue.name = '张三'
    this.setState({
      ue,
    })
  }

  changeHeight = (_height) => {
    const height = typeof _height === Number ? _height : this.state.height
    this.setState({
      height,
    })
  }

  componentDidMount() {
    // window.addEventListener('scroll', (e) => console.log(this, '============', e.target.documentElement.scrollTop))
  }

  render() {
    console.log('render------------------------------', this.state)
    const { ue, height } = this.state
    return (
      <div className={styles.names}>
        <div className="name">{this.props.data}</div>

        <p>名称：{ue.name}</p>
        <p>年龄：{ue.age}</p>
        <p>身高：{height}</p>

        <button onClick={this.change}>变化</button>
        <button onClick={this.noChange}>无变化</button>
        <button onClick={this.changeHeight.bind(this, 190)}>变化高</button>
        <button onClick={this.changeHeight}>无变化</button>

        <iframe src="http://localhost:8101/vpplatweb/#/entityparam/list/{istatusid:5}/7/162?_k=sktqif"></iframe>
      </div>
    )
  }
}
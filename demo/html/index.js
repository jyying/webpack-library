import React, { Component } from 'react'

export default class HtmlDemo extends Component {

  static defaultProps = {
    isIframe: true,
  }

  constructor() {
    super()
    this.state = {
      show: false,
    }
  }

  name = (name = 'htmlDemo') => {
    console.log(name)
    this.setState({
      show: true
    })
  }

  render() {
    const { isIframe } = this.props
    const { show } = this.state
    console.log(this.props)
    return (
      <div>
        {
          show &&
          <div>gfdgdf</div>
        }
        {
          isIframe &&
          <iframe width="100%" height="500px" src="./static/demo.html"></iframe>
        }
      </div>
    )
  }
}
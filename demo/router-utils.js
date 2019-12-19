import React, { Component } from 'react'

export function structureComponent(load, props) {
  const Component = AsyncComponent(load)
  return <Component {...props} />
}

export function wrapper(load, props) {
  let Child = null
  let Wrapped = () => (
    <Child />
  )
  console.log('----------------------')
  return async () => {
    Child = await load()
    console.log(Child.default)
    console.log('======================')
    return Wrapped
  }
}

export const AsyncComponent = (load) => {
  return class AsyncComponent extends Component {

    constructor() {
      super()
      this.state = {
        Child: null,
      }
    }

    unmount = false

    componentWillUnmount() {
      this.unmount = true
    }

    async componentDidMount() {
      const { default: Child } = await load()
      if (this.unmount) return
      if (Child) {
        this.setState({
          Child,
        })
      }
    }

    render() {
      const { Child } = this.state
      if (!Child) return <div>加载中</div>
      return <Child {...this.props} />
    }
  }
}
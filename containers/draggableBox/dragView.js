import React, { Component } from 'react'
import sortable from 'sortablejs'

export default class DragView extends Component {

  /**
   * @param {array} data 数据源
   * @param {function | ReactElement} dragItem 拖动的item 可以是方法也可以是jsx
   * @param {obj} dragOptions sortable的选项
   * @param {number} index 用于定位当前操作的序列 后续待优化
   * @param {boolean} drag 是否允许拖拽
   */
  static defaultProps = {
    data: [],
    dragItem: () => { },
    index: 0,
    dragOptions: {
      animation: 150,
      forceFallback: false,
      sort: true,
      onAdd: e => {
        console.log('add', e)
      },
      onRemove: e => {
        console.log('remove', e)
      },
      onUpdate: e => {
        console.log('update', e)
      }
    },
    drag: true,
  }

  constructor(props) {
    super(props)

    this.dragBox = null
  }

  componentDidMount() {
    this.bindDrag()
  }

  componentWillReceiveProps() {
    this.bindDrag()
  }

  componentWillUnmount() {
    this.dragBox = null
  }

  bindDrag = () => {
    const drags = this.refs.drag
    const { dragOptions, drag } = this.props
    if (!drag) return
    this.dragBox = new sortable(drags, dragOptions)
  }

  render() {
    const { data, dragItem, index } = this.props
    let isReactElement = false
    if (typeof dragItem === 'object' && dragItem.$$typeof) {
      isReactElement = true
    }
    return (
      <div className="drag-view" ref="drag" data-index={index}>
        {
          data instanceof Array &&
          data.length > 0 &&
          data.map((item, _index) => isReactElement ? dragItem : dragItem(item, _index))
        }
      </div>
    )
  }
}

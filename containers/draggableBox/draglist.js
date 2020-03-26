import React, { Component } from 'react'
import { Icon, Input, Button, Spin, message, Select, DatePicker, Tooltip } from 'antd'

import DragItem from './dragitem'

import DragView from './dragView.js'

const { Option } = Select
const { RangePicker } = DatePicker

import sortableconfig from './config'
import store from './store'


import './index.less'
import './draglist.less'

export default class DragList extends Component {

  static defaultProps = {
    action: {
      push: null,
      unshift: null,
      deleteFn: null,
    },
    classlist: [], // 任务类型
    updateListItem: () => { },
  }

  constructor(props) {
    super(props)
    const { index, ...item } = props.data
    const { updateListItem } = props
    this.state = {
      data: item,
      index,
      add: false,
      more: false,
      key: Date.now(),
      filter: props.filter,
      spinShow: false,

      loading: false,
      reload: false,
    }

    this.numPerPage = 10
    this.currentPage = 0
    this.entityid = 114

    this.addInput = null
    this.selectValue = null
    this.title = null
    this.timeRange = null
    // 拖拽配置
    /**
     * 排序操作暂时禁用
     * 需考虑数据返回，比如拖拽失败的情况
     */
    this.dragOptions = {
      ...sortableconfig,
      group: 'drag-list',
      ghostClass: 'moving',
      revertClone: true,
      onAdd: e => {
        let _data = JSON.parse(JSON.stringify(store.data))
        let fromindex = e.from.dataset.index
        let toindex = e.to.dataset.index
        let oldindex = e.oldIndex
        let newindex = e.newIndex
        let from = _data[fromindex]
        let to = _data[toindex]
        if (
          to.children instanceof Array &&
          from.children instanceof Array
        ) {
        }
        if (newindex > 0 && newindex < to.children.length) {
          to.children = to.children.slice(0, newindex).concat(from.children[oldindex], to.children.slice(newindex))
        }
        newindex === 0 && to.children[newindex] && to.children.unshift(from.children[oldindex])
        newindex >= to.children.length && to.children.push(from.children[oldindex])
        from.children.splice(oldindex, 1)
        updateListItem({
          taskid: to.children[newindex].iid,
          labelid: to.iid,
        })
        store.data = _data
        this.sync(to)
      },
      onRemove: e => {
        let _data = JSON.parse(JSON.stringify(store.data))
        let fromindex = e.from.dataset.index
        let from = _data[fromindex]
        this.sync(from)
      },
    }
  }

  add = (add = true) => {
    this.addInput = ''
    this.setState({
      add,
    })
  }

  alertMsg = (description, message = '提示') => {
    // message({
    //   message,
    //   description,
    //   type: "info",
    //   closeText: "关闭",
    //   showIcon: true
    // }, 5)
    return ''
  }

  onClick = () => {
    if (!this.addInput) {
      this.alertMsg('请输入任务标题')
      return
    }
    const { roleid12 = [] } = this.props.excessData
    if (!roleid12[0]) {
      this.alertMsg('请选择负责人')
      return
    }
    if (!this.timeRange) {
      this.alertMsg('请选择起止时间')
      return
    }
    if (!this.selectValue) {
      this.alertMsg('请选择任务类型')
      return
    }
    let { data } = this.state
    const { addListItem } = this.props
    this.setState({
      spinShow: true,
    })
    const dstartdate = this.timeRange[0]
    const denddate = this.timeRange[1]
    addListItem({
      ...data,
      sname: this.addInput,
      iclassid: this.selectValue,
      roleid12: roleid12[0].iid,
      dstartdate,
      denddate,
    })
      .then(_ => {
        this.addInput = null
        this.selectValue = null
        this.timeRange = null
        this.getChildren()
        this.add(false)
      })
      .catch(_ => {
        this.setState({
          spinShow: false,
        })
      })
  }

  actionMore = () => {
    console.log('actionMore')
    const { editTitleAuth, deleteListAuth, newListAuth } = this.props
    if (!editTitleAuth && !deleteListAuth && !newListAuth) {
      this.alertMsg('无操作权限')
      return
    }
    this.setState({
      more: !this.state.more,
    })
  }

  // 列表动作
  actionCollection = (data) => {
    const { push, unshift, deleteFn, batch, edit } = this.props.action
    const { index } = this.state
    const { type } = data
    this.actionMore()
    if (type === 'push') {
      push && push({ index, ...this.state.data })
      return
    }
    if (type === 'unshift') {
      unshift && unshift({ index, ...this.state.data })
      return
    }
    if (type === 'delete') {
      deleteFn && deleteFn({ index, ...this.state.data, type })
      return
    }
    if (type === 'checked') {
      batch && batch(index)
      return
    }
    if (type === 'edit') {
      edit && edit({ index, ...this.state.data })
      return
    }
  }

  componentDidMount() {
    this.getChildren()
  }

  componentWillUnmount() {
    this.setState = () => { }
  }

  componentWillReceiveProps(nextProps) {
    // 在同标题下不主动请求,这个需要优化，在创建新的任务后
    // console.log('列表的props变化-------------------------------------------')
    if (nextProps.keys !== this.props.keys) {
      this.getChildren()
    }
  }

  getChildren = (page = 0) => {
    const { data, index } = this.state
    const { getListChildren } = this.props
    if (!getListChildren) {
      console.warn('请传入获取子集的方法：getListChildren')
      return
    }
    let currentPage = page
    this.setState({
      spinShow: true,
    })
    currentPage += 1
    getListChildren({ currentPage, ...data })
      .then((res) => {
        const dataList = res.data.resultList
        data.children = dataList
        store.data[index] = data
        this.setState({
          data,
          key: Date.now(),
          loading: false,
          spinShow: false,
          reload: false,
        }, this.getTitleMaxWidth)
      })
      .catch(res => {
        this.setState({
          loading: false,
          spinShow: false,
          reload: true,
        }, this.getTitleMaxWidth)
      })
  }

  bindScroll = () => {
    const view = this.refs.dragScroll
    view.addEventListener('scroll', () => {
      if (this.state.loading) return
      // console.log('滚动', view.scrollHeight, view.offsetHeight, view.scrollTop)
      if ((view.scrollHeight - view.scrollTop) <= view.offsetHeight) {
        this.state.loading = true
        this.getChildren(this.currentPage, 'push')
      }
    })
  }

  // 去同步bom和dom
  sync = (data) => {
    this.setState({ data, key: Date.now() })
  }

  getTitleMaxWidth = () => {
    const { titleView, title, iconView } = this.refs
    let maxWidth = titleView.clientWidth - iconView.clientWidth
    title.style.maxWidth = maxWidth + 'px'
  }

  render() {
    const { data, add, more, key, spinShow, reload } = this.state
    const { children, sname: title } = data
    const {
      itemClick,
      index,
      classlist,
      dragAuth = true,
      newListAuth = true,
      addItemAuth = true,
      deleteListAuth = true,
      editTitleAuth = true,
    } = this.props

    const { roleid12 = [] } = this.props.excessData
    // console.log(more, 'more')
    return (
      <div className="drag-list" key={key} ref="dragScroll">
        <Spin spinning={spinShow} className="spin" />
        <div className="drag-list-title" ref="titleView">
          <Tooltip title={title}>
            <p className="float-left" ref="title">{title}</p>
          </Tooltip >
          <div className="icon-view float-right" ref="iconView">
            {
              addItemAuth ?
                add ?
                  <Icon type="cross" className="icons" onClick={() => this.add(false)} />
                  :
                  <Icon type="plus" className="icons" onClick={this.add} />
                :
                null
            }
            <Icon type="bars" className="icons" onClick={this.actionMore} />
          </div>
        </div>
        {
          add && (
            <div className="drag-item-add">
              <Input onChange={e => this.addInput = e.target.value} placeholder="任务标题" />
              <Input
                className="cursor"
                readOnly={true}
                onClick={() => this.props.action.toogleModal('modalVisible')}
                suffix={
                  <span>
                    <Icon type='search' style={{ marginTop: 7 }} />
                  </span>
                }
                value={roleid12[0] ? roleid12[0].sname : ''}
                placeholder="请选择负责人"
              />
              <RangePicker style={{ width: 184 }} onChange={(value, dateString) => this.timeRange = dateString} />
              <Select
                onChange={e => this.selectValue = e}
                className="list-select"
                placeholder="任务类型"
              >
                {
                  classlist.map(item => <Option value={item.iid} key={item.iid}>{item.sname}</Option>)
                }
              </Select>
              <div style={{ overflow: 'hidden' }}>
                <Button type="primary" onClick={this.onClick}>添加</Button>
              </div>
            </div>
          )
        }

        {
          reload &&
          <div className="reload">
            <Button type="primary">重新加载</Button>
          </div>
        }

        <div className={`drag-list-content ${index}`} ref="drag" data-index={index}>
          <DragView
            data={children}
            index={index}
            dragItem={(item, _index) => <DragItem data={item} key={_index} page={this} itemClick={itemClick} />}
            // dragItem={(item, _index) => <div>111</div>}
            dragOptions={this.dragOptions}
            drag={dragAuth}
          />
        </div>

        {
          more && (
            <div className="drag-item-more">
              <div className="more-view">
                {/* <div className="item" onClick={() => this.actionCollection({ type: 'unshift' })}>在此列前添加新列表</div> */}
                {newListAuth && <div className="item" onClick={() => this.actionCollection({ type: 'push' })}>在此列后添加新列表</div>}
                {/* <div className="item" onClick={() => this.actionCollection({ type: 'checked' })}>批量操作</div> */}
                {
                  editTitleAuth && <div className="item" onClick={() => this.actionCollection({ type: 'edit' })}>编辑标题</div>
                }
                {
                  deleteListAuth && <div className="item" onClick={() => this.actionCollection({ type: 'delete' })}>删除本列</div>
                }
              </div>
            </div>
          )
        }

      </div>
    )
  }
}

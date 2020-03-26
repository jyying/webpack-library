import React, { Component } from 'react'
import { Modal, Input } from 'antd'
// import { RightBox } from "vpbusiness"

import DragList from './draglist'
// 所有的状态数据
import store from './store'

// import DynamicTabs from '../dynamicTabs/dynamictabs'
// import ChooseEntity from '../../../vfm/dynamic/ChooseEntity/ChooseEntity.jsx'

import './dragbox.less'

export default class Dragbox extends Component {

  static defaultProps = {
    data: [],
    filter: {
      filtervalue: '0',
      currentkey: 'filter',
      openKeys: ['filter'],
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      showBox: false,
      itemData: {},
      visible: false,
      title: '新建',

      selectList: [],
      selectLoading: true,

      classList: [],

      // 负责人
      modalVisible: false,
      excessData: {},
    }

    this.isRender = false // 是否重新执行render函数 暂时去除，在优化性能时考虑
    this.addInput = null // 输入的标题的数据
    this.addData = null // 保存添加操作的数据
  }

  componentDidMount() {
    this.getList()
  }

  componentWillUnmount() {
    this.setState = () => { }
  }

  getList = () => {
    const { getList } = this.props
    if (!getList) {
      console.warn('请传入getList请求列表数据')
      return
    }
    if (typeof getList !== 'function') {
      console.warn('getList需是一个方法')
      return
    }
    const _getList = getList()
    if (typeof _getList.then !== 'function') {
      console.warn('getList需返回Promise实例')
      return
    }
    _getList.then(res => {
      const { data } = res
      // data.unshift({
      //   sname: '未分组',
      //   type: 'push',
      //   initial: true,
      // })
      this.setState({
        data,
      })
      store.data = data
    })
  }

  componentWillReceiveProps() {
    this.getList()
  }

  push = (data) => {
    console.log('push')
    this.addData = { type: 'push', ...data }
    this.toogleModal()
  }

  unshift = (data) => {
    console.log('unshift')
    this.addData = { type: 'unshift', ...data }
    this.toogleModal()
  }

  edit = (data) => {
    this.addData = { type: 'edit', ...data }
    this.addInput = data.sname
    console.log('edit', this.addData)
    this.toogleModal({ title: '编辑' })
  }

  addList = () => {
    const labelname = this.addInput
    const { data } = this.state
    let { index, type } = this.addData
    const { toogleDragList } = this.props
    const isEdit = type === 'edit'

    if (type === 'push') {
      index += 1
    }

    toogleDragList({ ...this.addData, labelname })
      .then(res => {
        if (res.status === 200 && res.data) {
          this.addInput = null

          if (isEdit) {
            data[index].sname = labelname
          } else {
            data.splice(index, 0, {
              iid: res.data.iid,
              sname: labelname,
            })
          }
          store.data = data
          this.setState({
            data,
            visible: false,
          })
        }
      })
  }

  delete = (param) => {
    const { data } = this.state
    const { index = 0, iid: labelid } = param
    const { toogleDragList } = this.props
    toogleDragList(param, 'deletelabel')
      .then(res => {
        if (res.status === 200 && res.data.success) {
          data.splice(index, 1)
          this.setState({
            data,
          })
        } else {
          this.alertMsg({
            message: '错误',
            description: res.data.msg,
          })
        }
      })
  }

  toogleModal = (data = { title: '新建' }, visible = !this.state.visible) => {
    this.setState({
      visible,
      ...data,
    })
  }

  _toogleModal = (modal, data) => {
    if (!modal) {
      console.warn('请传入要改变的值')
      return
    }
    this.setState({
      [modal]: !this.state[modal],
      ...data,
    })
  }

  alertMsg = (data) => {
    console.log(data)
    // AlertMsg({
    //   description: '',
    //   message: '提示',
    //   type: "info",
    //   closeText: "关闭",
    //   showIcon: true,
    //   ...data,
    // }, 5)
  }

  batch = (index) => {
    console.log('批量', index)
  }

  itemClick = (itemData) => {
    this.setState({
      showBox: true,
      itemData,
      data: store.data,
    })
  }

  render() {
    const {
      data, showBox, itemData, visible, title,
      modalVisible, excessData,
    } = this.state
    const { filtervalue } = this.props.filter
    const {
      classlist,
      getListChildren,
      _getListChildren,
      addListItem,
      updateListItem,
      createList,

      //
      entityrole: addItemAuth,
    } = this.props
    const number = data.length || 1
    return (
      <div className="drag-box-view" key={filtervalue}>

        <Modal
          visible={visible}
          title={title}
          onCancel={() => this.toogleModal()}
          onOk={this.addList}
          className="drag-box-modal"
        >

          {
            createList ?
              createList(this)
              :
              <Input
                label="任务列表名称"
                placeholder="请输入任务名称"
                onChange={e => this.addInput = e.target.value}
                key={Date.now()}
                labelCol={{ span: 6 }}
                defaultValue={this.addInput}
                wrapperCol={{ span: 18 }}
              />
          }
        </Modal>

        {/* <RightBox
          show={showBox}
          max={false}
          onClose={() => this.setState({ showBox: false })}
        >
          {
            showBox &&
            <DynamicTabs
              param={{
                entityid: itemData.ientityid,
                iid: itemData.iid,
                type: false,
                viewtype: 'edit',
                defaultActiveKey: ''
              }}
              setBreadCrumb={() => { }}
              closeRightModal={() => this.setState({ showBox: false })}
              refreshList={() => itemData.page.getChildren()}
            />
          }
        </RightBox> */}

        <div className="drag-box" ref="drag" style={{ width: number * 265 }}>
          {
            data.map((item, index) =>
              item.initial ?
                (
                  <DragList
                    key={`${index}-${item.sname}`}
                    index={index}
                    data={{ index, ...item }}
                    itemClick={this.itemClick}
                    classlist={classlist}
                    newListAuth={this.props.entityrole}
                    addItemAuth={false}
                    deleteListAuth={false}
                    editTitleAuth={false}
                    dragAuth={this.props.entityrole}
                    getListChildren={_getListChildren}
                    updateListItem={updateListItem}
                    excessData={excessData}
                    action={{
                      push: this.push,
                    }}
                  />
                ) :
                (
                  <DragList
                    key={`${index}-${item.sname}`}
                    index={index}
                    data={{ index, ...item }}
                    itemClick={this.itemClick}
                    filter={this.props.filter}
                    classlist={classlist}
                    newListAuth={this.props.entityrole}
                    addItemAuth={this.props.entityrole}
                    deleteListAuth={this.props.entityrole}
                    editTitleAuth={this.props.entityrole}
                    dragAuth={this.props.entityrole}
                    getListChildren={getListChildren}
                    addListItem={addListItem}
                    updateListItem={updateListItem}
                    action={{
                      push: this.push,
                      deleteFn: this.delete,
                      unshift: this.unshift,
                      batch: this.batch,
                      edit: this.edit,
                      toogleModal: this._toogleModal,
                    }}
                    excessData={excessData}
                  />
                ))
          }
        </div>

        {/* {
          modalVisible &&
          <Modal
            title="负责人"
            visible={modalVisible}
            onOk={() => this._toogleModal('modalVisible')}
            onCancel={() => this._toogleModal('modalVisible')}
            width="80%"
            height="80%"
            footer={null}
          >
            <ChooseEntity
              item={{
                widget_type: "selectmodel",
                irelationentityid: 2
              }}
              params={{
                currentclassid: "48",
                viewcode: "form",
              }}
              visible={modalVisible}
              onOk={roleid12 => this._toogleModal('modalVisible', { excessData: { roleid12 } })}
              onCancel={() => this._toogleModal('modalVisible')}
              initValue={[]}
            />
          </Modal>
        } */}
      </div>
    )
  }
}

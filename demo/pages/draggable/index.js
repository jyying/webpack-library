import React, { Component } from 'react'

import DragBox from 'containers/draggableBox'

import { _getDragList, _getListChildren } from 'containers/draggableBox/data'

export default class Dragable extends Component {

  constructor(props) {
    super(props)

    console.log(props)
  }

  getDragList = () => {
    // const { skey: entityid } = this.state
    return _getDragList()
  }

  toogleList = (data, url = 'savelabel') => {
    const { iid: iprojectid } = this.props
    let params = { iprojectid, entityid: 114 }
    const { iid: labelid, type, labelname } = data
    if (type === 'push') {
      if (!labelname) {
        this.alertMsg({
          description: '请填写标题',
        }, 5)
        return new Promise((resolve, reject) => {
          resolve({})
        })
      }
      params = { ...params, labeliflag: 0, labelname }
    } else if (type === 'edit') {
      if (!labelname) {
        this.alertMsg({
          description: '请填写标题',
        }, 5)
        return new Promise((resolve, reject) => {
          resolve({})
        })
      }
      params = { ...params, labelid, labeliflag: 0, labelname }
    } else if (type === 'delete') {
      params = { ...params, labelid }
    }
    return vpAdd(`/{vpplat}/vfrm/tasks/board/${url}`, {
      param: JSON.stringify(params)
    })
  }

  // 获取list下的子集
  getListChildren = (data) => {
    // const { currentPage, iid: ilabelid } = data
    // const { iid } = this.props
    // const { stabparam } = this.state
    console.log(data)
    /**
     * @param {number} entityid 固定值 任务实体id
     * @param {number} ientityid 固定值 实体id
     */
    // return vpAdd('/{vpplat}/vfrm/entity/dynamicListData', {
    //   currentPage,
    //   pageSize: this.numPerPage,
    //   quickSearch: '',
    //   irelationid: '',
    //   entityid: this.entityid,
    //   ientityid: 7,
    //   iid,
    //   isTab: true,
    //   skey: 'entity114_attr',
    //   stabparam,
    //   datafilter: 'auth',
    //   viewtype: 'board',
    //   ilabelid,
    // })
    return _getListChildren()
  }

  // 添加列表的子集
  addListItem = (data) => {
    const { iid: iprojectid, iid } = this.props
    const { iid: ilabelid, sname, iclassid } = data
    console.log(data, '----------------------------')
    let formdata = {
      sparam: JSON.stringify({
        scode: '',
        iprojectid,
        iassignto: '1',
        roleid12: '1',
        ilabelid,
        sname,
        iclassid
      }),
      entityid: this.entityid,
      variid: 0,
      viewcode: 'form'
    }
    return vpAdd('/{vpplat}/vfrm/entity/saveFormData', {
      ...formdata
    })
  }

  updateListItem = (data) => {
    const { iid: iprojectid } = this.props
    return vpAdd('/{vpplat}/vfrm/tasks/board/updatetasklabelid', {
      param: JSON.stringify({
        ...data,
        iprojectid,
        entityid: 114,
      })
    })
  }

  render() {
    const classlist = []
    return (
      <DragBox
        getList={this.getDragList}
        getListChildren={this.getListChildren}
      // classlist={classlist}
      // toogleDragList={this.toogleList}
      // addListItem={this.addListItem}
      // updateListItem={this.updateListItem}
      />
    )
  }
}
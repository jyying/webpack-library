import React, { Component } from 'react'
import Gantt from 'frappe-gantt'
// import Gantt from '../../../library/index.js'
// import '../../../library/index.css'

import './index.less'

import data from './data.js'

export default class GanttDemo extends Component {

  constructor() {
    super()
    this.ganttOptions = {
      header_height: 50,
      column_width: 30,
      view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
      bar_height: 20,
      bar_corner_radius: 0,
      view_mode: 'Month',
      date_format: 'YYYY-MM-DD',
      language: 'en',
      title_width: 200,
      arrow_stroke: 'red',
      on_click: task => {
        console.log(task, '----------------------')
      },
      on_fold: (task, parent) => {
        // console.log('----------------折叠', task, parent)
        this.foldGantt(task)
      },
    }
    this.ganttData = []
  }

  componentDidMount() {
    var tasks = [
      {
        id: 'Task-1',
        name: 'Redesign website',
        start: '2016-11-1',
        end: '2016-12-19',
        progress: 100,
        type: 'fold',
      },
    ]
    const array = this.structureData(data)
    this.ganttData = array
    new Gantt("#gantt", array, this.ganttOptions)
  }

  getTaskStatus = (data) => {
    const taskIndiclass = ['success', 'warning', 'danger']
    const { lights } = data
    let scheduleflag = (lights && lights.scheduleflag == 1) ? 0 : 1
    let statusflag = (lights && lights.statusflag == 1) ? 1 : 0
    let className = taskIndiclass[scheduleflag]
    statusflag == 1 && (className = 'completed')
    return className
  }

  sortData = (data) => {
    console.log(data)
    const datas = JSON.parse(JSON.stringify(data))
    return this.getsubArray(datas)
  }

  modifyArray = (datas, addArray, pre = true) => {
    const data = JSON.parse(JSON.stringify(datas))
    let INDEX = 0
    const Number = pre ? 1 : 0
    addArray.map(item => {
      let { index, array } = item
      data.splice(index + Number + INDEX, 0, ...array)
      INDEX += array.length
    })
    return data
  }

  getsubArray = (datas) => {
    datas.map((item, index) => {
      if (item.children instanceof Array && !item.children.length) return
      const subArray = []
      item.children.map((_item, _index) => {
        _item.iid = _item.id
        _item.id = `parent-${_item.id}-${index}`
        let hasSubTask = false
        if (_item.subtasklist instanceof Array && _item.subtasklist.length) {
          let time
          hasSubTask = true
          _item.subtasklist.map(s => {
            const id = _item.id
            time = s.time.split('/')
            s.start = time[0]
            s.end = time[1]
            s.name = s.sname
            s.PARENTID = id
            s.dependencies = [id]
            s.iid = s.id
            s.hiddenArrow = true
            s.type = 'sub'
          })
          subArray.push({
            index: _index,
            array: _item.subtasklist,
          })
        }
        hasSubTask && (_item.type = 'fold')
      })
      item.children = this.modifyArray(item.children, subArray)
    })
    return this.getPreArray(datas)
  }

  getPreArray = (data) => {
    const datas = JSON.parse(JSON.stringify(data))
    datas.map(item => {
      if (item.children instanceof Array && !item.children.length) return
      const preArray = []
      item.children.map((_item, _index) => {
        if (_item.qzrwgroup) {
          _item.dependencies = []
          _item.qzrwgroup.map(s => {
            const id = `parent-${s.id}`
            _item.dependencies.push(id)
            s.iid = s.id
            s.id = id
            s.type = 'pre'
          })

          preArray.push({
            index: _index,
            array: _item.qzrwgroup,
          })
        }
      })
      item.children = this.modifyArray(item.children, preArray, false)
    })

    console.log(datas, '--------------------')
    return datas
  }

  getIsRepeat = (data, compare) => {
    console.log(data, compare, '=============================')
    if (data instanceof Array && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i] === compare) {
          return true
        }
      }
    }
    return false
  }

  structureData = (data) => {
    const array = []
    const _this = this
    const qzrwgroup = []
    data.map(item => {
      item.children instanceof Array ?
        item.children.length > 0 && (function () {
          item.type = 'fold'
          let start = null, end = null, itemArray = [], id = `parent-${item.id}`
          item.children.map(_item => {
            if (_item.start && _item.end) {
              if (_item.qzrwgroup instanceof Array && _item.qzrwgroup.length > 0) {
                _item.qzrwgroup.map(pre => pre.subid = _item.id)
                qzrwgroup.push(..._item.qzrwgroup)
              }
              let className = _this.getTaskStatus(_item)
              start ? new Date(start).getTime() > new Date(_item.start).getTime() && (start = _item.start) : (start = _item.start)
              end ? new Date(end).getTime() < new Date(_item.end).getTime() && (end = _item.end) : (end = _item.end)
              itemArray.unshift({ ..._item, iid: _item.id, id: `other-${_item.id}`, progress: 100, className })
            }
          })
          itemArray.unshift({ ...item, id, start, end, progress: 100, className: 'fold' })
          array.push(...itemArray)
        })()
        :
        array.push({ ...item, className: 'fold' })
    })

    this.ganttData = array

    return this.getPreContact(array, qzrwgroup)
  }

  getPreContact = (datas, preArray) => {
    let data = JSON.parse(JSON.stringify(datas))
    preArray.map(item => {
      data.map(_item => {
        _item && _item.iid === item.id && (_item.dependencies = [`other-${item.subid}`])
      })
    })
    return data
  }

  foldGantt = (task) => {
    // 折叠
    let { id, isFold = false } = task
    let array = []
    array = this.ganttData.map(item => {
      if (item.PARENTID === id) {
        item.hidden = !isFold
        if (item.subtasklist) {
          this.ganttData.map(_item => {
            if (_item.PARENTID === item.id) {
              if (!isFold) {
                _item.hidden = true
              } else {
                !item.isFold && (_item.hidden = false)
              }
            }
          })
        }
      }
      return item
    })
    task.isFold = !task.isFold
    new Gantt("#gantt", array, this.ganttOptions)
  }

  render() {
    return (
      <div className="view">
        <div id="gantt">
        </div>
      </div>
    )
  }
}
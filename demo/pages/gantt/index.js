import React, { Component } from 'react'
import Gantt from 'frappe-gantt'

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
      view_mode: 'Day', // Month Day Year
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
    const array = this.structureData(this.getsubArray(data))
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

  getsubArray = (datas) => {
    datas.map(item => {
      if (item.children instanceof Array && !item.children.length) return
      const subArray = []
      item.children.map((_item, _index) => {
        if (_item.subtasklist instanceof Array && _item.subtasklist.length) {
          let time
          _item.subtasklist.map(s => {
            time = s.time.split('/')
            s.start = time[0]
            s.end = time[1]
            s.name = s.sname
          })
          subArray.push({
            index: _index,
            array: _item.subtasklist,
          })
        }
      })
      item.children = this.modifyArray(item.children, subArray)
    })
    return datas
  }

  structureData = (datas) => {
    const data = JSON.parse(JSON.stringify(datas))
    let array = []
    const _this = this
    const qzrwgroup = []
    const subgroup = []
    data.map(item => {
      item.children instanceof Array ?
        item.children.length > 0 && (function () {
          item.type = 'fold'
          let start = null, end = null, itemArray = [], id = `parent-${item.id}`
          item.children.map(_item => {
            if (_item.start && _item.end) {
              const { swcbfb = Math.floor(Math.random() * 100) } = _item
              if (_item.qzrwgroup instanceof Array && _item.qzrwgroup.length > 0) {
                _item.qzrwgroup.map(pre => pre.subid = _item.id)
                qzrwgroup.push(..._item.qzrwgroup)
              }
              if (_item.subtasklist instanceof Array && _item.subtasklist.length > 0) {
                _item.subtasklist.map(pre => pre.subid = _item.id)
                subgroup.push(..._item.subtasklist)
              }
              _item.title_name = _item.name
              _item.name = `${_item.title_name} ${swcbfb}%`
              let className = _this.getTaskStatus(_item)
              start ? new Date(start).getTime() > new Date(_item.start).getTime() && (start = _item.start) : (start = _item.start)
              end ? new Date(end).getTime() < new Date(_item.end).getTime() && (end = _item.end) : (end = _item.end)
              itemArray.push({ ..._item, iid: _item.id, id: `other-${_item.id}`, progress: 100, className, PARENTID: item.id })
            }
          })

          itemArray.unshift({ ...item, id, iid: item.id, start, end, progress: 100, className: 'fold' })
          array.push(...itemArray)

        })()
        :
        array.push({ ...item, className: 'fold', iid: item.id })
    })
    array = this.getSubContact(this.getPreContact(array, qzrwgroup), subgroup)
    this.ganttData = array
    return array
  }

  getSubContact = (datas, subArray) => {
    let data = JSON.parse(JSON.stringify(datas))
    const prentArray = []
    subArray.map(item => {
      data.map(_item => {
        if (_item && _item.iid === item.id) {
          _item.dependencies = [`other-${item.subid}`]
          _item.hiddenArrow = true
          _item.type = 'sub'
          _item.PARENTID = item.subid
          prentArray.push(item.subid)
        }
      })
    })
    prentArray.map(item => {
      data.map(_item => _item.iid === item && (_item.type = 'fold'))
    })
    return data
  }

  getPreContact = (datas, preArray) => {
    let data = JSON.parse(JSON.stringify(datas))
    preArray.map(item => {
      data.map(_item => {
        if (_item && _item.iid === item.subid) {
          if (!(_item.dependencies instanceof Array)) {
            _item.dependencies = [`other-${item.id}`]
          } else {
            _item.dependencies.push(`other-${item.id}`)
          }
        }
      })
    })
    return data
  }

  foldGantt = (task) => {
    // 折叠
    let { id, iid, isFold = false } = task
    let array = []
    array = this.ganttData.map(item => {
      if (item.PARENTID === iid) {
        item.hidden = !isFold
        if (item.subtasklist instanceof Array && item.subtasklist.length) {
          this.ganttData.map(_item => {
            if (_item.PARENTID === item.iid) {
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
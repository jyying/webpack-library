import React, { Component } from 'react'
import Gantt from 'frappe-gantt'
// import 'frappe-gantt/dist/frappe-gantt.css'

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
      view_mode: 'Day',
      date_format: 'YYYY-MM-DD',
      language: 'en',
      title_width: 200,
      arrow_stroke: 'red',
      on_click: task => {
        console.log(task)
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
    const array = this.structureData(this.sortData(data))
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
    datas.map((item, index) => {
      const array = []
      const subArray = []
      item.children.map(_item => {
        _item.iid = _item.id
        _item.id = `parent-${_item.id}-${index}`
        let hasSubTask = false
        if (_item.qzrwgroup) {
          _item.dependencies = []
          _item.qzrwgroup.map(s => {
            const id = `parent-${s.id}-${index}`
            _item.dependencies.push(id)
            s.iid = s.id
            s.id = id
          })
          array.push(..._item.qzrwgroup)
        }

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
          })
          subArray.push(..._item.subtasklist)
        }
        hasSubTask && (_item.type = 'fold')
      })

      item.children.unshift(...array)
      item.children.push(...subArray)
    })
    return datas
  }

  structureData = (data) => {
    const array = []
    const _this = this
    data.map(item => {
      item.children instanceof Array ?
        item.children.length > 0 && (function () {
          item.type = 'fold'
          let start = null, end = null, itemArray = [], id = `parent-${item.id}`
          item.children.map(_item => {
            // 已有的不覆盖
            !_item.PARENTID && (_item.PARENTID = id)
            if (_item.start && _item.end) {
              const { dependencies } = _item
              let className = _this.getTaskStatus(_item)
              start ? new Date(start).getTime() > new Date(_item.start).getTime() && (start = _item.start) : (start = _item.start)
              end ? new Date(end).getTime() < new Date(_item.end).getTime() && (end = _item.end) : (end = _item.end)
              itemArray.push({ ..._item, dependencies, progress: 100, className })
            }
          })
          itemArray.unshift({ ...item, id, start, end, progress: 100, className: 'fold' })
          array.push(...itemArray)
        })()
        :
        array.push({ ...item, className: 'fold' })
    })

    this.ganttData = array
    return array
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
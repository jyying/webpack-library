import React, { Component } from 'react'
import Gantt from 'frappe-gantt'
import 'frappe-gantt/dist/frappe-gantt.css'

import './index.less'


const data = [
  {
    id: 'parent-31',
    name: '默认列表1',
    children: [
      {
        id: 'mr-1',
        name: '默认任务1',
        start: '2016-12-1',
        end: '2016-12-19',
        progress: 100,
      }, {
        id: 'mr-2',
        name: '默认任务2',
        start: '2016-12-2',
        end: '2016-12-10',
        progress: 100,
      }
    ],
  }, {
    id: 'xz',
    name: '新增列表',
    children: [
      {
        id: 'xz-1',
        name: '新增任务1',
        start: '2016-10-1',
        end: '2016-10-20',
        progress: 100,
      }, {
        id: 'xz-2',
        name: '新增任务2',
        start: '2016-11-2 16:25:55',
        end: '2016-11-10',
        progress: 100,
      }, {
        id: 'xz-3',
        name: '新增任务3',
        start: '2016-11-1',
        end: '2016-11-11',
        progress: 100,
        hidden: true,
      }
    ],
  }, {
    id: 'none',
    name: '6测试无',
    children: [],
  }
]

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
    const array = []
    // array.push(...tasks)
    // const number = 20
    // for (let i = 1; i < number; i++) {
    //   array.push({
    //     id: `Task${i}`,
    //     name: `Redesign website${i}`,
    //     start: `2016-11-${i}`,
    //     end: `2016-12-${i}`,
    //     progress: 100,
    //     // dependencies: `Task${i - 1}`,
    //     dependencies: ['Task-1']
    //   })
    // }

    // new Gantt("#gantt", array, this.ganttOptions)

    // this.ganttData = array

    data.map(item => {
      item.children instanceof Array &&
        item.children.length > 0 && (function () {
          item.type = 'fold'
          let start = null, end = null, itemArray = []

          item.children.map(_item => {
            start ? new Date(start).getTime() > new Date(_item.start).getTime() && (start = _item.start) : (start = _item.start)
            end ? new Date(end).getTime() < new Date(_item.end).getTime() && (end = _item.end) : (end = _item.end)
            // array.push({ ..._item, dependencies: [item.id] })
            itemArray.push({ ..._item, dependencies: [item.id] })
          })
          delete item.children
          itemArray.unshift({ ...item, start, end, progress: 100 })
          array.push(...itemArray)
        })()
        // :
        // array.push(item)
    })
    console.log(array)
    this.ganttData = array
    new Gantt("#gantt", array, this.ganttOptions)
  }

  foldGantt = (task) => {
    // 折叠
    // console.log(this.ganttData, task)
    let { id, isFold = false } = task
    let array = []
    // isFold ? (array = this.ganttData) : (array = this.ganttData.filter(item => item.dependencies[0] !== id))
    array = this.ganttData.map(item => {
      item.dependencies[0] === id && (item.hidden = !isFold)
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
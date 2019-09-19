import React, { Component } from 'react'
import Gantt from 'frappe-gantt'
import 'frappe-gantt/dist/frappe-gantt.css'

import './index.less'

export default class GanttDemo extends Component {
  componentDidMount() {
    var tasks = [
      {
        id: 'Task 1',
        name: 'Redesign website',
        start: '2016-11-1',
        end: '2016-12-30',
        progress: 100,
      },
    ]
    const array = []
    const number = 20
    for (let i = 0; i < number; i++) {
      array.push({
        id: `Task${i}`,
        name: `Redesign website${i}`,
        start: `2016-11-${i}`,
        end: `2016-12-${i}`,
        progress: 100,
      })
    }
    var gantt = new Gantt("#gantt", array, {
      header_height: 50,
      column_width: 30,
      view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
      bar_height: 20,
      bar_corner_radius: 0,
      view_mode: 'Month',
      date_format: 'YYYY-MM-DD',
      language: 'en',
      title_width: 200,
      on_click: task => {
        console.log(task)
      },
    })
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
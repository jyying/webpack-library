import React from 'react'
import ReactDom from 'react-dom'

import GanttDemo from '../demo/gantt'
import HtmlDemo from '../demo/html/index.js'
window.HtmlDemo = HtmlDemo
window.ReactDom = ReactDom
ReactDom.render(
  <GanttDemo />,
  document.getElementById('root')
)
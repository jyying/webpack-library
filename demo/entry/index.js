import React from 'react'
import ReactDom from 'react-dom'

import GanttDemo from '../pages/gantt'
import HtmlDemo from '../pages/html'
ReactDom.render(
  <GanttDemo />,
  document.getElementById('root'),
  function () {
    console.log('渲染完成')
  }
)
import React from 'react'
import ReactDom from 'react-dom'

import GanttDemo from '../demo/gantt'
import HtmlDemo from '../demo/html'
// window.HtmlDemo = HtmlDemo
// window.ReactDom = ReactDom
ReactDom.render(
  <GanttDemo />,
  document.getElementById('root'),
  function () {
    console.log('渲染完成')
  }
)
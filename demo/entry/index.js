import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import React from 'react'
import ReactDom from 'react-dom'

import GanttDemo from '../pages/gantt'
// import HtmlDemo from '../pages/html'
// import StyleHash from '../pages/stylehash'
ReactDom.render(
  <GanttDemo />,
  document.getElementById('root')
)

// ReactDom.render( 
//   <div>434</div>,
//   document.getElementById('root')
// )
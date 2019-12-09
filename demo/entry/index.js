import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import React from 'react'
import ReactDom from 'react-dom'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import GanttDemo from '../pages/gantt'
import HtmlDemo from '../pages/html'
import StyleHash from '../pages/stylehash'
ReactDom.render(
  <Router>
    <HtmlDemo>
      <Route path="/style" component={StyleHash} />
      <Route path="/gantt" component={GanttDemo} />
    </HtmlDemo>
  </Router>
  ,
  document.getElementById('root')
)

// ReactDom.render( 
//   <div>434</div>,
//   document.getElementById('root')
// )
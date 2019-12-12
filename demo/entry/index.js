import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import React from 'react'
import ReactDom from 'react-dom'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import HtmlDemo from '../pages/html'

import router from '../router'

ReactDom.render(
  <Router>
    <HtmlDemo>
      <Switch>
        {
          router.map(item => {
            let component = item.component
            return <Route key={item.path} path={item.path} component={component} />
          })
        }
      </Switch>
    </HtmlDemo>
  </Router>
  ,
  document.getElementById('root')
)

// ReactDom.render( 
//   <div>434</div>,
//   document.getElementById('root')
// )
import { structureComponent } from './router-utils'
export default [
  {
    path: "/style",
    component(props) {
      return structureComponent(() => import('./pages/stylehash'), props)
    },
  },
  {
    path: "/gantt",
    component(props) {
      return structureComponent(() => import('./pages/gantt'), props)
    },
  }
]
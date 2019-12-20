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
  },

  // 测试打印
  {
    path: "/print/print1",
    component(props) {
      return structureComponent(() => import('./pages/print/project/implementPrint.jsx'), props)
    },
  },
  {
    path: "/print/print2",
    component(props) {
      return structureComponent(() => import('./pages/print/planPrint.jsx'), props)
    },
  }
]
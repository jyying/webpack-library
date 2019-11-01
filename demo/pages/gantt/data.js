const data = '[{"children":[],"name":"启动","id":"42"},{"children":[{"statusid":"1000076","start":"2020-03-29 00:00:00","name":"项目结项","statusname":"未开始","end":"2020-04-23 00:00:00","id":"68","subtasklist":[],"qzrwgroup":[{"statusid":"1000076","start":"2020-01-04 00:00:00","name":"验收1","statusname":"未开始","end":"2020-01-31 00:00:00","id":"65"}]},{"statusid":"1000076","start":"2020-01-04 00:00:00","name":"验收1","statusname":"未开始","end":"2020-01-31 00:00:00","id":"65","subtasklist":[{"sname":"验收测试1","roleid12":"管理员","id":"66","time":"2020-01-04/2020-02-01","superman":"管理员","roleid12val":"1","status":"已完成"},{"sname":"验收测试2","roleid12":"管理员","id":"67","time":"2020-03-01/2020-03-31","superman":"管理员","roleid12val":"1","status":"待办"}],"qzrwgroup":[]},{"end": "2020-02-01","id": "66","name": "验收测试1","qzrwgroup": [],"start": "2020-01-04","subtasklist": []},{"statusid":"1000076","start":"2019-12-08 00:00:00","name":"测试任务","statusname":"未开始","end":"2020-01-31 00:00:00","id":"61","subtasklist":[{"sname":"测试子任务1","roleid12":"管理员","id":"62","time":"2019-11-23/2019-11-30","superman":"管理员","roleid12val":"1","status":"待办"},{"sname":"测试子任务2","roleid12":"管理员","id":"63","time":"2019-12-05/2019-12-20","superman":"管理员","roleid12val":"1","status":"已完成"},{"sname":"测试任务3","roleid12":"管理员","id":"64","time":"2019-12-20/2020-01-17","superman":"管理员","roleid12val":"1","status":"已完成"}],"qzrwgroup":[{"statusid":"1000078","start":"2019-10-31 00:00:00","name":"启动项目","statusname":"已完成","end":"2019-11-23 00:00:00","id":"55"},{"statusid":"1000076","start":"2019-11-23 00:00:00","name":"项目设计1","statusname":"未开始","end":"2019-12-08 00:00:00","id":"60"}]},{"statusid":"1000076","start":"2019-11-23 00:00:00","name":"项目设计1","statusname":"未开始","end":"2019-12-08 00:00:00","id":"60","subtasklist":[],"qzrwgroup":[]},{"statusid":"1000078","start":"2019-10-31 00:00:00","name":"启动项目","statusname":"已完成","end":"2019-11-23 00:00:00","id":"55","subtasklist":[],"qzrwgroup":[]}],"name":"测试","id":"43"},{"children":[],"name":"结项","id":"44"}]'
const _data = [
  {
    id: 'parent-31',
    name: '默认列表1',
    className: '',
    children: [
      {
        id: 'mr-1',
        name: '默认任务1',
        start: '2016-12-1',
        end: '2016-12-19',
        progress: 100,
        children: [
          {
            id: 'mr-1-1',
            name: '默认任务1',
            start: '2016-12-1',
            end: '2016-12-19',
            progress: 100,
          }
        ],
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
    className: 'fold',
    children: [
      {
        id: 'xz-1',
        name: '新增任务1',
        start: '2016-10-1',
        end: '2016-10-20',
        className: 'completed',
        progress: 100,
      }, {
        id: 'xz-2',
        name: '新增任务2',
        start: '2016-11-2 16:25:55',
        end: '2016-11-10',
        className: 'delay',
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
  }, {
    id: 'dl-1',
    name: '独立任务1',
    start: '2016-11-1',
    end: '2016-11-11',
    progress: 100,
  }
]

export default JSON.parse(data)
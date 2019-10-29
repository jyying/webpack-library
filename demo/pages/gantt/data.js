const data = '[{"children":[{"statusid":"1000076","start":"2019-10-01 10:49:30","name":"初始3","statusname":"未开始","end":"2019-10-31 10:49:32","id":"38","subtasklist":[],"qzrwgroup":[{"statusid":"224","start":"2019-10-14 00:00:00","name":"子任务1","statusname":"开发未开始","end":"2019-10-14 00:00:00","id":"4"},{"statusid":"126","start":"2019-10-16 00:00:00","name":"子任务","statusname":"需求未开始","end":"2019-10-16 00:00:00","id":"10"},{"statusid":"1000076","start":"","name":"1111","statusname":"未开始","end":"","id":"11"},{"statusid":"1000076","start":"","name":"11231","statusname":"未开始","end":"","id":"12"},{"statusid":"1000076","start":"","name":"3任务任务二","statusname":"未开始","end":"","id":"13"},{"statusid":"1000076","start":"","name":"测试需求分析任务","statusname":"未开始","end":"","id":"14"},{"statusid":"1000076","start":"2019-10-19 00:48:20","name":"需求分析任务","statusname":"未开始","end":"2019-10-22 00:48:25","id":"15"}]}],"name":"444","id":"44"},{"children":[{"statusid":"1000076","start":"2019-10-09 10:49:47","name":"初始4","statusname":"未开始","end":"2019-10-26 10:49:48","id":"39","subtasklist":[{"sname":"4444","roleid12":"管理员","id":"41","time":"2019-10-29/2019-10-29","superman":"管理员","roleid12val":"1","status":"待办"},{"sname":"123","roleid12":"管理员","id":"42","time":"2019-10-01/2019-10-11","superman":"管理员","roleid12val":"1","status":"待办"},{"sname":"456","roleid12":"管理员","id":"43","time":"2019-10-22/2019-10-31","superman":"管理员","roleid12val":"1","status":"待办"}],"qzrwgroup":[{"statusid":"1000076","start":"","name":"11231","statusname":"未开始","end":"","id":"12"},{"statusid":"1000076","start":"","name":"1111","statusname":"未开始","end":"","id":"11"},{"statusid":"126","start":"2019-10-16 00:00:00","name":"子任务","statusname":"需求未开始","end":"2019-10-16 00:00:00","id":"10"},{"statusid":"224","start":"2019-10-14 00:00:00","name":"子任务1","statusname":"开发未开始","end":"2019-10-14 00:00:00","id":"4"}]}],"name":"432432","id":"45"}]'
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
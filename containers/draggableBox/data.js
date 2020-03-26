// 模拟数据


export function _getDragList() {

  return new Promise((s, v) => {
    s({
      timestamp: 1585211442956,
      infocode: "VP000000",
      msg: null,
      redirectUrl: null,
      data: [
        {
          iflag: "0",
          iid: "228",
          iflagdsp: "启用",
          ssequencekey: "228",
          sname: "测试1",
        }, {
          iflag: "1",
          iid: "229",
          iflagdsp: "启用",
          ssequencekey: "229",
          sname: "测试2",
        }
      ],
    })
  })
}


export function _getListChildren() {
  const index = Date.now()
  return new Promise((s, v) => {
    s({
      timestamp: 1585211443072,
      infocode: "VP000000",
      msg: null,
      redirectUrl: null,
      data: {
        numPerPage: 0,
        totalRows: 0,
        totalPages: 0,
        currentPage: 0,
        startIndex: 0,
        lastIndex: 0,
        resultList: [{
          istatusidvpval: "1000076",
          iid: index,
          swcbfb: "",
          istatusname: "未开始",
          pid: index,
          rlinkxtxqvpval: "",
          rlinkywxqvpval: "",
          inamerolename: "管理员",
          iclassidval: "1000060",
          statusid: "1000076",
          denddate: "2020-04-29 00:00:00",
          rlinkxtxq: "",
          key: index,
          dstartdate: "2020-03-27 00:00:00",
          rlinksystemvpval: "",
          ientityid: "114",
          iflag: "0",
          scode: "RW2020030017",
          ssequencekey: "100124",
          iflagdsp: "启用",
          rlinksystem: "",
          subtaskCount: 0,
          istatusidval: "1000076",
          subtaskUnStartCount: 0,
          subtaskCompeleCount: 0,
          subtaskExecutingCount: 0,
          sname: "1",
          iclassidvpval: "1000060",
          dcreatordate: "2020-03-26 16:36:26",
          rlinkywxq: "",
          idepartmentidvpval: "1",
        }]
      }
    })
  })
}
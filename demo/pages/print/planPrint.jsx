// 打印的页面 年度规划流程打印的页面

import React, { Component } from 'react'

import DivView from './divView.jsx'

import './print.less'

export default class Print extends Component {

  render() {
    return (
      <div className="print-view">
        <div className="print-content">
          <p className="h1">科技信息建设项目任务书</p>
          <DivView text="项目编号" style={{ borderTop: '1px solid #ccc' }}>
            treter
          </DivView>
          <DivView text="项目名称">
            gdfgfd
          </DivView>

          <DivView text="项目内容描述" textStyles={{ minHeight: '100px' }} autoHeight={false}>
            <DivView text="提出部门">
              gfdgf
            </DivView>
            <DivView
              className="special"
              text={<DivView text="计划开始时间">2019</DivView>}
            >
              <DivView text="计划结束时间">2019</DivView>
            </DivView>
            <p className="info lineHeight20">
              项目内容描述项目内容描述项目内容描述项目内容描述项目内容描述项目内容描述项目内容描述
            </p>
          </DivView>

          <DivView text="项目技术负责人" autoHeight={false}>
            <div className="lineHeight20" style={{ padding: '15px' }}>
              <span className="tag">张三</span>
              <span>为该项目技术负责人，负责项目的组建、管理、协调及沟通。请按时保质保量完成该项目</span>
            </div>
          </DivView>
          <DivView text="总设组意见" className="minHeight" autoHeight={false}>
            总设组意见总设组意见总设组意见总设组意见总设组意见总设组意见总设组意见总设组意见总设组意见
          </DivView>
          <DivView text="部门负责人意见" className="minHeight" autoHeight={false}>
            部门负责人意见部门负责人意见部门负责人意见部门负责人意见
          </DivView>
        </div>
      </div>
    )
  }
}
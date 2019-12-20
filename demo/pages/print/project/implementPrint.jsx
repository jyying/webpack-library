// 打印的页面 年度规划流程打印的页面

import React, { Component } from 'react'

import DivView from '../divView.jsx'

import '../print.less'
import './index.less'

export default class ImplementPrint extends Component {

  componentDidMount() {
    console.log('---------')

    // window.addEventListener('resize', () => alert('resize'))
  }

  render() {
    return (
      <div className="print-view" key={Date.now()}>
        <div className="print-content implement-view">
          <p className="h1">项目变更申请/评审表</p>

          <div className="implement">
            <div className="float-left">
              <DivView text="编号">
                编号
              </DivView>
              <DivView text="申请人">
                申请人
              </DivView>
              <DivView text="申请时间">
                申请时间
              </DivView>
              <DivView text="角色">
                角色
              </DivView>
            </div>
            <div className="float-right">
              <DivView text="项目名称">
                项目名称
              </DivView>
              <DivView text="部门">
                部门
              </DivView>
              <DivView text="变更类型">
                变更类型
              </DivView>
              <DivView text="说明">
                说明
            </DivView>
            </div>
          </div>

          <p className="desc">变更申请</p>
          <DivView text="变更内容">
            变更内容
          </DivView>
          <DivView text="变更原因">
            变更原因
          </DivView>
          <DivView text="变更影响">
            变更影响
          </DivView>
          <DivView text="支持性文件">
            支持性文件
          </DivView>

          <p className="desc">变更审核</p>
          <DivView text="解决方案">
            解决方案
          </DivView>
          <DivView text="变更利益">
            变更利益
          </DivView>
          <DivView text="变更风险">
            变更风险
          </DivView>
          <DivView text="变更建议和计划">
            变更建议和计划
          </DivView>

          <p className="desc">变更批准</p>
          <DivView text="评审小组意见" autoHeight={false}>
            <p className="info lineHeight20">评审小组意见</p>
            <div className="sign-view">
              <div className="name">
                <span className="color-blue">签字：</span>
              </div>
              <div className="time">
                <span className="color-blue">日期：</span>
              </div>
            </div>
          </DivView>
          <DivView text="科技信息部二级部门经理意见" autoHeight={false}>
            <p className="info lineHeight20">科技信息部二级部门经理意见</p>
            <div className="sign-view">
              <div className="name">
                <span className="color-blue">签字：</span>
              </div>
              <div className="time">
                <span className="color-blue">日期：</span>
              </div>
            </div>
          </DivView>
          <DivView text="提出部门负责人意见" autoHeight={false}>
            <p className="info lineHeight20">提出部门负责人意见</p>
            <div className="sign-view">
              <div className="name">
                <span className="color-blue">签字：</span>
              </div>
              <div className="time">
                <span className="color-blue">日期：</span>
              </div>
            </div>
          </DivView>

          <p className="desc border">变更验证</p>
          <DivView text="验证情况" autoHeight={false}>
            <p className="info lineHeight20">验证情况</p>
            <div className="sign-view">
              <div className="name">
                <span className="color-blue">签字：</span>
              </div>
              <div className="time">
                <span className="color-blue">日期：</span>
              </div>
            </div>
          </DivView>

          <p className="desc border">备注</p>
          <p className="info border" style={{ borderStyle: 'solid', borderBottomStyle: 'none' }}>备注信息</p>
        </div>
      </div>
    )
  }
}
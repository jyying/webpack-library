import React, { Component } from 'react'
import { Icon, Checkbox, Tooltip } from 'antd'

import './index.less'
import './dragitem.less'


export default class DragItem extends Component {

  constructor(props) {
    super(props)
    this.data = props.data

    this.state = {
      data: props.data,
    }
  }

  edit = () => {
    const { itemClick, page } = this.props
    itemClick && itemClick({ ...this.props.data, page })
  }

  shouldComponentUpdate(nextProps) {
    // console.log(nextProps, '---------------------------', this.props)
    return !(nextProps.data.text === this.props.data.text)
  }

  // 保存在当前的checkbox的状态
  onChange = (e) => {
    this.state.data.checked = e
  }

  render() {
    const {
      sname,
      scode,
      istatusname,
      subtaskCompeleCount,
      subtaskCount,
      inamerolename,
      dstartdate,
      denddate,
      swcbfb,
    } = this.props.data
    return (
      <div className="drag-item">
        <div className="item-title">
          {/* <Checkbox
            className="float-left"
            options={[
              { label: scode, value: 1 }
            ]}
            defaultValue={checked}
            onChange={this.onChange}
          /> */}
          <span style={{ fontWeight: 'bold' }}>{scode}</span>
          <Icon type="book" className="float-right edit" onClick={this.edit} />
        </div>
        <div className="item-info">
          {sname}
        </div>
        {
          subtaskCount > 0 && (
            <div className="item-info task">
              <Icon type="vpicon-navlist" /> <span>子任务：</span>{subtaskCompeleCount}/{subtaskCount}
            </div>
          )
        }

        <div className="item-footer">
          <div className="item-time" style={{ cursor: 'auto' }}>
            <Tooltip title={`${dstartdate}/${denddate}`}>
              <Icon type="calendar" style={{ marginRight: '5px' }} />
            </Tooltip>
            <Tooltip title={inamerolename}>
              <Icon type="vpicon-users" style={{ marginRight: '5px' }} />
            </Tooltip>
            <Tooltip title={istatusname}>
              <Icon type="vpicon-loading-circle" />
            </Tooltip>
            {
              swcbfb && <span>{`${swcbfb}%`}</span>
            }
            {/* <Icon type="clock-circle" />
            <span>{dcreatordate}</span> */}
          </div>
          {/* <div className="item-icon float-right">
            <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
          </div> */}
        </div>
      </div>
    )
  }
}

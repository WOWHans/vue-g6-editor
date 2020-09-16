import okSvg from "../../assets/icons/ok.svg"

import circle from '../../assets/icons/circle.svg'
import rect from '../../assets/icons/rect.svg'
import decision from '../../assets/icons/decision.svg'
// import model from '../../assets/icons/model.svg'

export const templateArray = [
     {
        name: "开始节点",
        label: "开始节点",
        type: "node",
        size: [80,80],
        shape: "customCircle",
        color: "#1890ff",
        fill: '#fef7e7',
        stroke: '#fdd9a5',
        leftImage: circle,
        outPoints: [[1, 0.5]],
        isDoingStart: true,
        tag: {
            name: '开始',
            code: 'start'
        }
      },

      {
        name: "规则项",
        label: "规则项",
        size: [88,56],
        type: "node",
        x: 0,
        y: 0,
        shape: "customNode",
        color: "#1890ff",
        fill: '#e7f7fe',
        stroke: '#7ac7ff',
        leftImage: rect,
        inPoints: [[0, 0.5]],
        outPoints: [[1, 0.5]],
        tag: {
            name: '规则项',
            code: 'ruleItem'
        }
      },
      {
        name: "条件判断",
        label: "条件判断",
        size: [86,86],
        type: "node",
        x: 0,
        y: 0,
        shape: "customDiamond",
        color: "#1890ff",
        image:
          "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
        stateImage: okSvg,
        leftImage: decision,
        inPoints: [[0, 0.5]],
        outPoints: [[1, 0.5],[0.5,0],[0.5,1]],
        tag: {
            name: '结果判断',
            code: 'resultJudge'
        }
      },
      {
        name: "结束节点",
        label: "结束节点",
        type: "node",
        size: [80,80],
        shape: "customCircle",
        color: "#1890ff",
        fill: '#fc913a',
        stroke: '#ff4e50',
        // label文本颜色
        fontColor: '#fff',
        leftImage: circle,
        inPoints: [[0, 0.5]],
        isDoingEnd: true,
        tag: {
            name: '结束',
            code: 'end'
        }
      }
]
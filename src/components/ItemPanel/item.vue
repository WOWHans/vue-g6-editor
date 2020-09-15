<template>
  <ul>
    <li
      v-for="(item,index) in list"
      :key="index"
      :class="item.shape"
      :data-shape="item.shape"
      :data-type="item.type"
      :data-size="item.size"
      draggable
      @dragstart="handleDragstart"
      @dragend="handleDragEnd($event,item)"
    >

      <div>
        <img :src="item.leftImage" alt="">
      </div>
    </li>
  </ul>
</template>

<script>
import eventBus from "../../utils/eventBus";
import okSvg from "../../assets/icons/ok.svg";
import bgImg from "../../assets/bg.jpg";
import circle from '../../assets/icons/circle.svg'
import rect from '../../assets/icons/rect.svg'
import decision from '../../assets/icons/decision.svg'
import model from '../../assets/icons/model.svg'

/* TODO: 待添加的自定义节点
 * S-开始节点
 * E-结束节点
 * 0-审批节点
 * 1-抄送节点
 * 2-分支网关
 * 3-并行网关
 * 4-汇聚节点（全部前序通过）
 * 5-汇聚节点（任意前序通过）
 * 
 * 2-分支网关: 单source, 多target, condition需要条件表达式
 * 3-并行网关: 单source, 多target, condition不需要表达式
 * 4/5-汇聚节点: 多source, 单target, condition不需要表达式
 * 
 * 节点定义示例数据如下：
 * {
    name: "双输出节点",
    label: "双输出节点",
    size: "170*34",
    type: "node",
    x: 0,
    y: 0,
    shape: "customNode",
    color: "#1890ff",
    image: "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg", // 节点类型标记，会同时显示在图像中和
    stateImage: okSvg, // 状态图片
    inPoints: [[0, 0.5]], // 输入标记
    outPoints: [[1, 0.4], [1, 0.6]], // 输出标记
  }
 */

// TODO: 节点的具体样式在功能调整完毕后再做调整
export default {
  data() {
    return {
      page: null,
      command: null,
      offsetX: 0,
      offsetY: 0,
      list: [
        {
          name: "开始节点",
          label: "开始节点",
          type: "node",
          size: "80*80",
          shape: "customCircle",
          color: "#1890ff",
          image:
            "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
          stateImage: okSvg,
          fill: '#fef7e7',
          stroke: '#fdd9a5',
          leftImage: circle,
          outPoints: [[1, 0.5]],
          isDoingStart: true
        },

        {
          name: "背景图片节点",
          label: "背景图片节点",
          size: "170*34",
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          image:
            "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
          stateImage: okSvg,
          leftImage: rect,
          backImage: bgImg,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]]
        },
        {
          name: "双输出节点",
          label: "双输出节点",
          size: "170*34",
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          image:
            "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
          stateImage: okSvg,
          leftImage: decision,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.4], [1, 0.6]]
        },
        {
          name: "大型节点",
          label: "大型节点",
          size: "340*34",
          type: "node",
          x: 0,
          y: 0,
          shape: "customNode",
          color: "#1890ff",
          image:
            "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
          stateImage: okSvg,
          leftImage: model,
          inPoints: [[0, 0.5]],
          outPoints: [[1, 0.5]]
        },
        {
          name: "结束节点",
          label: "结束节点",
          type: "node",
          size: "80*80",
          shape: "customCircle",
          color: "#1890ff",
          image:
            "https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg",
          stateImage: okSvg,
          leftImage: circle,
          inPoints: [[0, 0.5]],
          isDoingEnd: true
        }
      ]
    };
  },
  created() {
    this.bindEvent();
  },
  methods: {
    handleDragstart(e) {
      this.offsetX = e.offsetX;
      this.offsetY = e.offsetY;
    },
    handleDragEnd(e, item) {
      let data = {};
      Object.assign(data, item);
      data.offsetX = this.offsetX;
      data.offsetY = this.offsetY;
      if (this.page) {
        const graph = this.page.graph;
        // const size = e.target.dataset.size.split("*");
        const xy = graph.getPointByClient(e.x, e.y);
        data.x = xy.x;
        data.y = xy.y;
        if (item.size) {
          data.size = item.size.split("*");
        }
        data.type = "node";
        this.command.executeCommand("add", [data]);
      }
    },
    bindEvent() {
      eventBus.$on("afterAddPage", page => {
        this.page = page;
        this.command = page.command;
      });
    }
  }
};
</script>

<style scoped>
.itempannel {
  height: 100%;
  position: absolute;
  left: 0px;
  z-index: 2;
  background: #f7f9fb;
  padding:8px 16px;
  padding-top: 8px;
  border-right: 1px solid #e6e9ed;
}
.itempannel li {
  color: rgba(0, 0, 0, 0.65);
  list-style-type: none;
}

.itempannel .pannel-type-icon {
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
}
</style>
<template>
  <div class="page">
    <div :id="pageId" class="graph-container"></div>
  </div>
</template>


<script>
import G6 from "@antv/g6";
import { initBehavors } from "../../behavior";

/* TODO: 流程图的展示模式是否直接使用dagre来进行自动布局？
*/

export default {
  data() {
    return {
      pageId: "graph-container",
      graph: null
    };
  },
  props: {
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    initBehavors();
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      const height =  this.height - 42 
      const width =  this.width - 400

      this.graph = new G6.Graph({
        container: "graph-container",
        // 画布高宽
        height: height,
        width: width,
        // 节点分组类型，支持 circle 和 rect
        groupType: 'rect',
        groupStyle: {
          default: {},
          hover: {},
          collapse: {},
        },
        modes: {
          // 支持的 behavior
          default: [
            "drag-canvas",
            "zoom-canvas",
            "hover-node",
            "select-node",
            "hover-edge",
            "keyboard",
            "customer-events",
            "add-menu",
            "drag-node",
          ],
          mulitSelect: ["mulit-select"],
          addEdge: ["add-edge"],
          // moveNode:[ "drag-item"]
        }
      });
      
      const { editor, command } = this.$parent;
      editor.emit("afterAddPage", { graph: this.graph, command });
      this.graph.getContainer().
      this.readData();
    },
    readData() {
      let data = this.data;
      if (data) {
        this.graph.read(data);
      }
    }
  }
};
</script>

<style scoped>
.g6-grid-container {
  left: 0 !important;
}
</style>
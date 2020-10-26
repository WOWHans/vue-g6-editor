<template>
  <div class="detailpannel">

      <div v-if="status=='node-selected'" class="pannel" id="node_detailpannel">
        <div class="pannel-title">模型详情</div>
        <div class="block-container">
          <el-row>
            <el-col>名称</el-col>
            <el-col :span="10">
              <el-input v-model="node.label" @change="handleChangeName" />
            </el-col>
            <el-col>任意属性</el-col>
            <el-col :span="10">
              <el-input v-model="node.xxx" />
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-else-if="status==='canvas-selected'" class="pannel" id="canvas_detailpannel">
        <div class="pannel-title">画布</div>
        <div class="block-container">
          <el-checkbox v-model="showGrid" @change="changeGridState">网格对齐</el-checkbox>
        </div>
      </div>
      <!-- <div v-if="status==='group-selected'" class="pannel" id="node_detailpannel">
        <div class="pannel-title">群组详情</div>
        <div class="block-container">
          <div class="p">
            名称：
            <el-input v-model="name" />
          </div>
          <div class="p">
            任意属性：
            <el-input v-model="color" />
          </div>
        </div>
      </div>
      -->

  </div>
</template>

<script>
import G6 from '@antv/g6';
import eventBus from "../../../utils/eventBus";



const { Grid } = G6;

/* TODO: 为节点添加属性，属性内容由详细设计和接口中确定
*/
export default {
  data() {
    return {
      status: "canvas-selected",
      showGrid: false,
      page: {},
      graph: {},
      item: {},
      node: {},
      grid: null,
      drawer: false
    };
  },
  created() {
    this.init();
    this.bindEvent();
  },
  methods: {
    init() {},
    bindEvent() {
      let self = this;
      eventBus.$on("afterAddPage", page => {
        // console.log('page',page)
        self.page = page;
        self.graph = page.graph;
        eventBus.$on("nodeselectchange", item => {
          // console.log('nodeselectchange',item)
          if (item.select === true && item.target.getType() === "node") {
            self.status = "node-selected";
            self.item = item.target;
            self.node = item.target.getModel();
            self.drawer = true
          } else {

            self.status = "canvas-selected";
            self.item = null;
            self.node = null;
          }
        });
      });
    },
    handleChangeName(e) {

      const model = {
        label: e
      };
      this.graph.update(this.item, model);
    },
    changeGridState(value) {
      if (value) {
        this.grid = new Grid();
        this.graph.addPlugin(this.grid);
      } else {
        this.graph.removePlugin(this.grid);
      }
    }
  }
};
</script>

<style scoped>
.detailpannel {
  width: 100%;
  background: #f7f9fb;
  border-left: 1px solid #e6e9ed;
}
.detailpannel .block-container {

}
.block-container .el-col {
  height: 28px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.pannel-title {
  height: 32px;
  border-top: 1px solid #dce3e8;
  border-bottom: 1px solid #dce3e8;
  background: #ebeef2;
  color: #000;
  line-height: 28px;
  padding-left: 12px;
}
</style>

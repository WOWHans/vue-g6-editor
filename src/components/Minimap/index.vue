<template>
  <div id="navigator">
    <div class="pannel-title">导航器</div>
    <div id="minimap" class="minimap" ref="minimap"></div>
    <!-- <div id="zoom-slider">
      <a class="zoom-dropdown-btn ant-dropdown-trigger" href="#">
        100 %
        <i class="anticon anticon-down"></i>
      </a>
    </div> -->
  </div>
</template>

<script>
import G6 from "@antv/g6";
import eventBus from "../../utils/eventBus";

const { Minimap } = G6;
const { Grid } = G6;

export default {
  data() {
    return {
      minimap: null,
      graph: null
    };
  },
  created() {
    this.bindEvent();
  },
  mounted() {
    this.$nextTick(() => {
      this.initMinmap();
    });
  },
  methods: {
    initMinmap() {
      const cfgs = {
        container: "minimap",
        size:[200,300]
      };
      this.minimap = new Minimap({ ...cfgs });
      this.graph.addPlugin(this.minimap)
    },
    bindEvent() {
      eventBus.$on("afterAddPage", page => {
        console.log(page)
        this.graph = page.graph;
        this.graph.addPlugin(new Grid({begin:[-131,0]}));
      });
    }
  }
};
</script>

<style scoped>
#navigator {
  width: 200px;
  height: 406px;
  /* position: absolute; */
  /* bottom: 0px; */
  /* right: 0px; */
  /* z-index: 3; */
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

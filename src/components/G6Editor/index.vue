<template>
  <div id="mountNode" :style="{width:width}">
    <div class="editor" >
      <context-menu />
      <!--toolbar-->
      <toolbar />
      <div style="height: 42px;"></div>
      <div class="main-container">
        <!--itempannel-->
        <item-panel />
         <!--page-->
        <page :height="height" :width="width"  :data="data"/>

        <right-panel/>
      </div>
    </div>
    <Flow />
  </div>
</template>

<script>
import Toolbar from "../Toolbar";
import ItemPanel from "../ItemPanel";
import RightPanel from '../RightPanel'

import Page from "../Page";
import Flow from "../Flow"
import ContextMenu from "../ContextMenu";
import Editor from "../Base/Editor";
import command from "../../command";
export default {
  name: "G6Editor",
  components: {
    Toolbar,
    ItemPanel,

    RightPanel,
    Page,
    ContextMenu,
    Flow
  },
  props: {
    height: {
      type: Number,
      default: document.documentElement.clientHeight
    },
    width: {
      type: Number,
      default: document.documentElement.clientWidth
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.init();
  },
  data() {
    return {
      editor: {},
      command: null
    };
  },
  methods: {
    init() {
      this.editor = new Editor();
      this.command = new command(this.editor);
    }
  }
};
</script>

<style scoped>
.editor {
  width: 100%;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  display: flex;
  flex-direction: column;
}
.main-container {
  display: flex;
  flex-direction: row;
}
</style>
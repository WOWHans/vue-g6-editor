import G6 from '@antv/g6';
import { baseDraw, baseSetState } from './common';
import { uniqueId } from '../../../utils'

const customDiamond = () => {
  G6.registerNode("customDiamond", {
    draw(cfg, group) {
      let size = cfg.size;
      if (!size) {
        size = [170, 34]
      }
      // 此处必须是NUMBER 不然bbox不正常



      // 此处必须有偏移 不然drag-node错位


      const mainId = 'path' + uniqueId()

      const shape = group.addShape('path', {
        attrs: {
          path: this.getPath(cfg), // 因为增加了 update 所以要把共用方法提取出来
          stroke: cfg.stroke || '#ced4d9',
          fill: cfg.fill || '#fff'//此处必须有fill 不然不能触发事件,
        }
      });
      if(cfg.label) { // 如果有文本
        // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
        // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
        // style.text = cfg.label;
        group.addShape('text', {
          // attrs: style
          attrs: {
            x: 0, // 居中
            y: 0,
            textAlign: 'center',
            textBaseline: 'middle',
            text: cfg.label,
            fill: '#666'
          }
        });
      }



      baseDraw(cfg, group, mainId);
      return shape;
    },
    getPath(cfg) {
      const size = cfg.size || [40, 40]; // 如果没有 size 时的默认大小
      const width = size[0];
      const height = size[1];
      //  / 1 \
      // 4     2
      //  \ 3 /
      const path = [
        ['M', 0, 0 - height / 2], // 上部顶点
        ['L', width / 2, 0], // 右侧点
        ['L', 0, height / 2], // 下部
        ['L', - width / 2, 0], // 左侧
        ['Z'] // 封闭
      ];
      return path;
    },
    update(cfg, node) {
      const group = node.getContainer(); // 获取容器
      const shape = group.get('children')[0]; // 按照添加的顺序
      const style = {
        path: this.getPath(),
        stroke: cfg.color
      };
      shape.attr(style); // 更新属性
      // 更新文本的逻辑类似，但是需要考虑 cfg.label 是否存在的问题
      // 通过 label.attr() 更新文本属性即可
    },
    // 当外部调用 graph.setItemState(item, state, value) 时, 该函数做出响应
    setState: baseSetState,
  })
}

export default customDiamond;
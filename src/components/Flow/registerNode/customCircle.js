import G6 from '@antv/g6';
import { baseDraw, baseSetState } from './common';
import { uniqueId } from '../../../utils'

const customCircle = () => {
  G6.registerNode("customCircle", {
    draw(cfg, group) {
      let size = cfg.size;
      if (!size) {
        size = [170, 34]
      }
      // 此处必须是NUMBER 不然bbox不正常
      const width = parseInt(size[0]);
      const height = parseInt(size[1]);

      // 此处必须有偏移 不然drag-node错位
      const offsetX = 0
      const offsetY = 0

      const mainId = 'circle' + uniqueId()

      // 外边框
      const shape = group.addShape("circle", {
        attrs: {
          id: mainId,
          x: offsetX,
          y: offsetY,
          r: size[0]/2,
          stroke: cfg.stroke || '#ced4d9',
          fill: cfg.fill || '#fff'//此处必须有fill 不然不能触发事件,
        },
        draggable: true,
        name: 'key-shape'
      });
      baseDraw(cfg, group, mainId);
      return shape;
    },
    // 当外部调用 graph.setItemState(item, state, value) 时, 该函数做出响应
    setState: baseSetState,
  })
}

export default customCircle;
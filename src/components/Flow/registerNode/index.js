import customNode from './customNode';
import customCircle from './customCircle'
import customDiamond from './customDiamond'
import testNode from './testNode';

export default function registerNode() {
  customCircle()
  customNode()
  customDiamond()
  testNode();
}

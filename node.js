export default class BSTNode {
  constructor(val, parent = null) {
    this.parent = parent
    this.left = null
    this.right = null
    this.val = val
  }
}
import BSTNode from './node';

export default class BST {
  constructor() {
    this.root = null
  }

  insert(val, node = this.root) {
    if (!this.root) { // if this is the first val, insert to root & return
      return this.root = new BSTNode(val)
    }

    if (node.val === val) return // no duplicates

    if (val < node.val) {
      node.left ? this.insert(val, node.left) : node.left = new BSTNode(val, node)
    } else {
      node.right ? this.insert(val, node.right) : node.right = new BSTNode(val, node)
    }
  }

  remove(target) {
    let targetNode = this.search(target)

    if (targetNode) {
      if (this.isLeaf(targetNode)) {
        this.removeLeaf(targetNode)
      } else if (!targetNode.right ^ !targetNode.left) {
        this.removeNodeWithSingleChild(targetNode)
      } else {
        this.removeNodeWithTwoChildren(targetNode)
      }
    } else {
      return 'not found'
    }
  }

  removeLeaf(node) {
    if (node.parent) {
      node.parent.left === node ? node.parent.left = null : node.parent.right = null
    } else {
      this.root = null // only root has no parent
    }
  }

  removeNodeWithSingleChild(node) {
    let child = node.right || node.left
    child.parent = node.parent

    Object.assign(node, child)
  }

  removeNodeWithTwoChildren(node) {
    let successorNode = this.getInorderSuccessor(node.right)
    const successorVal = successorNode.val

    this.remove(successorVal)

    node.val = successorVal
  }

  getInorderSuccessor(node) {
    while (node && node.left) {
      node = node.left
    }

    return node
  }

  search(target, node = this.root) {
    if (!node) return node;

    if (node.val === target) return node

    if (target > node.val) return this.search(target, node.right)
    else return this.search(target, node.left)
  }

  isLeaf(node) {
    return node && !node.left && !node.right;
  }

  inOrderTraverse(node = this.root, nodes = []) {
    if (node) {
      this.inOrderTraverse(node.left, nodes)
      nodes.push(node.val)
      this.inOrderTraverse(node.right, nodes)
    }

    return nodes
  }

  postOrderTraverse(node = this.root, nodes = []) {
    if (node) {
      this.postOrderTraverse(node.left, nodes)
      this.postOrderTraverse(node.right, nodes)
      nodes.push(node.val)
    }

    return nodes
  }

  preOrderTraverse(node = this.root, nodes = []) {
    if (node) {
      nodes.push(node.val)
      this.preOrderTraverse(node.left, nodes)
      this.preOrderTraverse(node.right, nodes)
    }

    return nodes
  }
}
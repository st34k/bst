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
      if (node.left) {
        this.insert(val, node.left)
      } else {
        node.left = new BSTNode(val, node)
      }
    } else {
      if (node.right) {
        this.insert(val, node.right)
      } else {
        node.right = new BSTNode(val, node)
      }
    }
  }

  remove(target) {
    let targetNode = this.search(target)

    if (targetNode) {
      if (this.isLeaf(targetNode)) { // no children
        if (targetNode.parent) {
          targetNode.parent.left === targetNode ? targetNode.parent.left = null : targetNode.parent.right = null
        } else {
          this.root = null // only root has no parent
        }
      } else if (!targetNode.right ^ !targetNode.left) { // single child
        Object.assign(targetNode, targetNode.right || targetNode.left)
      } else {
        // if the node has 2 children, find inorder successor (right --> left all the way)
        let successorNode = this.getInorderSuccessor(targetNode.right)
        const successorVal = successorNode.val

        this.remove(successorVal)

        targetNode.val = successorVal
      }
    } else {
      return 'not found'
    }
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

  // traverse(node = this.root, nodes = [], type = 'postOrder') {
  //   if (node) {
  //
  //   }
  //
  //   const traversals = {
  //     inorder: () => {
  //       this.traverse(node.left, nodes, 'inorder')
  //       nodes.push(node)
  //       this.traverse(node.right, nodes, 'inorder')
  //     }
  //   }
  // }
}
import BSTNode from './node';

export default class BST {
  constructor() {
    this.root = null
    this.parent = null
  }

  insert(val) {
    if (!this.root) {
      // if we're at the root, create new node & insert
      this.root = new BSTNode(val)
    } else {
      // else search recursively where should be inserted
      this._insert(val, this.root)
    }
  }

  _insert(val, node) {
    if (node.val === val) return // no duplicates

    if (val < node.val) {
      if (!node.left) {
        node.left = new BSTNode(val)
      } else {
        this._insert(val, node.left)
      }
    } else {
      if (!node.right) {
        node.right = new BSTNode(val)
      } else {
        this._insert(val, node.right)
      }
    }
  }

  remove(target) {
    // find the target node
    // check if has children
    // node has one child - copy child value into node value, delete child node
    // 2 children - find inorder successor
    // copy successor value to target node, delete successor node
    let targetNode = this.search(target)

    if (targetNode) {
      if (this.isLeaf(targetNode)) {
        if (this.root === targetNode) return this.root = null

        if (this.parent.left === targetNode) {
          this.parent.left = null
        } else {
          this.parent.right = null
        }
      } else if (!targetNode.right ^ !targetNode.left) {
          Object.assign(targetNode, targetNode.right || targetNode.left)
      } else {
        // if the node has 2 children, find inorder successor
        let prev = targetNode
        let next = targetNode.right
        const inorderSuc = () => {
          while (next && next.left) {
            prev = next
            next = next.left
          }

          return next
        }

        let successorNode = inorderSuc()
        const newVal = successorNode.val

        this.remove(successorNode.val)

        targetNode.val = newVal
      }
      this.parent = null;
    } else {
      return 'not found'
    }
  }

  search(target, node = this.root) {
    if (!node) return node;

    if (node.val === target) return node

    this.parent = node // keep track of parent before checking next child

    if (target > node.val) return this.search(target, node.right)
    else return this.search(target, node.left)
  }

  isLeaf(node) {
    return node && !node.left && !node.right;
  }

  inOrderTraverse(node = this.root) {
    if (node) {
      this.inOrderTraverse(node.left)
      console.log(node.val)
      this.inOrderTraverse(node.right)
    }
  }
}
import BST from './bst.js'
// TODO: clean up

describe('BST', () => {
  let tree = new BST()
  afterEach(() => {
    tree = new BST()
  })

  describe('insert', () => {
    test('insert', () => {
      [3, 4, 1, 7].forEach(n => {
        tree.insert(n)
      })

      expect(tree.root.val).toEqual(3)
      expect(tree.root.right.val).toEqual(4)
      expect(tree.root.right.right.val).toEqual(7)
      expect(tree.root.left.val).toEqual(1)
    })
  })

  describe('search', () => {
    test('search empty', () => {
      let result = tree.search(5);
      expect(result).toBeNull()
    })

    test('search', () => {
      [7, 3, 10, 4, 5].forEach(n => tree.insert(n))

      expect(tree.search(10).val).toEqual(10)
      expect(tree.search(3).val).toEqual(3)
      expect(tree.search(8)).toBeNull()
    })
  })

  describe('remove target', () => {
    test('remove root with no children', () => {
      tree.remove()
      // make it throw
    })

    test('remove - with 1 node', () => {
      // fix the expect here
      [7].forEach(n => tree.insert(n))
      tree.remove(7)

      expect(tree).toEqual({
        root: null
      })
    })

    test('remove - with 2 nodes', () => {
      // fix the expect here
      [7, 3].forEach(n => tree.insert(n))
      tree.remove(7)

      expect(tree.root).toEqual({
        left: null, right: null, parent: null, val: 3
      })
    })

    test('remove - node with 2 children (replacement is a leaf)', () => {
      // fix the expect here
      [7, 3, 10].forEach(n => tree.insert(n))
      tree.remove(7)

      expect(tree.root.val).toEqual(10)
      expect(tree.root.left.val).toEqual(3)
      expect(tree.root.right).toBeNull()
    })

    test('remove twice in succession', () => {
      // fix the expect here
      [7, 3, 10, 4, 5].forEach(n => tree.insert(n))
      tree.remove(7)
      tree.remove(3)

      expect(tree.root.val).toEqual(10)
      expect(tree.root.left.val).toEqual(4)
      expect(tree.root.left.right.val).toEqual(5)
    })

    test('remove - node with 2 children (replacement has right child)', () => {
      // fix the expect here
      [10, 5, 15, 4, 14, 16, 7, 8].forEach(n => tree.insert(n))
      tree.remove(5)

      expect(tree.root.left.val).toEqual(7)
      expect(tree.root.left.right.val).toEqual(8)

      expect(tree.root.left.right.left).toBeNull()
      expect(tree.root.left.right.right).toBeNull()
    })
  })

  describe('traversals', () => {
    let t = new BST()

    beforeAll(() => {
      ['d', 'b', 'a', 'c', 'e'].forEach(n => t.insert(n))
    })

    test('inOrder', () => {
      const res = t.inOrderTraverse()

      expect(res).toEqual(['a', 'b', 'c', 'd', 'e'])
    })

    test('postOrder', () => {
      const res = t.postOrderTraverse()

      expect(res).toEqual(['a', 'c', 'b', 'e', 'd'])
    })

    test('preOrder', () => {
      const res = t.preOrderTraverse()

      expect(res).toEqual(['d', 'b', 'a', 'c', 'e'])
    })
  })
})

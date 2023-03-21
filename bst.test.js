import BST from './bst.js'
import BSTNode from './node';

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
        parent: null, root: null
      })
    })

    test('remove - with 2 nodes', () => {
      // fix the expect here
      [7, 3].forEach(n => tree.insert(n))
      tree.remove(7)

      expect(tree.root).toEqual({
        left: null, right: null, val: 3
      })
    })

    test('remove - with 2 children', () => {
      // fix the expect here
      [7, 3, 10].forEach(n => tree.insert(n))
      tree.remove(7)

      expect(tree.root.val).toEqual(10)
      expect(tree.root.left.val).toEqual(3)
      expect(tree.root.right).toBeNull()
    })

    test('remove twice', () => {
      // fix the expect here
      [7, 3, 10, 4, 5].forEach(n => tree.insert(n))
      tree.remove(7)
      tree.remove(3)

      expect(tree.root.val).toEqual(10)
      expect(tree.root.left.val).toEqual(4)
      expect(tree.root.left.right.val).toEqual(5)
    })
  })
})

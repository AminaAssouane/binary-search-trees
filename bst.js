class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  bstRecur(arr, start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let root = new Node(arr[mid]);

    root.left = this.bstRecur(arr, start, mid - 1);
    root.right = this.bstRecur(arr, mid + 1, end);

    return root;
  }

  buildTree(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);

    return this.bstRecur(sortedArray, 0, sortedArray.length - 1);
  }

  insert(value) {
    const temp = new Node(value);

    // If tree is empty
    if (this.root === null) {
      this.root = temp;
      return;
    }

    // Find the node who is going to have the new node as its child
    let curr = this.root;
    while (curr !== null) {
      if (curr.data === value) return;
      if (curr.data > value && curr.left !== null) {
        curr = curr.left;
      } else if (curr.data < value && curr.right !== null) {
        curr = curr.right;
      } else break;
    }

    // If key is smaller, make it left child, else right child
    if (curr.data > value) curr.left = temp;
    else curr.right = temp;
  }
}

// TESTS
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(tree.root);

tree.insert(100);
prettyPrint(tree.root);

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

  deleteItem(value) {
    this.root = this.deleteRec(this.root, value);
  }

  getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) curr = curr.left;
    return curr;
  }

  deleteRec(node, value) {
    if (node === null) return null;

    if (value < node.data) {
      node.left = this.deleteRec(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteRec(node.right, value);
    } else {
      // FOUND the node
      // Node with 0 or 1 child
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      // Node with 2 children
      const succ = this.getSuccessor(node);
      node.data = succ.data;
      node.right = this.deleteRec(node.right, succ.data);
    }

    return node;
  }

  // Finding a value in a tree.

  findRec(node, value) {
    if (node === null) return null;
    if (node.data === value) return node;
    else if (node.data > value) return this.findRec(node.left, value);
    else if (node.data < value) return this.findRec(node.right, value);
  }

  find(value) {
    return this.findRec(this.root, value);
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function")
      throw new Error("A callback function is required");

    if (this.root === null) return null;

    let queue = [this.root];
    while (queue.length != 0) {
      let curr = queue[0];
      callback(curr.data);
      if (curr.left != null) queue.push(curr.left);
      if (curr.right != null) queue.push(curr.right);
      queue.shift();
    }
  }

  // left, root, right
  inOrderRec(node, callback) {
    if (node === null) return;

    this.inOrderRec(node.left, callback);
    callback(node.data);
    this.inOrderRec(node.right, callback);
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function")
      throw new Error("A callback function is required");

    if (this.root === null) return null;
    this.inOrderRec(this.root, callback);
  }

  // root, left, right
  preOrderRec(node, callback) {
    if (node === null) return;

    callback(node.data);

    this.preOrderRec(node.left, callback);
    this.preOrderRec(node.right, callback);
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function")
      throw new Error("A callback function is required");

    if (this.root === null) return null;
    this.preOrderRec(this.root, callback);
  }

  // left, right, root
  postOrderRec(node, callback) {
    if (node === null) return;

    this.postOrderRec(node.left, callback);
    this.postOrderRec(node.right, callback);
    callback(node.data);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function")
      throw new Error("A callback function is required");

    if (this.root === null) return null;
    this.postOrderRec(this.root, callback);
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

tree.deleteItem(8);
prettyPrint(tree.root);

console.log(tree.find(5));
console.log(tree.find(26));

tree.levelOrderForEach(console.log);

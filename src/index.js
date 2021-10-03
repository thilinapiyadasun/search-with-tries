class Node {
  constructor(value, isEnd = false) {
    this.value = value;
    this.children = new Map();
    this.isEnd = isEnd;
  }

  setIsEnd() {
    this.isEnd = true;
  }

  hasChild(value) {
    return this.children.has(value);
  }

  addChild(value, node) {
    this.children.set(value, node);
  }

  getChild(value) {
    return this.children.get(value);
  }

  hasChildren() {
    return this.children.size > 0;
  }

  getChildren() {
    return Array.from(this.children.values());
  }
}

class Trie {
  constructor() {
    this.root = new Node(null, false);
  }

  insert(word) {
    let prvNode = this.root;
    const wordArr = [...word];
    let length = wordArr.length;

    for (let i = 0; i < length; i++) {
      prvNode = this._insert(prvNode, wordArr[i]);
    }
    prvNode.setIsEnd();
  }

  _insert(root, value, isEnd = false) {
    if (!root.hasChild(value)) {
      let node = new Node(value);
      root.addChild(value, node);
    }
    return root.getChild(value);
  }

  contains(word) {
    let current = this.root;

    for (let i = 0; i < [...word].length; i++) {
      if (!current.hasChild([...word][i])) {
        return false;
      }
      current = current.getChild([...word][i]);
    }
    return current.isEnd === true;
  }

  _findWords(node, prefix, list) {
    if (node === null) return;

    if (node.isEnd) {
      list.push(prefix);
    }

    for (let c of node.getChildren()) {
      this._findWords(c, prefix + c.value, list);
    }
  }

  _findLastNode(prefix) {
    if (prefix === null) return null;
    let current = this.root;
    let arr = [...prefix];

    for (let c of arr) {
      if (current.hasChild(c)) {
        let child = current.getChild(c);
        if (child === null) {
          return null;
        }
        current = child;
      }
    }
    return current;
  }

  findWords(prefix) {
    let lastNode = this._findLastNode(prefix);
    const list = [];

    this._findWords(lastNode, prefix, list);
    return list;
  }
}

const trie = new Trie();

trie.insert("can");
trie.insert("canada");
trie.insert("car");
trie.insert("dog");
trie.insert("cars");
trie.insert("carrot");

const loadList = (prefix) => {
  //find result word-div
  //if exisits remove it
  const parentDiv1 = document.getElementById("word-div");
  if (parentDiv1) {
    document.body.removeChild(parentDiv1);
  }

  //create word-div
  //set id
  const parentDiv = document.createElement("div");
  parentDiv.setAttribute("id", "word-div");
  //append that div to document body
  document.body.appendChild(parentDiv);

  //find all the workds by traversing the tire
  const list = trie.findWords(prefix);
  console.log(list);
  for (let word of list) {
    //create li element with reuslt and append to word-div
    const myli = document.createElement("li");
    const contnet = document.createTextNode(word);
    myli.appendChild(contnet);
    parentDiv.appendChild(myli);
  }
};

const inputBox = document.querySelector(".my-input");
inputBox.addEventListener("keyup", (event) => {
  loadList(event.target.value);
});

// const nodes = document.querySelectorAll("h1");
// console.log(nodes);
// const handleOnClick = (event) => {
//   console.log(
//     (event.target.parentNode.querySelector("p").style.display = "block")
//   );
// };
// export const onClickHeader = () => {
//   console.log("clicked");
// };

// Array.from(nodes).forEach((item) =>
//   item.addEventListener("click", handleOnClick)
// );

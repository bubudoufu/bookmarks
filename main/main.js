function getTreeNodes() {
  chrome.bookmarks.getRecent(10000, function (bookmarkTreeNodes) {
    const TreeNodes = bookmarkTreeNodes;
    getNode(TreeNodes);
  });
}

function time(date) {
  const timestamp = date;
  let datetime = new Date(timestamp);

  return `${datetime.getFullYear()}年${
    datetime.getMonth() + 1
  }月${datetime.getDate()}日`;
}

function getNode(bookmarkTreeNodes) {
  const fragment = document.createDocumentFragment();
  const template = document.getElementById("template");

  bookmarkTreeNodes.forEach(function (node) {
    const clone = template.content.cloneNode(true);

    clone.querySelector("a").href = node.url;
    clone.querySelector("a").textContent = node.title;
    clone.querySelector(".time").textContent = time(node.dateAdded);
    clone.querySelector(".remove").id = node.id;
    clone.querySelector(".remove").title = node.title;

    fragment.appendChild(clone);
  });
  document.querySelector("ul").appendChild(fragment);
}

getTreeNodes();

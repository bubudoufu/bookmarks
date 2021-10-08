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
  for (let i = 0; i < bookmarkTreeNodes.length; i++) {
    const node = bookmarkTreeNodes[i];
    const clone = template.content.cloneNode(true);

    if (node.children) {
      getNode(node.children);
    } else if (node.title && node.url) {
      clone.querySelector("a").href = node.url;
      clone.querySelector("a").textContent = node.title;
      clone.querySelector("span").textContent = time(node.dateAdded);
    }
    fragment.appendChild(clone);
  }
  document.querySelector("ul").appendChild(fragment);
}

getTreeNodes();

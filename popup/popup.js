document.getElementById("main").onclick = function() {
    chrome.tabs.create({url: './main/main.html'});
  };
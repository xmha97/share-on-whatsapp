function tweet(url, text) {
	var openas = localStorage.getItem('openas');
  if(!openas) openas = "popup";
	var postUrl = "https://wa.me/?text=" + encodeURIComponent(text) + " \r\n" + encodeURIComponent(url);
	if(openas === "popup") {
		browser.windows.create({"url": postUrl, type:"popup", "height":450,"width":600, "top": 100, "left":100});
	}
	else if(openas === "tab") {
		browser.tabs.create({url: postUrl});
	}
}

// browser toolbar
browser.browserAction.onClicked.addListener(function(tab) {
	tweet(tab.url, tab.title);
});


// context menu
function onClickHandler(info, tab){
	if (info.menuItemId == "tweet-page"){
		tweet(info.pageUrl, tab.title);
	}
	if (info.menuItemId == "tweet-link"){
		tweet(info.linkUrl, "Link: ");
	}
	if (info.menuItemId === "tweet-selection") {
		tweet(tab.url, info.selectionText);
	}
}

contexts = ["page","selection","link"];
 for (var i = 0; i < contexts.length; i++) {
	 var context = contexts[i];
	 var title = "Share " + context + " on WhatsApp";
	 browser.contextMenus.create({"title": title, "contexts":[context], "id": "tweet-"+context});
 }

browser.contextMenus.onClicked.addListener(onClickHandler);

// first run
browser.runtime.onInstalled.addListener( function(details) {

  if(details.reason == "install"){
    browser.tabs.create({url: "https://addons.mozilla.org/en-US/firefox/addon/share-on-whatsapp/"});
  }
});

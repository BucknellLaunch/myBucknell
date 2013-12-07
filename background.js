// Copyright (c) 2013 Kuree

// Called when the user clicks on the browser action.
//chrome.browserAction.onClicked.addListener(function(tab) {
//  // No tabs or host permissions needed!
//chrome.tabs.create({'url': "https://portal-prd.bucknell.edu/"});
//});
chrome.extension.onMessage.addListener(function(request, sender, sendMessage) {
    if (request.method == "getLocalStorage")
      sendMessage({data: localStorage[request.key]});
    else	
      sendMessage({}); // snub them.
});
// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        chrome.tabs.create({url: "options.html"});
    }
    
});
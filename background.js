// Copyright (c) 2013 Kuree. Modified by Li Li


chrome.extension.onMessage.addListener(function(request, sender, sendMessage) {
    if (request.method == "getLocalStorage"){
	sendMessage({data: localStorage[request.key]});
    }
    else if(request.method == "setLocalStorage"){
	localStorage[request.key] = request.value;
    }
    else
    sendMessage({}); // snub them.
});

// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        chrome.tabs.create({url: "options.html"});
    }
	if(!localStorage.mybucknellcount)
	{
		localStorage.mybucknellcount = 0;
	};
	if(!localStorage.librarycount)
	{
		localStorage.librarycount = 0;
	};
	if(!localStorage.moodlecount)
	{
		localStorage.moodlecount = 0;
	};
	if(!localStorage.innetworkcount)
	{
		localStorage.innetworkcount = 0;
	};
	if(!localStorage.logincount)
	{
		localStorage.logincount = 0;
	};
});

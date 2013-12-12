// Copyright (c) 2013 Kuree. Modified by Li Li

function deleteCookie(url,name,store){
    console.log("Delete URL: "+url+" | NAME: "+name+" |");
    chrome.cookies.remove({
        'url':url,
        'name':name,
        'storeId':store
    });
};

function resetCookie(cookie){
	// get the oringinal cookie.
	var expirationDate = new Date("Octobor 13, 2014, 11:23:00").getTime();
	newCookie = new Object();
	newCookie.url = 'https://cas.bucknell.edu/cas/login';
	newCookie.name = cookie.name;
	newCookie.value = cookie.value;
	newCookie.domain = cookie.domain;
	newCookie.path = cookie.path;
	newCookie.secure = cookie.secure;
	newCookie.storeId = cookie.storeId;
	// set the expiration date so the new cookie is not session cookie any more.
	newCookie.expirationDate = expirationDate;

	// delete the original cookie
	deleteCookie(newCookie.url, newCookie.name, newCookie.storeId);
	chrome.cookies.set(newCookie, function(e) {console.log('created');});
};



chrome.cookies.onChanged.addListener(function(changeInfo){
	var cookie = changeInfo.cookie;
	if (cookie.name == 'CASTGC'){
		// if the cookie is a session cookie and it is newly created, make it a non-session cookie.
		if (cookie.session && !changeInfo.removed){
			resetCookie(cookie);
		}
	}
});


// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == "install"){
		chrome.tabs.create({url: "options.html"});
  }
	if(!localStorage.bmailcount)
	{
		localStorage.bmailcount = 0;
	};
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

/* This code is not needed any more.
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
*/


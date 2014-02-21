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
	// get next year's date
	var curDate = new Date();
	curDate.setFullYear(curDate.getFullYear() + 1);
	var expirationDate = curDate.getTime();
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
	if(localStorage.getItem("bmailcount") === null)
	{
		localStorage.bmailcount = 0;
	};
	if(localStorage.getItem("mybucknellcount") === null)
	{
		localStorage.mybucknellcount = 0;
	};
	if(localStorage.getItem("librarycount") === null)
	{
		localStorage.librarycount = 0;
	};
	if(localStorage.getItem("moodlecount") === null)
	{
		localStorage.moodlecount = 0;
	};
	if(localStorage.getItem("innetworkcount") === null)
	{
		localStorage.innetworkcount = 0;
	};
	if(localStorage.getItem("bannerwebcount") === null)
	{
		localStorage.bannerwebcount = 0;
	};
	
	if(localStorage.getItem("scheduletime") === null)
	{
		localStorage.scheduletime = 5;
	};
	if(localStorage.getItem("bmailcheck") === null)
	{
		localStorage.bmailcheck = true;
	};
	if(localStorage.getItem("safeConnect") === null)
	{
		localStorage.safeConnect = true;
	};

	if(localStorage.username)	// Legacy clear up
	{
		localStorage.removeItem(username);
	}
	if(localStorage.password)	// Legacy clear up
	{
		localStorage.removeItem(password);
	}
});

// Schedule BMail checking
function setupBmailCheck(){
	showBmailUnread();
	if(localStorage.bmailcheck)
	{
	chrome.alarms.create("Check BMail",{periodInMinutes:parseInt(localStorage.scheduletime)})};
  
	chrome.alarms.onAlarm.addListener(function(alarm){
	if(alarm.name == "Check BMail")
	{
		showBmailUnread();
		console.log("Alarm works");
	}
	
  
 });
}

function bypassSafeConnect(){
	var requestFilter = {
		urls: [
			"<all_urls>"
		]
	};
	chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
		if (localStorage["safeConnect"] != "true"){
			return;
		}
		var headers = details.requestHeaders;
		userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.107 Safari/537.36";
		for(var i = 0, l = headers.length; i < l; ++i) {
			if( headers[i].name == 'User-Agent' ) {
				break;
			}
		}
		if(i < headers.length) {
			headers[i].value = userAgent;
		}
		return {requestHeaders: headers};
	}, requestFilter, ['requestHeaders','blocking']);

}
bypassSafeConnect();
setupBmailCheck();

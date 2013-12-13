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
	if(!localStorage.scheduletime)
	{
		localStorage.scheduletime = 5;
	};
});

// Schedule BMail checking
function SetUpAlerm(){
 chrome.alarms.create("Check BMail",{periodInMinutes:parseInt(localStorage.scheduletime)});
 });
 
 chrome.alarms.onAlarm.addListener(function(alarm){
 if(alarm.name == "Check BMail")
 {
	showBmailUnread();
 }
  
 });
}

window.onload=SetUpAlerm;

// BMail checking function
function showBmailUnread(){
		try{
			$.ajax({
			// Note: this is just a dirty test url.
			// The best practice is to read cookie and find out the correct account number
				url: "https://mail.google.com/mail/u/1/feed/atom",
				dataType: "xml",
				error: showError,
				success: showUnread
			});
		}
		catch (err){
			console.log(err.stack);
		}
	};

	function showUnread(data, status, jqXHR){
		unread = $(data).find("fullcount").first().text();
		if (unread > 0){
			$("button span.badge").text(unread); // add one space
			chrome.browserAction.setIcon({path: "Bucknell_16x16.png"});
			chrome.browserAction.setBadgeBackgroundColor({color:[208, 0, 24, 255]});
			chrome.browserAction.setBadgeText({
			text: unread != "0" ? unread : ""
		})};
	};

	function showError(){
		// Set the icon into not login.
		// You can also change to failed icon when cookie detection is failed.
		chrome.browserAction.setIcon({path:"Bucknell_16x16_Failed.png"});
		chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
		chrome.browserAction.setBadgeText({text:"?"});
		console.log('Ajax unsuccessful. You might want to log in to Bmail first.');
	};


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


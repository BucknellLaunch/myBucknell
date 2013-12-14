// Copyright (c) 2013 Kuree. Modified by Li Li
var url = "https://mail.google.com/mail/u/1/feed/atom";

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
	checkCookie();
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
	if(!localStorage.bmailcheck)
	{
		localStorage.bmailcheck = true;
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
function SetUpBmailCheck(){
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

window.onload=SetUpBmailCheck;

// BMail checking function
function showBmailUnread(){
	console.log(GetBmailURL());
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
		if (unread >= 0){
			//$("button span.badge").text(unread); // add one space No need here
			chrome.browserAction.setIcon({path: "img/Bucknell_16x16.png"});
			chrome.browserAction.setBadgeBackgroundColor({color:[208, 0, 24, 255]});
			chrome.browserAction.setBadgeText({
			text: unread != "0" ? unread : ""
			})};
		
	};

	function showError(){
		// Set the icon into not login.
		// You can also change to failed icon when cookie detection is failed.
		chrome.browserAction.setIcon({path:"img/Bucknell_16x16_Failed.png"});
		chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
		chrome.browserAction.setBadgeText({text:"?"});
		console.log('Ajax unsuccessful. You might want to log in to Bmail first.');
	};

	function checkCookie(){
	// check if the cookie exists
		chrome.cookies.getAll({name: "CASTGC"}, function(cookies){
			// if the cookie does not exist, promt the user to log in first.		
			if (cookies.length == 0){
				showError();
				chrome.tabs.create({url: "https://cas.bucknell.edu/cas/login"});
			}
		});
	}

	
	function GetBmailURL()
	{
		var url = "";
		var reg = /bucknell.edu/;
		chrome.cookies.getAll({name: "gmailchat"}, function(cookies){
		cookies.forEach(function(entry)
		{
			if(entry.value.match(reg))
			{
			url = "https://mail.google.com" + entry.path + "/feed/atom";
			}
		})
		
		})
		return url;
	};
	

chrome.extension.onMessage.addListener(function(request, sender, sendMessage) {
    if (request.method == "setUnread"){
	var unread = request.value;
	chrome.browserAction.setIcon({path: "img/Bucknell_16x16.png"});
			chrome.browserAction.setBadgeBackgroundColor({color:[208, 0, 24, 255]});
			chrome.browserAction.setBadgeText({
			text: unread != "0" ? unread : ""
			})
    }
    else{
    sendMessage({});} // snub them.
});




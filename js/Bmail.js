// BMail checking function
function showBmailUnread(){
	try{
		$.ajax({
			url: getBmailURL(),
			dataType: "json",
			error: showError,
			success: showUnread
		});
	}
	catch (err){
		console.log(err.stack);
	}
};

function showUnread(data, status, jqXHR){
	if (data.mail.length >= 0){
		chrome.browserAction.setIcon({path: "img/Bucknell_19x19.png"});
		chrome.browserAction.setBadgeBackgroundColor({color:[208, 0, 24, 255]});
		chrome.browserAction.setBadgeText({text: data.mail.length != 0 ? data.mail.length.toString() : ""});
	};
};

function showError(){
	// Set the icon into not login.
	// You can also change to failed icon when cookie detection is failed.
	chrome.browserAction.setIcon({path:"img/Bucknell_19x19_Failed.png"});
	chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
	chrome.browserAction.setBadgeText({text:"?"});
	console.log('Ajax unsuccessful. You might want to log in to Bmail first.');
};
	
function getBmailURL()
{
	return "https://portal-prd.bucknell.edu/mybucknell/servlet/BMail?type=mail";
};

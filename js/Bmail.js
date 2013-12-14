	// BMail checking function
	function showBmailUnread(){
		try{
			$.ajax({
			// Note: this is just a dirty test url.
			// The best practice is to read cookie and find out the correct account number
				url: "https://mail.google.com/mail/" + getBmailUserNumber() + "feed/atom",
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
			chrome.browserAction.setIcon({path: "img/Bucknell_16x16.png"});
			chrome.browserAction.setBadgeBackgroundColor({color:[208, 0, 24, 255]});
			chrome.browserAction.setBadgeText({text: unread != "0" ? unread : ""});
		};
		
	};

	function showError(){
		// Set the icon into not login.
		// You can also change to failed icon when cookie detection is failed.
		chrome.browserAction.setIcon({path:"img/Bucknell_16x16_Failed.png"});
		chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
		chrome.browserAction.setBadgeText({text:"?"});
		console.log('Ajax unsuccessful. You might want to log in to Bmail first.');
	};
	
	function GetBmailURL()
	{
		/*
		var url = "";
		var reg = /bucknell.edu/;
		chrome.cookies.getAll({name: "gmailchat"}, function(cookies){
		cookies.forEach(function(entry)
		{
			if(entry.value.match(reg))
			{
			return "https://mail.google.com" + entry.path + "/feed/atom";
			}
		})
		
		})
		//alert(url);
		return url;
		*/
		return "https://mail.google.com/mail/" + getBmailUserNumber()  + "feed/atom";
	};

	function getBmailUserNumber() {
		return ""; 
	};

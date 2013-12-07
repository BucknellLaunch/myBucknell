// Send message to background page to request saved data
chrome.extension.sendMessage({method: "getLocalStorage", key: "username"}, function(response) {
  localStorage["username"] = response.data;
});

chrome.extension.sendMessage({method: "getLocalStorage", key: "password"}, function(response) {
  localStorage["password"] = response.data;
});

var username = localStorage["username"];
var password = localStorage["password"];

// Test the save result and outcome in login page
if(username != undefined && password != undefined && username!== "" && password !== "")
{
	if(document.getElementById('status') == null)
	{
		document.getElementById('username').value = username;
		document.getElementById('password').value = password;
		document.getElementsByName('submit')[0].click();
	}
}
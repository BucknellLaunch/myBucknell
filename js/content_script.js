// Send the data back to background page
function SendText(v) {
	chrome.extension.sendMessage({method: "setUnread", value:v}, function(response) {});
}


function main(){
	// Add listener after the page is loaded
	// From my test some certain extension will conflict and throw an jquery.min.map error
	// Need to fix that
	$( document ).ready(function() {
    $(document).click(function()	// change event of that element doesn't work
	{
		var unread = $('a[href$="inbox"]').text();
		if(unread.indexOf("(") !== -1)	// Will move to regex for convenience 
		{
			unread = unread.replace("Inbox (", "");
			unread = unread.replace(")", "")
		}
		else
		{
			unread = "";
		}
		SendText(unread);
		
	});
});
};

main();

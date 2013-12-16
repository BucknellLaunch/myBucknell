$(function(){	
	function main(){
		$("#setting").click(function() {
			chrome.tabs.create({url: "options.html"});
		});

		// check if the cookie exists
		chrome.cookies.getAll({name: "CASTGC"}, function(cookies){
			// if the cookie does not exist, prompt the user to log in first.		
			if (cookies.length == 0){
				hideButtons();
				chrome.tabs.create({url: "https://cas.bucknell.edu/cas/login"});
			}
			else{
				showButtons();
				showBmailUnread();
			}
		});
	}

	function hideButtons(){
		$("#warning").show();
		$("#bmail").prop('disabled', true); 
		$("#myBucknell").prop('disabled', true);
		$("#library").prop('disabled', true);
		$("#moodle").prop('disabled', true);
		$("#innetwork").prop('disabled', true);
		showError();
	};

	function showButtons(){
		$("div#sign-in").addClass("hide");
		$('#settingtp').tooltip();
		$('#logouttp').tooltip();
		$("#bmail").click(function() {
			chrome.tabs.create({url: "http://mail.bucknell.edu"});
			localStorage["bmailcount"]++;
		});

		$("#myBucknell").click(function() {
		
			chrome.tabs.create({url: "http://my.bucknell.edu"});
			localStorage["mybucknellcount"]++;
		});
		$("#library").click(function() {
			chrome.tabs.create({url: "http://library.bucknell.edu/"});
			localStorage["librarycount"]++;
		});
		$("#moodle").click(function() {
			chrome.tabs.create({url: "http://moodle.bucknell.edu/"});
			localStorage["moodlecount"]++;
		});
		$("#innetwork").click(function() {
			chrome.tabs.create({url: "https://getinvolved.bucknell.edu/"});
			localStorage["innetworkcount"]++;
		});

		$("#log-out").click(function() {
			removeCookie();
			hideButtons();
		});

		$("#search").click(function() {
			var search = $("#searchtext").val().replace(" ", "+");
	
			var link = "https://google.bucknell.edu/search?q=" 
				 + search 
				 +"&x=-978&y=-107&client=default_frontend&output=xml_no_dtd&proxystylesheet=default_frontend&sort=date%3AD%3AL%3Ad1&entqr=3&entsp=a&oe=UTF-8&ie=UTF-8&ud=1";
			  	chrome.tabs.create({url: link});
		});

		$('#searchtext').keypress(function(e){
			if(e.keyCode==13)
			$('#search').click();
		});

		// suppress the default one I don't why it will fire the first button
	$(document).keypress(function(event){
			if (event.which == '13') {
				event.preventDefault();
			}
		});
	};

	function removeCookie(){
		chrome.cookies.getAll({name: "CASTGC"}, function(cookies){
			// remove cookie from cas
			chrome.cookies.remove({url: "https://cas.bucknell.edu/cas/login", name: "CASTGC"}, function(d){
				console.log(d);
			});
			// remove cookie from Moodle
			chrome.cookies.remove({url: "https://moodle.bucknell.edu", name: "MoodleSession"}, function(d){
				console.log(d);
			});
			// perhaps also need to romove cookie from myBucknell and inNetwork
		});
	};

	main();
});







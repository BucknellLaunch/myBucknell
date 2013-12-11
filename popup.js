$(function(){	

	/* Not able to post request. There is one field that keeps changing every time, and we have not way to know that the value of that field should be. Therefore, we just need to ask the user to log in if there is no cookies, and log in automacally if there are cookies.
	function fakePost(url) {   
	    var form = document.createElement("form");
	    form.setAttribute("method", "post");
	    form.setAttribute("action", url);
	    var params = {username:'ll024', password: "", lt: 'e10s1', _eventId: "submit"};
	    for(var key in params) {
		var field = document.createElement("input");
		field.setAttribute("id", key);
		field.setAttribute("name", key);
		field.setAttribute("value", params[key]);
		form.appendChild(field);
	    }
	    document.body.appendChild(form);
	    form.submit();
	}
	*/
	
	fakePostCode = fakePost.toString().replace(/(\n|\t)/gm,'');

	$("#myBucknell").click(function() {
	    //chrome.tabs.create({url: "javascript: " + fakePostCode+"fakePost('https://cas.bucknell.edu/cas/login');"});
		//localStorage["mybucknellcount"]++;
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

	$("#search").click(function() {
		var search = $("#searchtext").val().replace(" ", "+");
	
		var link = "https://google.bucknell.edu/search?q=" 
			 + search 
			 +"&x=-978&y=-107&client=default_frontend&output=xml_no_dtd&proxystylesheet=default_frontend&sort=date%3AD%3AL%3Ad1&entqr=3&entsp=a&oe=UTF-8&ie=UTF-8&ud=1";
	    	chrome.tabs.create({url: link});
	});

	$("#setting").click(function() {
		chrome.tabs.create({url: "options.html"});
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
});





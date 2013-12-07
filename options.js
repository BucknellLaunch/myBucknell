// Save the data
document.getElementById("save").addEventListener('click', function() {
var data1 = document.getElementById("username").value; //Pull text from user inputbox
localStorage["username"] = data1;
var data2 = document.getElementById("pswrd").value; //Pull text from user inputbox
localStorage["password"] = data2;
window.confirm("UserName and password have been saved");
window.close();
});

// Clear the saved data
document.getElementById("clear").addEventListener('click', function() {
    localStorage.removeItem("username");
	localStorage.removeItem("password");
	window.confirm("UserName and password have been cleared");
	window.close();
});
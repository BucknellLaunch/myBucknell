// Save the data
document.getElementById("save").addEventListener('click', function() {
var data1 = document.getElementById("username").value; //Pull text from user inputbox
var regStu = /[a-z]{2,}\d\d\d/;
if(regStu.test(data1))
{
localStorage["username"] = data1;
var data2 = document.getElementById("pswrd").value; //Pull text from user inputbox
localStorage["password"] = data2;
alert("UserName and password have been saved");
window.close();
}
else
{
document.getElementById("warning").style.display = "";

}});

// Clear the saved data
document.getElementById("clear").addEventListener('click', function() {
    localStorage.removeItem("username");
	localStorage.removeItem("password");
	alert("UserName and password have been cleared");
	window.close();
});


// Load count;
window.onload=function()
{	
document.getElementById("logincount").innerHTML = localStorage["logincount"];
document.getElementById("mybucknellcount").innerHTML = localStorage["mybucknellcount"];
document.getElementById("librarycount").innerHTML = localStorage["librarycount"];
document.getElementById("moodlecount").innerHTML = localStorage["moodlecount"];
document.getElementById("innetworkcount").innerHTML = localStorage["innetworkcount"];
};

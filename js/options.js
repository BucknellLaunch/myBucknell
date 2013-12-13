var sliderVal = localStorage.scheduletime;
window.onload=function()
{
document.getElementById("mybucknellcount").innerHTML = localStorage["mybucknellcount"];
document.getElementById("librarycount").innerHTML = localStorage["librarycount"];
document.getElementById("moodlecount").innerHTML = localStorage["moodlecount"];
document.getElementById("innetworkcount").innerHTML = localStorage["innetworkcount"];
//document.getElementById("enablebmail").checked = localStorage.bmailcheck



$('#rangeSlider').slider().on('slide', function (ev) {
	if(ev.value >0){
            sliderVal = ev.value;
			localStorage.scheduletime = ev.value;
			document.getElementById("minutes").innerHTML = ev.value + " Minutes";
			localStorage.bmailcheck = true;
			}
			else 
			{
				localStorage.bmailcheck = false;
				document.getElementById("minutes").innerHTML = "Background checking disabled";
			}
        });
		
        if (sliderVal) {
            $('#rangeSlider').slider('setValue', sliderVal);
			document.getElementById("minutes").innerHTML = sliderVal + " Minutes";
        }

};


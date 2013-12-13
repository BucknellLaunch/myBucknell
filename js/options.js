var sliderVal = localStorage.scheduletime;
// Load count;
window.onload=function()
{
document.getElementById("mybucknellcount").innerHTML = localStorage["mybucknellcount"];
document.getElementById("librarycount").innerHTML = localStorage["librarycount"];
document.getElementById("moodlecount").innerHTML = localStorage["moodlecount"];
document.getElementById("innetworkcount").innerHTML = localStorage["innetworkcount"];



$('#rangeSlider').slider().on('slide', function (ev) {
            sliderVal = ev.value;
			localStorage.scheduletime = ev.value;
        });
        if (sliderVal) {
            $('#rangeSlider').slider('setValue', sliderVal);
			
        }

};

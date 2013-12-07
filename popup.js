document.getElementById("myBucknell").addEventListener('click', function() {
    chrome.tabs.create({url: "https://portal-prd.bucknell.edu/sso"});
});
document.getElementById("library").addEventListener('click', function() {
    chrome.tabs.create({url: "http://library.bucknell.edu/"});
});
document.getElementById("moodle").addEventListener('click', function() {
    chrome.tabs.create({url: "http://moodle.bucknell.edu/"});
});
document.getElementById("innetwork").addEventListener('click', function() {
    chrome.tabs.create({url: "https://getinvolved.bucknell.edu/"});
});
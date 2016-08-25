document.addEventListener('DOMContentLoaded', function() {
    // document.getElementById('refresh').addEventListener('click', function() {
    //     chrome.extension.getBackgroundPage().updateSetting(url, username, authURL, password);
    // }, false);
    document.getElementById('auth').addEventListener('click', function() {
        chrome.extension.getBackgroundPage().fetchToken();
    }, false);
}, false);
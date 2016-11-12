
var urlPatterns;
var authUrl;
var userName;
var password;
var token;
var fixedToken;

function fetchToken() {
    var xhr = new XMLHttpRequest();   // new HttpRequest instance
    xhr.open("POST", authUrl);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader("X-APPDOMAINID", "17");

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            parsed = JSON.parse(xhr.responseText);
            token = {
                access_token: parsed.access_token,
                refresh_token: parsed.refresh_token
            }
        }
    };

    xhr.send(JSON.stringify({email: userName, password: password}));
}

function init() {
    console.log('Init');
    chrome.storage.sync.get({
        url: '<unknown>',
        username: '<unknown>',
        password: '<unknown>',
        authURL: '<unknown>'

    }, function(items) {
        console.log('Loaded settings', items);
        urlPatterns = items.url;
        userName = items.username;
        authUrl = items.authURL;
        password = items.password;
        fetchToken();
    });
}

function updateSetting(url_pattern, user_name, auth_url, pass_word) {
    urlPatterns = url_pattern;
    authUrl = auth_url;
    userName = user_name;
    password = pass_word;
    fetchToken();
}


chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
    if (token && urlPatterns) {
        var urlPatternsArray =  urlPatterns.split("\n")
        var match = false;
        for (i = 0; i < urlPatternsArray.length; i++) {
            if (details.url.startsWith(urlPatternsArray[i])) {
                match = true;
                break;
            }
        }
        if (match) {
            console.log("Setting Authorization Header.");
            details.requestHeaders.push({
                name: "X-Zalando-Auth",
                value: window.btoa(JSON.stringify(token)).replace(/=*$/g, '')
            });
        }
    }
    return {requestHeaders: details.requestHeaders};
},
{"urls":["*://*/*"]},
["requestHeaders", "blocking"]);

chrome.webRequest.onCompleted.addListener(function(details) {
    if (details.statusCode === 401) {
        chrome.notifications.create('failed', {
            type: 'basic',
            iconUrl: 'auth.png',
            title: 'Authentication Failed',
            message: 'Invalid login details, please check service url and credentials'
        });
    }
}, {"urls":["*://*/*"]});

chrome.alarms.onAlarm.addListener(function(alarm){
    fetchToken();
});
chrome.alarms.create("refresh_token", {periodInMinutes: 30});

chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);
});

init();

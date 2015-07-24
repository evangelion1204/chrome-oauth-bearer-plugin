chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
    var urlPattern = getUrlPattern();
    if (details.url.match(urlPattern)) {
        console.log("URL:" + details.url);
        console.log("Pattern:" + urlPattern);
    //    var token = getToken();
    //    console.log("Token: " + token);
        console.log("Daniel");
        console.log(details.url)
        details.requestHeaders.push({name:"Authorization",value:"Bearer db38f2ad-4127-4226-afd6-ea57a05719ed"});
    }

    return {requestHeaders: details.requestHeaders};
},
{"urls":["*://*/*"]},
["requestHeaders", "blocking"]);


function getUrlPattern() {
    var urlPattern;

    chrome.storage.sync.get({
        url: 'red'
    }, function(items) {
        urlPattern = items.url;
    });
    return urlPattern;
}

function getToken() {
    var token;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://token.auth.zalando.com/access_token', true, 'dnowak', '');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            console.log(xhr.responseText);
            token = xhr.responseText;
        }
    }
    xhr.send(null);
    return token;
}

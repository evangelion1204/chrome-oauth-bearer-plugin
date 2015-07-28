function save_options() {
    var url = document.getElementById('url').value;
    var authURL = document.getElementById('authURL').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;
    chrome.storage.sync.set({
        url: url,
        username: username,
        authURL: authURL,
        password: password
    }, function() {
        console.log("Saved Options");
    });
    chrome.extension.getBackgroundPage().updateSetting(url, username, authURL, password);
    return false;
}

function restore_options() {
  chrome.storage.sync.get({
        url: '<url>\n<url>',
        username: '<unknown>',
        password: '<unknown>',
        authURL: '<unknown>'
  }, function(items) {
    document.getElementById('url').value = items.url;
    document.getElementById('username').value = items.username;
    document.getElementById('password').value = items.password;
    document.getElementById('authURL').value = items.authURL;
  });
}

document.getElementById('save').addEventListener('click', save_options);
restore_options();

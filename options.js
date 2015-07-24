$(document).ready(
    function() {
        document.getElementById('save').addEventListener('click', save_options);
        restore_options();
    }
)

function save_options() {
    var url = document.getElementById('url').value;
    chrome.storage.sync.set({
        url: url
    }, function() {
        console.log("Saved Options");
    });
}

function restore_options() {
  chrome.storage.sync.get({
    url: 'red'
  }, function(items) {
    document.getElementById('url').value = items.url;
  });
}



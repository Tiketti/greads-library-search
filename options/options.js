function saveOptions() {
  var helsinki = document.getElementById('helsinki').checked;
	var tampere = document.getElementById('tampere').checked;
	
  chrome.storage.sync.set({
    helsinki,
    tampere
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
		}, 1000 * 3);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
		helsinki: true,
		tampere: false
  }, function(items) {
    document.getElementById('helsinki').checked = items.helsinki;
    document.getElementById('tampere').checked = items.tampere;
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click',
    saveOptions);
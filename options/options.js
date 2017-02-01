function saveOptions () {
  var helsinki = document.getElementById('helsinki').checked;
	var tampere = document.getElementById('tampere').checked;
	
  chrome.storage.sync.set({
    helsinki,
    tampere
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
		}, 1000 * 3);
  });
}

function restoreOptions() {
	getSelectedLibraries(function (items) {
    document.getElementById('helsinki').checked = items.helsinki;
    document.getElementById('tampere').checked = items.tampere;
	});
}

function getSelectedLibraries(callback) {
  chrome.storage.sync.get({
		helsinki: true,
		tampere: false
	}, function (items) {
		callback(items);
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
var saveButton = document.getElementById('saveGreadsOptions');
if (saveButton) {
	saveButton.addEventListener('click', saveOptions);
}
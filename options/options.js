function saveOptions () {
  var helsinki = document.getElementById('helsinki').checked;
  var tampere = document.getElementById('tampere').checked;
  var helsinkiOverdrive = document.getElementById('helsinkiOverdrive').checked;
	
  chrome.storage.sync.set({
    helsinki,
    tampere,
    helsinkiOverdrive,
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
    document.getElementById('helsinkiOverdrive').checked = items.helsinkiOverdrive;
	});
}

function getSelectedLibraries(callback) {
  chrome.storage.sync.get({
		helsinki: true,
    tampere: false,
    helsinkiOverdrive: false,
	}, function (items) {
		callback(items);
  });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
var saveButton = document.getElementById('saveGreadsOptions');
if (saveButton) {
	saveButton.addEventListener('click', saveOptions);
}
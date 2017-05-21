const saveOptions = () => {
  const helsinki = document.getElementById('helsinki').checked;
  const tampere = document.getElementById('tampere').checked;
  const helsinkiOverdrive = document.getElementById('helsinkiOverdrive').checked;
	
  chrome.storage.sync.set({
    helsinki,
    tampere,
    helsinkiOverdrive,
  }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 1000 * 3);
  });
};

const getSelectedLibraries = () => (
  new Promise((resolve) => {
    chrome.storage.sync.get({
      helsinki: true,
      tampere: false,
      helsinkiOverdrive: false,
    }, (items) => {
      resolve(items);
    });
  })
);  

const restoreOptions = () => {
  getSelectedLibraries().then((items) => {
    document.getElementById('helsinki').checked = items.helsinki;
    document.getElementById('tampere').checked = items.tampere;
    document.getElementById('helsinkiOverdrive').checked = items.helsinkiOverdrive;
  });
};

document.addEventListener("DOMContentLoaded", restoreOptions);
const saveButton = document.getElementById('saveGreadsOptions');
if (saveButton) {
  saveButton.addEventListener('click', saveOptions);
}
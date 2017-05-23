describe('Options', () => {
  let dummyCheckbox;
  const response = {
    helsinki: true,
    tampere: true,
    helsinkiOverdrive: false,
  };

  beforeEach((done) => {
    window.chrome = {
      storage: {
        sync: {
          get: (({}, callback) => (callback(response))),
        },
      },
    };
    spyOn(chrome.storage.sync, 'get').and.callFake(({}, callback) => {
      callback(response);
    });

    dummyCheckbox = document.createElement('input');
    dummyCheckbox.type = 'checkbox';
    dummyCheckbox.checked = jasmine.createSpy('checked');

    document.getElementById = jasmine.createSpy('HTMLElement')
      .and.returnValue(dummyCheckbox);

    document.dispatchEvent(new Event('DOMContentLoaded'));

    // HACK: Dispatching event immediately triggers
    // restoreOptions() - wait while it finishes.
    // To be found a better way
    setTimeout(
      done,
      500
    );
  });

  describe('initialization', () => {
    it('should call chrome.storage.sync.get()', () => {
      expect(chrome.storage.sync.get).toHaveBeenCalled();
    });

    it('should find checkbox of every library', () => {
      expect(document.getElementById.calls.count()).toEqual(3);
    });

  });
});
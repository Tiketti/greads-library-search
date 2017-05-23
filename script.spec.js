xdescribe('Script', () => {

  beforeEach(() => {
    const response = {
      helsinki: true,
      tampere: true,
      helsinkiOverdrive: false,
    };

    window.chrome = {
      storage: {
        sync: {
          get: () => (response),
        },
      },
    };

    spyOn(window, 'location').and.returnValue(() => 'https://www.goodreads.com/book/show/28220901-exile-on-front-street');
    spyOn(chrome.storage.sync, 'get').and.returnValue(() => response);
    jasmine.createSpyObj('Object', [
      'keys',
      'values',
    ]
    );

    // document.removeEventListener('DOMContentLoaded');
  });

  describe('Initialization', () => {
    it('2 + 2 should equal 4', () => {
      expect(2 + 2).toEqual(4);
    });
  });
});
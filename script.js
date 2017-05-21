const _libraries = {
  helsinki: {
    baseLink: 'http://haku.helmet.fi/iii/encore/search/C__S{0}%20{1}__Ff:facetmediatype:1:1:Kirja::__Orightresult__U__X0',
    linkTitle: '[Search Helmet for this book]',
  },
  tampere: {
    baseLink: 'https://piki.verkkokirjasto.fi/web/arena/search?p_auth=jHgv3Osu&p_p_id=searchResult_WAR_arenaportlets&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&p_r_p_687834046_facet_queries=mediaClass_facet%3Dbook&p_r_p_687834046_search_type=solr&p_r_p_687834046_search_query={0}+{1}',
    linkTitle: '[Search Piki for this book]',
  },
  helsinkiOverdrive: {
    baseLink: 'https://helmet.overdrive.com/search?query={0}+{1}',
    linkTitle: '[Search Helmet Overdrive for this book]',
  },
};
const _selectedLibraries = [];

const createLinkElement = (libraryKey, author, title) => {
  const removables = /[()*]/g;
  const replaceables = /[]/g;

  const sanitizedTitle = title.replace(removables, '').replace(replaceables, '+');
  const sanitizedAuthor = author.replace(removables, '').replace(replaceables, '+');

  const searchUri = _libraries[libraryKey].baseLink
    .replace('{0}', sanitizedAuthor)
    .replace('{1}', sanitizedTitle);

  const link = document.createElement('a');
  link.setAttribute('href', searchUri);
  link.setAttribute('style', 'font-size: x-small; color:red; margin-left: 5px;');
  link.innerHTML = _libraries[libraryKey].linkTitle;

  return link;
};

// single book view
const singleView = () => {
  const titleElement = document.getElementById('bookTitle');
  const authorNames = Array.from(
    document.querySelectorAll('.authorName > span'))
    .map((author) => author.innerText)
    .toString();

  const bookTitle = titleElement.innerText;

  _selectedLibraries.forEach(libraryKey => {
    const linkElement = createLinkElement(libraryKey, authorNames, bookTitle);
    titleElement.appendChild(linkElement);
  });
};  

// list view
const listView = () => {
  const bookElements = Array.from(document.querySelectorAll('#booksBody > tr.bookalike'));
  bookElements.forEach((bookElement) => {
    _selectedLibraries.forEach(libraryKey => {
      const titleElement = bookElement.querySelector('.title > .value');
      const bookTitle = titleElement.innerText;
      const author = bookElement.querySelector('.author > .value').innerText;

      const linkElement = createLinkElement(libraryKey, author, bookTitle);
      titleElement.appendChild(linkElement);
    });
  });
};

const page = window.location.toString();

// defined in options/options.js, included by extension framework
// eslint-disable-next-line no-undef
getSelectedLibraries().then((libraries) => {
  Object.keys(libraries).forEach((key, index) => {
    if (Object.values(libraries)[index]) {
      _selectedLibraries.push(key);
    }
  });

  if (page.indexOf('/book/show') > 0) {
    singleView();  
  }

  if (page.indexOf('/review/list') > 0) {
    listView();
  }
});

const libraries = {
  helsinki: {
    baseLink: 'http://haku.helmet.fi/iii/encore/search/C__S{0}%20{1}__Ff:facetmediatype:1:1:Kirja::__Orightresult__U__X0',
    linkTitle: '[Search Helmet for this book]',
  },
  tampere: {
    baseLink: 'https://piki.verkkokirjasto.fi/web/arena/search?p_auth=jHgv3Osu&p_p_id=searchResult_WAR_arenaportlets&p_p_lifecycle=1&p_p_state=normal&p_p_mode=view&p_r_p_687834046_facet_queries=mediaClass_facet%3Dbook&p_r_p_687834046_search_type=solr&p_r_p_687834046_search_query={0}+{1}',
    linkTitle: '[Search Piki for this book]',
  },
};
const _selectedLibrary = 'helsinki';

function createLinkElement(author, title) {
  const removables = /[()*]/g;
  const replaceables = /[]/g;

  const sanitizedTitle = title.replace(removables, '').replace(replaceables, '+');
  const sanitizedAuthor = author.replace(removables, '').replace(replaceables, '+');

  const searchUri = libraries[_selectedLibrary].baseLink
    .replace('{0}', sanitizedAuthor)
    .replace('{1}', sanitizedTitle);

  let link = document.createElement('a');
  link.setAttribute('href', searchUri);
  link.setAttribute('style', 'font-size: x-small; color:red;');
  link.innerHTML = libraries[_selectedLibrary].linkTitle;

  return link;
}

// single book view
function singleView() {
  const titleElement = document.getElementById('bookTitle');
  const authorNames = Array.from(
    document.querySelectorAll('.authorName > span'))
    .map((author) => author.innerText)
    .toString();

  const bookTitle = titleElement.innerText;
  const linkButton = createLinkElement(authorNames, bookTitle); 

  const brElement = document.createElement('br');
  titleElement.appendChild(brElement);
  titleElement.appendChild(linkButton);
}  

// list view
function listView() {
  var bookElements = Array.from(document.querySelectorAll('#booksBody > tr.bookalike'));
  bookElements.forEach((bookElement) => {
    const titleElement = bookElement.querySelector('.title > .value');
    const bookTitle = titleElement.innerText;
    const author = bookElement.querySelector('.author > .value').innerText;

    const brElement = document.createElement('br');
    const linkElement = createLinkElement(author, bookTitle);

    titleElement.appendChild(brElement);
    titleElement.appendChild(linkElement);
  });
}

const page = window.location.toString();
if (page.indexOf('/book/show') > 0) {
  singleView();
}

if (page.indexOf('/review/list') > 0) {
  listView();
}
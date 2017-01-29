const _baseLink = 'http://haku.helmet.fi/iii/encore/search/C__S{0}%20{1}__Ff:facetmediatype:1:1:Kirja::__Orightresult__U__X0';
const _buttonTitle = '[Search Helmet for this book]';

function createLinkElement(author, title) {
  const replacables = /[()*]/g;
  const sanitizedTitle = title.replace(replacables, '');
  const sanitizedAuthor = author.replace(replacables, '');

  const searchUri = _baseLink
    .replace('{0}', sanitizedAuthor)
    .replace('{1}', sanitizedTitle);

  let link = document.createElement('a');
  link.setAttribute('href', searchUri);
  link.setAttribute('style', 'font-size: x-small; color:red;');
  link.innerHTML = _buttonTitle;

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
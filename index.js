function getLibraryFromLocalStorage() {
  let myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  if (!myLibrary) {
    myLibrary = [];
  }
  return myLibrary;
}

const myLibrary = getLibraryFromLocalStorage();

function setLibraryOnLocalStorage(myLibrary) {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function Book(title, author, NPages, finished) {
  const book = {};
  book.title = title;
  book.author = author;
  book.n_pages = NPages;
  book.finished = finished;
  return book;
}

function resetForm() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('n_pages').value = '';
  document.getElementById('finished').checked = false;
}

function ToggleNoBooks(myLibrary) {
  if (myLibrary.length === 0) {
    document.getElementById('no-books').style.display = 'block';
  } else {
    document.getElementById('no-books').style.display = 'none';
  }
}

// eslint-disable-next-line no-unused-vars
function deleteEntry(bookId) {
  myLibrary.splice(bookId, 1);
  document.getElementById(`book-${bookId}`).remove();
  setLibraryOnLocalStorage(myLibrary);
  ToggleNoBooks(myLibrary);
}

function DisplayBook({
  title, author, NPages, finished,
}) {
  const title_tag = `<div>${title} </div>`;
  const author_tag = `<div>${author} </div>`;
  const NPages_tag = `<div>${NPages} </div>`;
  const finished_tag = `<div>${finished} </div>`;
  const id = myLibrary.length - 1;
  const button = `<button onClick=deleteEntry(${id})> Delete Entry </button>`;
  document.getElementById('tbody').innerHTML
    += `
    <div class="book-entry" id=book-${id}>
      ${title_tag}
      ${author_tag}
      ${NPages_tag}
      ${finished_tag}
      ${button}
    </div>`;
}


function AddBookToLibrary(myLibrary) {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const NPages = document.getElementById('n_pages').value;
  const finished = document.getElementById('finished').checked;
  const book = Book(title, author, NPages, finished, author, NPages, finished);
  myLibrary.push(book);
  setLibraryOnLocalStorage(myLibrary);
  resetForm();
  ToggleNoBooks(myLibrary);
  DisplayBook({ ...book });
}

function DisplayAllBooks(myLibrary) {
  myLibrary.forEach(DisplayBook);
  ToggleNoBooks(myLibrary);
}

function HideForm() {
  document.getElementById('book-form').style.display = 'none';
}

function ShowFormListener() {
  document.getElementById('showFormBtn').addEventListener('click', () => {
    document.getElementById('book-form').style.display = 'flex';
  });
}

function BookToLibraryListener() {
  document.getElementById('AddBookToLibrary').addEventListener('click', () => {
    AddBookToLibrary(myLibrary);
    HideForm();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  ShowFormListener();
  BookToLibraryListener();
  DisplayAllBooks(myLibrary);
});

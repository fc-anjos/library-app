const myLibrary = [];

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


function DisplayBook(book) {
  document.getElementById('booksContainer').innerHTML
    += `Title: ${book.title}<br>
    Author : ${book.author}<br>
    Number of Pages: ${book.n_pages}<br>
    Finished?: ${book.finished}<br>`;
}

function AddBookToLibrary() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const NPages = document.getElementById('n_pages').value;
  const finished = document.getElementById('finished').checked;
  const book = Book(title, author, NPages, finished, author, NPages, finished);
  myLibrary.push(book);
  resetForm();
  DisplayBook(book);
}


function DisplayAllBooks() {
  myLibrary.forEach(DisplayBook);
}

function HideFormListener() {
  document.getElementById('hideFormBtn').addEventListener('click', () => {
    document.getElementById('form-container').style.display = 'none';
  });
}

function ShowFormListener() {
  document.getElementById('showFormBtn').addEventListener('click', () => {
    document.getElementById('form-container').style.display = 'block';
  });
}


function BookToLibraryListener() {
  document.getElementById('AddBookToLibrary').addEventListener('click', () => {
    AddBookToLibrary();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  HideFormListener();
  ShowFormListener();
  BookToLibraryListener()();
  DisplayAllBooks();
});

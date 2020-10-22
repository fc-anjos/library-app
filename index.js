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

function deleteEntry(bookId) {
  myLibrary.splice(bookId, 1);
  document.getElementById(`book-${bookId}`).remove();
  ToggleNoBooks();
}

function DisplayBook(book) {
  const title = `<div>${book.title} </div>`;
  const author = `<div>${book.author} </div>`;
  const NPages = `<div>${book.n_pages} </div>`;
  const finished = `<div>${book.finished} </div>`;
  const id = myLibrary.length - 1;
  const button = `<button onClick=deleteEntry(${id})> Delete Entry </button>`;
  document.getElementById('tbody').innerHTML
    += `
    <div class="book-entry" id=book-${id}>
      ${title}
      ${author}
      ${NPages}
      ${finished}
      ${button}
    </div>`;
}

function AddBookToLibrary() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const NPages = document.getElementById('n_pages').value;
  const finished = document.getElementById('finished').checked;
  const book = Book(title, author, NPages, finished, author, NPages, finished);
  myLibrary.push(book);
  resetForm();
  ToggleNoBooks();
  DisplayBook(book);
}


function DisplayAllBooks() {
  myLibrary.forEach(DisplayBook);
  ToggleNoBooks();
}

function ToggleNoBooks() {
  if (myLibrary.length === 0) {
    document.getElementById('no-books').style.display = 'block';
  } else {
    document.getElementById('no-books').style.display = 'none';
  }
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
    AddBookToLibrary();
    HideForm();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  ShowFormListener();
  BookToLibraryListener();
  DisplayAllBooks();
});

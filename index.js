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

class Book {
  constructor(title, author, NPages, finished) {
    this.title = title;
    this.author = author;
    this.NPages = NPages;
    this.finished = finished;
  }
}

function resetForm() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('NPages').value = '';
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

function ToggleReadMessage(bookId) {
  const message = myLibrary[bookId].finished ? 'Mark as unread' : 'Mark as read';
  document.getElementById(`finished-toggle-${bookId}`).innerHTML = message;
}

// eslint-disable-next-line no-unused-vars
function ToggleRead(bookId) {
  myLibrary[bookId].finished = !myLibrary[bookId].finished;
  setLibraryOnLocalStorage(myLibrary);
  ToggleReadMessage(bookId);
}


function DisplayBook({
  title, author, NPages,
}) {
  const id = myLibrary.length - 1;
  const deleteBtn = `<button class="entryBtn" onClick=deleteEntry(${id})> Delete Entry
                      </button>`;
  const toggleReadBtn = `<button class="entryBtn" onClick=ToggleRead(${id}) id="finished-toggle-${id}"></button>`;
  const titleTag = `<div class="entryText">${title} </div>`;
  const authorTag = `<div class="entryText">${author} </div>`;
  const NPagesTag = `<div class="entryText">${NPages} </div>`;
  const finishedTag = `<div>${toggleReadBtn}</div>`;
  const deleteTag = `<div>${deleteBtn}</div>`;
  document.getElementById('tbody').innerHTML
    += `
    <div class="book-entry" id=book-${id}>
      ${titleTag}
      ${authorTag}
      ${NPagesTag}
      ${finishedTag}
      ${deleteTag}
    </div>`;
  ToggleReadMessage(id);
}

function AddBookToLibrary(myLibrary) {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const NPages = document.getElementById('NPages').value;
  const finished = document.getElementById('finished').checked;
  const book = new Book(title, author, NPages, finished);
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

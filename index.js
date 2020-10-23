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
  book.NPages = NPages;
  book.finished = finished;
  return book;
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

function ToggleRead(bookId) {
  myLibrary[bookId].finished = !myLibrary[bookId].finished;
  document.getElementById(`finished-${bookId}`).innerHTML = myLibrary[bookId].finished;
  setLibraryOnLocalStorage(myLibrary);
}

function DisplayBook({
  title, author, NPages, finished,
}) {
  const id = myLibrary.length - 1;
  const deleteBtn = `<div class="entryField deleteContainer">
                      <button class="deleteEntry entryBtn"
                      onClick=deleteEntry(${id})>
                        Delete Entry
                      </button>
                    </div>`;
  const toggleReadBtn = `<button class="toggleRead entryBtn" onClick=ToggleRead(${id})> Mark as read </button>`;

  const titleTag = `<div class="entryText entryField">${title} </div>`;
  const authorTag = `<div class="entryText entryField">${author} </div>`;
  const NPagesTag = `<div class="entryText entryField">${NPages} </div>`;
  const finishedTag = `<div class="finishedContainer entryField">
                          <span id="finished-${id}">${finished}</span>
                          ${toggleReadBtn}
                       </div>`;
  document.getElementById('tbody').innerHTML
    += `
    <div class="book-entry" id=book-${id}>
      ${titleTag}
      ${authorTag}
      ${NPagesTag}
      ${finishedTag}
      ${deleteBtn}
    </div>`;
}


function AddBookToLibrary(myLibrary) {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const NPages = document.getElementById('NPages').value;
  const finished = document.getElementById('finished').checked;
  const book = Book(title, author, NPages, finished);
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

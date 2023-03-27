import { Book } from './modules/Book.js';
import { UI } from './modules/UI.js';
import { Store } from './modules/Store.js';

document.addEventListener('DOMContentLoaded', () => {
  Store.displayBooks();
});

const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
  const author = document.getElementById('author').value;
  const title = document.getElementById('book').value;
  const book = new Book(author, title);
  const ui = new UI();
  if (author === '' || title === '') {
    return;
  }
  ui.addBookToTheList(book);
  Store.addBook(book);
  ui.clearFieldsInputs();
  event.preventDefault();
});

document.getElementById('tbody-container').addEventListener('click', (e) => {
  // eslint-disable-next-line no-unused-vars
  const ui = new UI();
  Store.removeBook(e.target);
  e.preventDefault();
});

const formSection = document.getElementById('add-book-section');
const listSection = document.getElementById('table-books');
const contactSection = document.getElementById('contact');
const linkList = document.getElementById('listLink');
const linkForm = document.getElementById('formLink');
const linkContact = document.getElementById('contactLink');

const displayList = () => {
  listSection.classList.remove('hidden');
  formSection.classList.add('hidden');
  contactSection.classList.add('hidden');
};

const displayForm = () => {
  formSection.classList.remove('hidden');
  listSection.classList.add('hidden');
  contactSection.classList.add('hidden');
};

const displayContact = () => {
  contactSection.classList.remove('hidden');
  listSection.classList.add('hidden');
  formSection.classList.add('hidden');
};

linkList.addEventListener('click', (event) => {
  event.preventDefault();
  displayList();
});

linkForm.addEventListener('click', (event) => {
  event.preventDefault();
  displayForm();
});

linkContact.addEventListener('click', (event) => {
  event.preventDefault();
  displayContact();
});

const span = document.getElementById('date');
const date = new Date();
span.innerHTML = date;

const displayPage = (currentPage) => {
  const sections = document.querySelectorAll('section');
  // eslint-disable-next-line no-restricted-syntax
  for (const section of sections) {
    if (section.id === currentPage) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  }
};

const getCurrentPage = () => {
  const currentPage = localStorage.getItem('currentPage');
  if (currentPage) {
    return currentPage;
  }
  return 'add-book-section';
};

const handleLinkClick = (event) => {
  event.preventDefault();
  const currentPage = event.target.getAttribute('href').substring(1);
  localStorage.setItem('currentPage', currentPage);
  displayPage(currentPage);
};

const displayCurrentPage = () => {
  const currentPage = getCurrentPage();
  displayPage(currentPage);
};

const links = document.querySelectorAll('a');
links.forEach((link) => {
  link.addEventListener('click', handleLinkClick);
});

window.addEventListener('load', displayCurrentPage);

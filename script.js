const addBookBtn = document.getElementById('new-book-btn');
const newBookForm = document.getElementById('new-book');
const cardContainer = document.getElementById('card-container');
const dialogModal = document.querySelector('dialog');
let cardId = 0;
let i = 0;

let myLibrary = [];
let copyMyLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//Changes the read property of a book object at the 'click' of a button//
Book.prototype.haveRead = function (e) {
  e.addEventListener('click', () => {
    if (this.read === 'No') {
      e.innerText = 'Read? Yes';
      this.read = 'Yes';
      console.log(this.info());
    } else {
      e.innerText = 'Read? No';
      this.read = 'No';
      console.log(this.info());
    }
  })
}

//Method that returns information entered on book objects when called//
Book.prototype.info = function () {
  if (this.read === 'No') {
    return `"${this.title}" by ${this.author}, published in ${this.pages} and I have yet to read this.`
  } else {
    return `"${this.title}" by ${this.author}, published in ${this.pages} and I have read this.`
  }
};

//This take user input and stores new book objects into an array//
function addBookToLibrary(newBook) {
  myLibrary.push(newBook)
};

//This function renders books from an array to displayable cards on the UI//
function displayBook(arrOfObjs) {
  cardId++
  //loops through array, creates cards and content elements for each index of the array//
  arrOfObjs.forEach(element => {
    const card = document.createElement("table");
    card.setAttribute('id', cardId - 1);
    card.setAttribute('class', 'card');
    cardContainer.appendChild(card);
    const cardHeader = document.createElement("thead");
    card.appendChild(cardHeader);
    const cardTitle = document.createElement("h3");
    cardTitle.setAttribute('class', 'card-title');
    cardHeader.appendChild(cardTitle);
    const cardContent = document.createElement("tbody");
    cardContent.setAttribute('class', 'card-content');
    card.appendChild(cardContent);
    const cardAuthor = document.createElement("td");
    cardContent.appendChild(cardAuthor);
    const cardPages = document.createElement("td");
    cardContent.appendChild(cardPages);
    const cardRead = document.createElement("button");
    cardRead.setAttribute('id', 'read-btn');
    card.appendChild(cardRead);
    const removeBook = document.createElement("button");
    removeBook.setAttribute('value', cardId - 1);
    removeBook.setAttribute('class', 'remove-book');
    card.appendChild(removeBook);

    //fills cards with content based on form input//
    cardTitle.innerText = `"${element.title}"`;
    cardAuthor.innerText = `By: ${element.author}`;
    cardPages.innerText = `Published: ${element.pages}`;
    cardRead.innerText = `Read? ${element.read}`;
    removeBook.innerText = 'Remove';

    console.log(removeBook.value)


    console.log(element.info());

    //calls the haveRead() method on a book object//
    element.haveRead(cardRead);

    //removes book card when remove button is pressed, also deletes corresponding book object from array//
    removeBook.addEventListener("click", () => {
      cardContainer.childNodes.forEach(child => {
        if (child.id === removeBook.value) {
          cardContainer.removeChild(child);
        };
        if (arrOfObjs) {
          myLibrary.splice(card.id, 1);
          arrOfObjs.splice(card.id, 1);
          console.log(myLibrary);
        };
      })
    })
  });
}

//When clicked, a dialog box pops up to allow user input, it also hides the add book button//
addBookBtn.addEventListener('click', () => {
  dialogModal.showModal();
  addBookBtn.style.display = "none";
});

//Takes user input from html form, creates Book objects using said data and pushes objects to myLibrary array//
function inputNewBook() {
  newBookForm.addEventListener('submit', (event) => {

    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readCheckbox = document.getElementById('read-checkbox');

    if (readCheckbox.checked) {
      addBookToLibrary(new Book(title, author, pages, 'Yes'));
    } else {
      addBookToLibrary(new Book(title, author, pages, 'No'));
    };

    //Allows cards to be created without duplicates being made
    if (i === 1) {
      displayBook(myLibrary);
    } else if (i === 2) {
      let shifted = myLibrary.shift();
      displayBook(myLibrary);
      myLibrary.unshift(shifted);
    } else {
      copyMyLibrary = myLibrary.slice(i - 1);
      displayBook(copyMyLibrary);
    }
  })

  //Hides newBookForm and resets inputs//
  newBookForm.addEventListener('submit', () => {
    title.value = '';
    author.value = '';
    pages.value = '';
    dialogModal.close();
    addBookBtn.style.display = "block";
  });
};

inputNewBook();


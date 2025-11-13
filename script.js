//Selectors
const table = document.querySelector("table");
const addBookBtn = document.querySelector("#add-book");
const dialog = document.querySelector("#dialog");
const submitBtn = document.querySelector("#submit");
const closeBtn = document.querySelector("#close-button");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const hasRead = document.querySelector("#has-read");
const hasNotRead = document.querySelector("#has-not-read");

// Constructor
function Book(title, author, pages, hasRead, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.id = id;
}

Book.prototype.toggleRead = function () {
    this.hasRead = !this.hasRead;
}

const myLibrary = [
    new Book('The Dispossessed', 'Ursula K. Le Guin', 305, true, 1),
    new Book('Frankenstein', 'Mary Shelley', 278, false, 2)
];


function addBookToLibrary(title, author, pages, hasRead) {
    const createBook = new Book(title, author, pages, hasRead);
    createBook.id = crypto.randomUUID();
    myLibrary.push(createBook);
    return createBook;
}

function deleteBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if(index !== -1){
        myLibrary.splice(index, 1);
    }
}


function addBook(book) {
        const row = document.createElement("tr");
        row.dataset.bookId = book.id;

        const titleCell = document.createElement("td");
        titleCell.textContent = book.title;
        const authorCell = document.createElement("td");
        authorCell.textContent = book.author;
        const pagesCell = document.createElement("td");
        pagesCell.textContent = book.pages;
        const readCell = document.createElement("td");
        readCell.textContent = book.hasRead ? "Read" : "Not Read";
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        const toggleStatusBtn = document.createElement("button");
        toggleStatusBtn.textContent = "Change Status"

        deleteBtn.addEventListener("click", () => {
            deleteBook(book.id);
            row.remove();
        })

        toggleStatusBtn.addEventListener("click", () => {
            book.toggleRead();
            readCell.textContent = book.hasRead ? "Read" : "Not Read";
        })


        row.appendChild(titleCell);
        row.appendChild(authorCell);
        row.appendChild(pagesCell);
        row.appendChild(readCell);
        row.appendChild(deleteBtn);
        row.appendChild(toggleStatusBtn);

        table.appendChild(row);
}

addBookBtn.addEventListener("click", () => {
    dialog.showModal();
})

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const readStatus = hasRead.checked;
    const newBook = addBookToLibrary(title.value, author.value, pages.value, readStatus);
    addBook(newBook);
    dialog.close();
    title.value = "";
    author.value = "";
    pages.value = "";
})

closeBtn.addEventListener("click", () => {
    dialog.close();
})


//Display books initially stored 
function displayBooks() {
    myLibrary.forEach(book => {
        addBook(book);
    }
)};

displayBooks();



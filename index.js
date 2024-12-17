// Reference for modal elements
const openBookModal = document.getElementById('openBookModal')
const bookModal = document.getElementById('bookModal')
const titleInput = document.getElementById('titleInput')
const authorInput = document.getElementById('authorInput')
const pagesInput = document.getElementById('pagesInput')
const isReadInput = document.getElementById('isReadInput')
const addBook = document.getElementById('addBook')
const cancel = document.getElementById('cancel')
const message = document.querySelector('.message')

// For displaying books
const bookContainer = document.getElementById("book-container")


// Library
const myLibrary = [];

// Book Constructor
function Book (title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead === 'true';
    this.toggleRead = function() {
        // if (this.isRead == true){
        //     this.isRead = false
        // } else {
        //     this.isRead = true
        // }
        this.isRead = !this.isRead
    }
}

// Populate library with dummy data

const hobbit = new Book("Hobbit", "Ash", 200, false)
const pokemon = new Book("Pokemon", "Brock", 250, false)
const breakingBad = new Book("Breaking Bad", "Walter", 1000, true)
const betterCallSaul = new Book("Better Call Saul", "Jimmy McGill", 400, true)
const onePiece = new Book("One Piece", "Eichiro", 1500, true)

// Inserting objects to library

addToBookToLibrary(hobbit);
addToBookToLibrary(pokemon);
addToBookToLibrary(breakingBad);
addToBookToLibrary(betterCallSaul);
addToBookToLibrary(onePiece);

// Clear input fields
function clearFields(){
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    isReadInput.value = null;
}

// Modal add and delete functions
openBookModal.addEventListener('click', () => {
    bookModal.showModal();
})

cancel.addEventListener('click', () => {
    bookModal.close()
    clearFields()
    }
)

// functions for books

// Add Book
function addToBookToLibrary(book){
    myLibrary.push(book)
}

// Remove book
function removeBookToLibrary(bookId){
    myLibrary.splice(bookId, 1)
    
}

addBook.addEventListener('click', () => {
    const book = new Book(titleInput.value, authorInput.value, pagesInput.value, isReadInput.value)
    addToBookToLibrary(book);
    showLibraryBooks()
    bookModal.close()
})


// Display books in the library

function showLibraryBooks(){
    bookContainer.innerHTML = ""
    myLibrary.forEach((item, index) => {
        const book = document.createElement('div')
        book.className = 'book'
        book.innerHTML = `
        <h3>${item.title}</h3>
        <p>Author: ${item.author}</p>
        <p>Pages: ${item.pages}</p>
        <button id=${index} class='read-button ${item.isRead ? 'done-reading':''}'>${item.isRead ? "DONE READING" : "NOT FINISHED READING"}</button>
        <button id=${index} class='delete-button'> REMOVE THIS BOOK </button>
        `
        bookContainer.appendChild(book);
    })
    // message.classList.add('visible')
    if (bookContainer.childElementCount != 0) {
        message.style.display = "none"
    } else {
        message.style.display = "flex"
    }

    let bookReadButtons = document.getElementsByClassName('read-button')
    Array.from(bookReadButtons).forEach(bookReadButton => {
        bookReadButton.addEventListener('click', () => {
            myLibrary[bookReadButton.id].toggleRead()
            showLibraryBooks()

        })
    })

    let bookDeleteButtons = document.getElementsByClassName('delete-button')
    Array.from(bookDeleteButtons).forEach(bookDeleteButton => {
        bookDeleteButton.addEventListener('click', () => {
            removeBookToLibrary(bookDeleteButton.id)
            bookDeleteButton.parentElement.remove()
            showLibraryBooks()

        })
    })
}

showLibraryBooks()

// Remove book from display









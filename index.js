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
const Library =(() => {
    let myLibrary = [];

    // Display books in the library
    const showLibraryBooks = () => {
        bookContainer.innerHTML = ""
        Library.getLibrary().forEach((item, index) => {
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
                Library.getLibrary()[bookReadButton.id].toggleRead()
                showLibraryBooks()

            })
        })

        let bookDeleteButtons = document.getElementsByClassName('delete-button')
        Array.from(bookDeleteButtons).forEach(bookDeleteButton => {
            bookDeleteButton.addEventListener('click', () => {
                Library.removeBook(bookDeleteButton.id)
                bookDeleteButton.parentElement.remove()
                showLibraryBooks()

            })
        })
    }

    const getLibrary = () => myLibrary;

    // Add Book
    const addBook = (book) => {
        getLibrary().push(book)
    }

    
    // Remove book
    const removeBook = (bookId) => {
        getLibrary().splice(bookId, 1)
        
    }

    return {
        getLibrary,
        showLibraryBooks,
        addBook,
        removeBook
    }
})()




// Book Constructor
class Book {
    constructor (title, author, pages, isRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead === 'true';
    }
    toggleRead() {
        this.isRead = !this.isRead
    }
    
}

// Populate library with dummy data

const cowboyBebop = new Book("Cowboy Bebop", "Shinichiro Watanabe", 260, 'true')
const bigBangTheory = new Book("Big Bang Theory", "Sheldon Cooper", 360, 'true')
const breakingBad = new Book("Breaking Bad", "Walter White", 45, 'true')
const betterCallSaul = new Book("Better Call Saul", "Jimmy McGill", 65, 'true')
const theShining = new Book("The Shining", "Stephen King", 2, 'false')
const onePiece = new Book("One Piece", "Eichiro", 1500, 'true')

// Inserting objects to library

Library.addBook(cowboyBebop);
Library.addBook(bigBangTheory);
Library.addBook(breakingBad);
Library.addBook(betterCallSaul);
Library.addBook(theShining)
Library.addBook(onePiece);

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

addBook.addEventListener('click', () => {
    const book = new Book(titleInput.value, authorInput.value, pagesInput.value, isReadInput.value)
    Library.addBook(book);
    Library.showLibraryBooks()
    bookModal.close()
})




Library.showLibraryBooks()

// Remove book from display









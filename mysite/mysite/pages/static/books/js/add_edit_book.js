document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const editId = params.get("id");

    let books = JSON.parse(localStorage.getItem("libraryBooks")) || [];

    const bookForm = document.querySelector('form');

    const bookName = document.getElementById("bookName");
    const author = document.getElementById("author");
    const category = document.getElementById("category");
    const bookID = document.getElementById("bookID");
    const description = document.getElementById("description");
    const pageTitle = document.querySelector(".Title");


    //=============================
    //  EDIT MODE 
    //=============================

    if (editId) {
        pageTitle.innerText = "Edit Book";
        document.title = "Book Corner - Edit Book"

        bookID.disabled = true;


        const book = books.find(function (b) {
            return Number(b.id) === Number(editId);
        });

        if (book) {
            bookName.value = book.name;
            author.value = book.author;
            category.value = book.category;
            bookID.value = book.id;
            description.value = book.description;
        }
    }


    //=============================
    //  SUBMIT (ADD / EDIT)
    //=============================

    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = bookName.value.trim();
        const auth = author.value.trim();
        const cat = category.value;
        const desc = description.value.trim();

        const id = editId ? Number(editId) : Number(bookID.value);

        if (!name || !auth || !desc) {
            alert("Please fill all fields");
            return;
        }

        if (!cat) {
            alert("Please select a category");
            return;
        }

        if (isNaN(id) || id <= 0) {
            alert("Book ID must be a positive number");
            return;
        }


        const newBook = {
            id,
            name,
            author: auth,
            category: cat,
            description: desc,
            status: "Available"
        };


        //=============================
        //  EDIT MODE 
        //=============================

        if (editId) {
            const index = books.findIndex(b => Number(b.id) === Number(editId));
            if (index !== -1) {
                books[index] = newBook;
            }

            localStorage.setItem('libraryBooks', JSON.stringify(books));

            alert('Book Updated Successfully!');
            window.location.href = 'manage_books.html';
            return;
        }

        
        //=============================
        //  ADD MODE 
        //=============================

        const exists = books.some(b => Number(b.id) === id);

        if (exists) {
            alert("Book ID already exists!");
            return;
        }

        books.push(newBook);

        localStorage.setItem('libraryBooks', JSON.stringify(books));

        alert('Book Added Successfully!');
        window.location.href = 'manage_books.html';

    })

    document.getElementById("clearBtn").addEventListener("click", () => {

        const confirmClear = confirm("Are you sure you want to clear all fields?");

        if (!confirmClear) return;

        document.querySelector("form").reset();
    });
})


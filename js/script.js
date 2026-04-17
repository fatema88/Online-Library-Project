function borrowBook(bookName) {
    alert("You borrowed: " + bookName);
}


function borrowBook(bookName, author) {
    
    let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

    const isAlreadyBorrowed = borrowedBooks.some(book => book.name === bookName);

    if (isAlreadyBorrowed) {
        alert("You have already borrowed this book!");
        return;
    }

    
    const today = new Date();
    const returnDate = new Date();
    returnDate.setMonth(today.getMonth() + 1);

    const newBook = {
        name: bookName,
        author: author,
        borrowedDate: today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        returnDate: returnDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    borrowedBooks.push(newBook);
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));

    alert("the book has been added to your borrowed list!");
    window.location.href = "borrowed_books.html"; 
}
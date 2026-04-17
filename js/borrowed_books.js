document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".books-container");


    function displayBorrowedBooks() {
    
        let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
        
    
        container.innerHTML = "";

        if (borrowedBooks.length === 0) {
            container.innerHTML = "<p style='text-align:center; width:100%;'>No borrowed books found.</p>";
            return;
        }

      
        borrowedBooks.forEach((book, index) => {
            const card = document.createElement("div");
            card.className = "book-card";
            card.innerHTML = `
                <h3>${book.name}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Borrowed:</strong> ${book.borrowedDate}</p>
                <p><strong>Return:</strong> ${book.returnDate}</p>
                <button class="return-btn" onclick="returnBook(${index})">Return</button>
            `;
            container.appendChild(card);
        });
    }

    window.returnBook = function(index) {
        let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
        
     
        borrowedBooks.splice(index, 1);
        
        // Save the updated list back to storage
        localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
        
        alert("Book returned successfully!");
        
        
        displayBorrowedBooks();
    };

   
    displayBorrowedBooks();
});
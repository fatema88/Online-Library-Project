// Delete confirmation functionality
let bookToDelete = null;

document.addEventListener('DOMContentLoaded', function() {
    // Get book ID from URL parameters
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');

    // Get books from localStorage
    const books = JSON.parse(localStorage.getItem('libraryBooks')) || [];

    // Find the book to delete
    if (bookId) {
        bookToDelete = books.find(b => Number(b.id) === Number(bookId));
    }

    // Display book details if found
    if (bookToDelete) {
        displayBookDetails(bookToDelete);
    } else {
        displayNoBookFound();
    }

    // Setup button handlers
    const confirmBtn = document.getElementById('confirmDeleteBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    if (confirmBtn) {
        confirmBtn.addEventListener('click', handleConfirmDelete);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', handleCancel);
    }
});

// Display book details in a formatted way
function displayBookDetails(book) {
    const detailsDiv = document.getElementById('bookDetailsDiv');
    
    if (detailsDiv) {
        detailsDiv.innerHTML = `
            <div class="book-details">
                <p><strong>Book ID:</strong> ${sanitize(book.id)}</p>
                <p><strong>Title:</strong> ${sanitize(book.name)}</p>
                <p><strong>Author:</strong> ${sanitize(book.author)}</p>
                <p><strong>Category:</strong> ${sanitize(book.category)}</p>
                ${book.description ? `<p><strong>Description:</strong> ${sanitize(book.description)}</p>` : ''}
            </div>
        `;
    }
}

// Display message when book is not found
function displayNoBookFound() {
    const detailsDiv = document.getElementById('bookDetailsDiv');
    
    if (detailsDiv) {
        detailsDiv.innerHTML = `
            <p style="color: #d9534f;">
                <strong>Error:</strong> Book not found. The book you're trying to delete does not exist.
            </p>
        `;
    }
}

// Handle confirm delete button click
function handleConfirmDelete() {
    if (!bookToDelete) {
        alert('No book selected for deletion.');
        return;
    }

    // Get books from localStorage
    let books = JSON.parse(localStorage.getItem('libraryBooks')) || [];

    // Find and remove the book
    const index = books.findIndex(b => Number(b.id) === Number(bookToDelete.id));
    
    if (index !== -1) {
        books.splice(index, 1);
        localStorage.setItem('libraryBooks', JSON.stringify(books));
        alert('Book deleted successfully!');
        window.location.href = 'manage_books.html';
    } else {
        alert('Error: Could not find the book to delete.');
    }
}

// Handle cancel button click
function handleCancel() {
    window.location.href = 'manage_books.html';
}

// Sanitize text to prevent XSS
function sanitize(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

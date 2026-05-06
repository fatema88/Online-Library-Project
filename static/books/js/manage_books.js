// Book management functionality
let currentSort = {
    column: null,
    direction: 'asc'
};

// Initialize localStorage with default books on first load
function initializeDefaultBooks() {
    const existingBooks = localStorage.getItem('libraryBooks');
    if (!existingBooks) {
        const defaultBooks = [
            { id: 101, name: 'First Test Book', author: 'Youssif (Me :))', category: 'Testing', description: '', status: 'Available' },
            { id: 102, name: 'Clean Code', author: 'Robert C. Martin', category: 'Technology', description: '', status: 'Available' },
            { id: 103, name: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', description: '', status: 'Available' },
            { id: 104, name: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', description: '', status: 'Available' },
            { id: 105, name: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', description: '', status: 'Available' },
            { id: 106, name: '1984', author: 'George Orwell', category: 'Fiction', description: '', status: 'Available' },
            { id: 107, name: 'Pride and Prejudice', author: 'Jane Austen', category: 'Fiction', description: '', status: 'Available' },
            { id: 108, name: 'The Catcher in the Rye', author: 'J.D. Salinger', category: 'Fiction', description: '', status: 'Available' },
            { id: 109, name: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', description: '', status: 'Available' },
            { id: 110, name: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', category: 'Psychology', description: '', status: 'Available' },
            { id: 111, name: 'Atomic Habits', author: 'James Clear', category: 'Self-Help', description: '', status: 'Available' },
            { id: 112, name: 'The Lean Startup', author: 'Eric Ries', category: 'Business', description: '', status: 'Available' },
            { id: 113, name: 'Educated', author: 'Tara Westover', category: 'Biography', description: '', status: 'Available' },
            { id: 114, name: 'The Power of Now', author: 'Eckhart Tolle', category: 'Self-Help', description: '', status: 'Available' },
            { id: 115, name: 'Zero to One', author: 'Peter Thiel', category: 'Business', description: '', status: 'Available' },
            { id: 116, name: 'The Selfish Gene', author: 'Richard Dawkins', category: 'Science', description: '', status: 'Available' },
            { id: 117, name: 'Outliers', author: 'Malcolm Gladwell', category: 'Psychology', description: '', status: 'Available' },
            { id: 118, name: 'The Coding Interview', author: 'Gayle Laakmann', category: 'Technology', description: '', status: 'Available' },
            { id: 119, name: 'Design Patterns', author: 'Gang of Four', category: 'Technology', description: '', status: 'Available' },
            { id: 120, name: 'The Pragmatic Programmer', author: 'David Thomas, Andrew Hunt', category: 'Technology', description: '', status: 'Available' },
            { id: 121, name: 'Refactoring', author: 'Martin Fowler', category: 'Technology', description: '', status: 'Available' },
            { id: 122, name: 'The Phoenix Project', author: 'Gene Kim, Kevin Behr, George Spafford', category: 'Business', description: '', status: 'Available' },
            { id: 123, name: 'Emotional Intelligence', author: 'Daniel Goleman', category: 'Psychology', description: '', status: 'Available' },
            { id: 124, name: 'The Innovators', author: 'Walter Isaacson', category: 'History', description: '', status: 'Available' },
            { id: 125, name: 'Freakonomics', author: 'Stephen Dubner, Steven Levitt', category: 'Economics', description: '', status: 'Available' },
            { id: 126, name: 'The Black Swan', author: 'Nassim Taleb', category: 'Economics', description: '', status: 'Available' }
        ];
        localStorage.setItem('libraryBooks', JSON.stringify(defaultBooks));
    }
}

// Load and render books from localStorage
function loadBooks() {
    const books = JSON.parse(localStorage.getItem('libraryBooks')) || [];
    const tbody = document.querySelector('#booksTable tbody');
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Render each book as a table row
    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td><a href="add_edit_book.html?id=${book.id}">Edit</a> | <a href="delete_confirm.html?id=${book.id}">Delete</a></td>
        `;
        tbody.appendChild(row);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeDefaultBooks();
    loadBooks();
    setupTableSorting();
    setupFiltering();
});

// Setup table header sorting
function setupTableSorting() {
    const headers = document.querySelectorAll('th.sortable');
    
    headers.forEach((header, index) => {
        header.addEventListener('click', function() {
            sortTable(index);
        });
    });
}

// Sort table by column
function sortTable(columnIndex) {
    const table = document.getElementById('booksTable');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const headers = document.querySelectorAll('th.sortable');
    
    // Determine sort direction
    if (currentSort.column === columnIndex) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.direction = 'asc';
    }
    
    // Update header indicators
    headers.forEach(h => h.classList.remove('asc', 'desc'));
    if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3) {
        headers[columnIndex].classList.add(currentSort.direction);
    }
    
    currentSort.column = columnIndex;
    
    // Sort rows
    rows.sort((a, b) => {
        let aValue = a.querySelectorAll('td')[columnIndex].textContent.trim();
        let bValue = b.querySelectorAll('td')[columnIndex].textContent.trim();
        
        // Try numeric sort for ID column
        if (columnIndex === 0) {
            aValue = parseInt(aValue) || aValue;
            bValue = parseInt(bValue) || bValue;
        }
        
        // Compare
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return currentSort.direction === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
            aValue = String(aValue).toLowerCase();
            bValue = String(bValue).toLowerCase();
            return currentSort.direction === 'asc' 
                ? aValue.localeCompare(bValue) 
                : bValue.localeCompare(aValue);
        }
    });
    
    // Apply sorted rows
    rows.forEach(row => tbody.appendChild(row));
    
    // Reapply filters after sorting
    applyFilters();
}

// Setup filter input listeners
function setupFiltering() {
    const filterName = document.getElementById('filterName');
    const filterAuthor = document.getElementById('filterAuthor');
    const filterCategory = document.getElementById('filterCategory');
    
    filterName.addEventListener('input', applyFilters);
    filterAuthor.addEventListener('input', applyFilters);
    filterCategory.addEventListener('input', applyFilters);
}

// Apply filters to table rows
function applyFilters() {
    const filterName = document.getElementById('filterName').value.toLowerCase();
    const filterAuthor = document.getElementById('filterAuthor').value.toLowerCase();
    const filterCategory = document.getElementById('filterCategory').value.toLowerCase();
    
    const tbody = document.querySelector('tbody');
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const id = cells[0].textContent.trim().toLowerCase();
        const name = cells[1].textContent.trim().toLowerCase();
        const author = cells[2].textContent.trim().toLowerCase();
        const category = cells[3].textContent.trim().toLowerCase();
        
        // Check if row matches all filters
        const matchName = name.includes(filterName) || filterName === '';
        const matchAuthor = author.includes(filterAuthor) || filterAuthor === '';
        const matchCategory = category.includes(filterCategory) || filterCategory === '';
        
        // Show or hide row
        if (matchName && matchAuthor && matchCategory) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

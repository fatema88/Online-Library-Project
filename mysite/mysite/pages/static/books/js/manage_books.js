// Book management functionality
let currentSort = {
    column: null,
    direction: 'asc'
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupTableSorting();
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
}


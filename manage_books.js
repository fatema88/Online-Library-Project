// Book management functionality
let currentSort = {
    column: null,
    direction: 'asc'
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
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

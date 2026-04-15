// 1. Unified Books Data (Matching your uploaded files)
const books = [
    { 
        title: "Clean Code", 
        author: "Robert Martin", 
        category: "Technology", 
        status: "Available",
        detailsPage: "clean_code.html" 
    },
    { 
        title: "Algorithms", 
        author: "Thomas Cormen", 
        category: "Technology", 
        status: "Available",
        detailsPage: "algorithms.html" 
    },
    { 
        title: "Artificial Intelligence", 
        author: "Stuart Russell", 
        category: "Technology", 
        status: "Not Available",
        detailsPage: "artificial_intelligence.html" 
    }
];

window.addEventListener('load', function() {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title')?.toLowerCase() || '';
    const author = params.get('author')?.toLowerCase() || '';
    const category = params.get('category') || 'Choose Category';

    const resultContainer = document.getElementById('searchResultContainer');
    resultContainer.innerHTML = ''; 

    const filtered = books.filter(book => {
        return (!title || book.title.toLowerCase().includes(title)) &&
               (!author || book.author.toLowerCase().includes(author)) &&
               (category === 'Choose Category' || book.category === category);
    });

    if(filtered.length > 0) {
        
        filtered.forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card-search'; 
            card.style.background = 'white';
            card.style.padding = '20px';
            card.style.margin = '20px auto';
            card.style.width = '300px';
            card.style.borderRadius = '12px';
            card.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
            
            card.innerHTML = `
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Category:</strong> ${book.category}</p>
                <p><strong>Status:</strong> <span style="color: ${book.status === 'Available' ? 'green' : 'red'}">${book.status}</span></p>
                <a href="${book.detailsPage}" style="display: inline-block; margin-top: 10px; padding: 8px 15px; background: #311358; color: white; text-decoration: none; border-radius: 5px;">View Details</a>
            `;
            resultContainer.appendChild(card);
        });
    } else {
        const msg = document.createElement('p');
        msg.textContent = 'Unfortunately, the book you are looking for is not available.';
        msg.style.textAlign = 'center';
        msg.style.color = 'red';
        msg.style.fontWeight = 'bold';
        resultContainer.appendChild(msg);
    }
});

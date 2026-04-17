
const books = [
    { title: "Clean Code", author: "Robert Martin", category: "Technology", status: "Available" },
    { title: "Algorithms", author: "Thomas Cormen", category: "Technology", status: "Available" },
    { title: "Artificial Intelligence", author: "Stuart Russell", category: "Technology", status: "Not Available" },
    { title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", status: "Available" },
    { title: "The Little Prince", author: "Antoine de Saint-Exupéry", category: "Fiction", status: "Available" },
    { title: "A Tale of Two Cities", author: "Charles Dickens", category: "History", status: "Not Available" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fiction", status: "Available" },
    { title: "Dream of the Red Chamber", author: "Cao Xueqin", category: "Fiction", status: "Available" },
    { title: "And Then There Were None", author: "Agatha Christie", category: "Fiction", status: "Not Available" },
    { title: "The Da Vinci Code", author: "Dan Brown", category: "Fiction", status: "Available" },
    { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", category: "History", status: "Available" },
    { title: "Guns, Germs, and Steel", author: "Jared Diamond", category: "History", status: "Available" },
    { title: "The Diary of Anne Frank", author: "Anne Frank", category: "History", status: "Available" },
    { title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", status: "Available" },
    { title: "The Selfish Gene", author: "Richard Dawkins", category: "Science", status: "Not Available" },
    { title: "Cosmos", author: "Carl Sagan", category: "Science", status: "Available" },
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", category: "Science", status: "Available" },
    { title: "Man’s Search for Meaning", author: "Viktor Frankl", category: "Self-Help", status: "Available" },
    { title: "Meditations", author: "Marcus Aurelius", category: "Philosophy", status: "Not Available" },
    { title: "Atomic Habits", author: "James Clear", category: "Self-Help", status: "Available" }
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

        const book = filtered[0];
        const card = document.createElement('div');
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
            <p><strong>Status:</strong> ${book.status}</p>
        `;
        resultContainer.appendChild(card);
    } else {
        const msg = document.createElement('p');
        msg.textContent = 'unfortunately, the book you are looking for is not available in the current time.';
        msg.style.textAlign = 'center';
        msg.style.color = 'red';
        msg.style.fontWeight = 'bold';
        resultContainer.appendChild(msg);
    }
});
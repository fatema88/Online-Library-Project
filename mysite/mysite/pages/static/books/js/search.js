document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("searchInput");
    const container = document.getElementById("resultsContainer");

    input.addEventListener("input", function () {
        let query = input.value.trim();

        if (query.length === 0) {
            container.innerHTML = "<p>Start typing to search for books...</p>";
            return;
        }

        fetch(`/search/?q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {

                container.innerHTML = "<h3>Results</h3>";

                if (data.results.length === 0) {
                    container.innerHTML += `
                        <p class="no-results">
                            No books found 
                        </p>
                    `;
                    return;
                }

                data.results.forEach(book => {
                    container.innerHTML += `
                        <div class="book-card">
                            <h3>${book.title}</h3>
                            <p><strong>Author:</strong> ${book.author}</p>
                            <p><strong>Category:</strong> ${book.category}</p>
                        </div>
                    `;
                });

            })
            .catch(error => {
                console.error("Error fetching data:", error);
                container.innerHTML = `
                    <p class="no-results">
                        Something went wrong 
                    </p>
                `;
            });
    });
});
document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const role = document.querySelector('input[name="role"]:checked').value;

    if (role === "admin") {
        window.location.href = "add_edit_book.html";
    } else {
        window.location.href = "books.html";
    }
});

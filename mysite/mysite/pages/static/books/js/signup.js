document.getElementById("signupForm").addEventListener("submit", function(e) {
<<<<<<< HEAD

    const password =
        document.querySelector('input[name="password"]').value;

    const confirmPassword =
        document.querySelector('input[name="confirm_password"]').value;

    if (password !== confirmPassword) {

        e.preventDefault();

        alert("Passwords do not match");
=======
    e.preventDefault();

    const role = document.querySelector('input[name="role"]:checked').value;

    if (role === "admin") {
        window.location.href = "add_edit_book.html";
    } else {
        window.location.href = "books.html";
>>>>>>> 7dd52382b5b95f3c3e9721929432ee238dce10f0
    }
});

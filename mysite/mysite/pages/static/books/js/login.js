const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e) {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("pass").value.trim();

    if (!email || !password) {
        e.preventDefault();
        alert("Please fill in all fields");
        return;
    }

    if (!email.includes("@")) {
        e.preventDefault();
        alert("Please enter a valid email");
        return;
    }

    if (password.length < 7) {
        e.preventDefault();
        alert("Password must be at least 7 characters");
        return;
    }

    // Validation passed — let Django handle the actual authentication
});

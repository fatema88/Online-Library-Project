const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("pass").value.trim();

    if (!email || !password) {
        alert("Please fill in all fields");
        return;
    }

    if (!email.includes("@")) {
        alert("Please enter a valid email");
        return;
    }

    if (password.length < 7) {
        alert("Password must be at least 7 characters");
        return;
    }

const savedUser = JSON.parse(localStorage.getItem("user"));

if (!savedUser) {
    alert("No account found, please sign up first");
    return;
}

if (email === savedUser.email && password === savedUser.password) {
    alert("Welcome back " + savedUser.username);
    if (savedUser.role === "admin") {
        window.location.href = "add_edit_book.html";
    } else {
        window.location.href = "search.html";
    }

} else {
    alert("Invalid email or password");
}
});

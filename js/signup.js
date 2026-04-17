document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.querySelector('input[type="text"]').value.trim();
    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelectorAll('input[type="password"]')[0].value.trim();
    const confirmPassword = document.querySelectorAll('input[type="password"]')[1].value.trim();
    const role = document.querySelector('input[name="role"]:checked').value;

    if (!username || !email || !password || !confirmPassword) {
        alert("Please fill all fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    
    const user = {
        username: username,
        email: email,
        password: password,
        role: role
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Account created successfully!");


    if (role === "admin") {
        window.location.href = "add_edit_book.html";
    } else {
        window.location.href = "search.html";
    }
});
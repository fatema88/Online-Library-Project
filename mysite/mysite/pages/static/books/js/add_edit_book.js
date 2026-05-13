document.addEventListener("DOMContentLoaded", () => {

    const clearBtn = document.getElementById("clearBtn");

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to clear all fields?")) {
                document.querySelector("form").reset();
            }
        });
    }

});

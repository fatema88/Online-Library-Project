document.addEventListener("DOMContentLoaded", function () {

    let buttons = document.querySelectorAll(".return-btn");

    buttons.forEach(function(button) {

        button.addEventListener("click", function() {

            
            let card = this.parentElement;
            card.remove();

         
            alert("Book returned successfully!");

        });

    });

});
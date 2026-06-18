(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });
  }

  var ratingInputs = document.querySelectorAll('input[name="rating"]');
  var ratingMessage = document.getElementById("rating-message");

  if (ratingInputs.length && ratingMessage) {
    Array.prototype.forEach.call(ratingInputs, function (input) {
      input.addEventListener("change", function () {
        ratingMessage.textContent = "Thank you. Please add any details you want to share before submitting.";
      });
    });
  }
})();

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
        var value = Number(input.value);

        if (value >= 4) {
          ratingMessage.textContent = "We're glad UR Lite worked well for you. You may also leave an honest public review.";
          return;
        }

        ratingMessage.textContent = "Sorry UR Lite did not meet your expectations. Please tell us what happened so we can improve.";
      });
    });
  }
})();

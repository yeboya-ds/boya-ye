(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll("[data-set-lang]");
  var nav = document.querySelector(".nav");
  var langSwitch = document.querySelector(".lang");
  var labels = {
    en: { nav: "Primary", lang: "Language" },
    zh: { nav: "主导航", lang: "语言" }
  };

  function apply(lang) {
    var next = lang === "zh" ? "zh" : "en";
    root.lang = next === "zh" ? "zh-Hans" : "en";
    root.setAttribute("data-lang", next);
    nav.setAttribute("aria-label", labels[next].nav);
    langSwitch.setAttribute("aria-label", labels[next].lang);
    buttons.forEach(function (button) {
      var active = button.getAttribute("data-set-lang") === next;
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    document.querySelectorAll("[data-alt-en]").forEach(function (img) {
      img.alt = img.getAttribute(next === "zh" ? "data-alt-zh" : "data-alt-en");
    });
  }

  document.querySelectorAll(".card-photo img").forEach(function (img) {
    function fail() {
      if (img.parentElement) img.parentElement.classList.add("is-fallback");
    }
    img.addEventListener("error", fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var lang = button.getAttribute("data-set-lang");
      apply(lang);
      try {
        localStorage.setItem("boyaye-lang", lang);
      } catch (err) {}
    });
  });

  apply(root.getAttribute("data-lang"));
})();

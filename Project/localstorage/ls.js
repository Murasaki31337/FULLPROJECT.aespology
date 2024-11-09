
const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    document.body.classList.add("dark-mode");
    document.getElementById("theme-switcher").checked = true;
  } else {
    document.body.classList.remove("dark-mode");
    document.getElementById("theme-switcher").checked = false;
  }

  function toggleTheme() {
    if (document.getElementById("theme-switcher").checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadFiltersFromStorage();
    applyFilters();
});

function applyFilters() {
  const priceFilter = document.getElementById("filter-price").value;
  const typeFilter = document.getElementById("filter-type").value;

  saveFiltersToStorage(priceFilter, typeFilter);

  const productCards = document.querySelectorAll(".product-card");
  let visibleCount = 0;

  productCards.forEach(card => {
      const price = parseInt(card.querySelector(".product-price").textContent.replace("₸", ""));
      const type = card.querySelector(".product-title").textContent.toUpperCase();

      let priceMatch = priceFilter === "all" || price <= parseInt(priceFilter);
      let typeMatch = typeFilter === "all" || type.includes(typeFilter);

      if (priceMatch && typeMatch) {
          card.style.display = "block";
          visibleCount++;
      } else {
          card.style.display = "none";
      }
  });

  const noResultsMessage = document.getElementById("no-results-message");
  noResultsMessage.classList.add("no-results");

  if (visibleCount === 0) {
      noResultsMessage.style.display = "block";
  } else {
      noResultsMessage.style.display = "none";
  }
}


function saveFiltersToStorage(price, type) {
    localStorage.setItem("priceFilter", price);
    localStorage.setItem("typeFilter", type);
}

function loadFiltersFromStorage() {
    const priceFilter = localStorage.getItem("priceFilter") || "all";
    const typeFilter = localStorage.getItem("typeFilter") || "all";
    
    document.getElementById("filter-price").value = priceFilter;
    document.getElementById("filter-type").value = typeFilter;
}

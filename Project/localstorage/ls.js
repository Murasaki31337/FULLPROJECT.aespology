
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
    productCards.forEach(card => {
        const price = parseInt(card.querySelector(".product-price").textContent.replace("₸", ""));
        const type = card.querySelector(".product-title").textContent.toUpperCase();
        
        let priceMatch = false;
        let typeMatch = false;
        
        if (priceFilter === "all" || price <= parseInt(priceFilter)) {
            priceMatch = true;
        }
        
        if (typeFilter === "all" || type.includes(typeFilter)) {
            typeMatch = true;
        }
        
        if (priceMatch && typeMatch) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
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

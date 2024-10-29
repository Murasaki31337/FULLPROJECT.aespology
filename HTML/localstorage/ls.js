document.addEventListener('DOMContentLoaded', (event) => {
    checkUserStatus();
});

document.addEventListener('DOMContentLoaded', (event) => {
    checkUserStatus();
    
    const loginBtn = document.getElementById('login-btn');
    const loginPopup = document.getElementById('login-popup');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('popup-overlay');
    
    loginBtn.addEventListener('click', () => {
        loginPopup.style.display = 'block';
        overlay.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', () => {
        loginPopup.style.display = 'none';
        overlay.style.display = 'none';
    });
    
    overlay.addEventListener('click', () => {
        loginPopup.style.display = 'none';
        overlay.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    checkUserStatus();

    const loginPopup = document.getElementById('login-popup');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('popup-overlay');

    document.getElementById('auth-btn').addEventListener('click', () => {
        if (localStorage.getItem('username')) {
            logout();
        } else {
            loginPopup.style.display = 'block';
            overlay.style.display = 'block';
        }
    });

    closeBtn.addEventListener('click', () => {
        loginPopup.style.display = 'none';
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', () => {
        loginPopup.style.display = 'none';
        overlay.style.display = 'none';
    });
});

function checkUserStatus() {
    const authBtn = document.getElementById('auth-btn');
    const username = localStorage.getItem('username');
    if (username) {
        authBtn.innerText = 'Logout';
        document.getElementById('user-status').innerText = `Logged in as ${username}`;
    } else {
        authBtn.innerText = 'Login';
        document.getElementById('user-status').innerText = 'Not logged in';
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        checkUserStatus();
        document.getElementById('login-popup').style.display = 'none';
        document.getElementById('popup-overlay').style.display = 'none';
    } else {
        alert('Please enter both username and password');
    }
}

function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    checkUserStatus();
}

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
        
        // Filter by price
        if (priceFilter === "all" || price <= parseInt(priceFilter)) {
            priceMatch = true;
        }
        
        // Filter by type
        if (typeFilter === "all" || type.includes(typeFilter)) {
            typeMatch = true;
        }
        
        // Show or hide product card based on filters
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

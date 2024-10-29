document.addEventListener('DOMContentLoaded', () => {
    console.log("Document loaded and ready.");
    
    checkUserStatus();
    
    const authBtn = document.getElementById('auth-btn');
    const loginPopup = document.getElementById('login-popup');
    const registrationPopup = document.getElementById('registration-popup');
    const closeBtn = document.getElementById('close-btn');
    const closeRegBtn = document.getElementById('close-reg-btn');
    const overlay = document.getElementById('popup-overlay');
    const showRegistrationBtn = document.getElementById('show-registration');

    authBtn.addEventListener('click', () => {
        console.log("Auth button clicked.");
        if (localStorage.getItem('username')) {
            logout();
        } else {
            loginPopup.style.display = 'block';
            overlay.style.display = 'block';
        }
    });

    closeBtn.addEventListener('click', () => {
        console.log("Close login popup button clicked.");
        loginPopup.style.display = 'none';
        overlay.style.display = 'none';
    });

    showRegistrationBtn.addEventListener('click', () => {
        console.log("Show registration button clicked.");
        registrationPopup.style.display = 'block';
        overlay.style.display = 'block';
    });

    closeRegBtn.addEventListener('click', () => {
        console.log("Close registration popup button clicked.");
        registrationPopup.style.display = 'none';
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', () => {
        console.log("Overlay clicked.");
        loginPopup.style.display = 'none';
        registrationPopup.style.display = 'none';
        overlay.style.display = 'none';
    });
});

function register() {
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const passwordConfirm = document.getElementById('reg-password-confirm').value;

    if (!username || !email || !password || !passwordConfirm) {
        alert('Please fill out all fields.');
        return;
    }

    if (password !== passwordConfirm) {
        alert('Passwords do not match.');
        return;
    }

    const userData = {
        username: username,
        email: email,
        password: password,
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    alert('Registration successful! You can now log in.');
    document.getElementById('registration-popup').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
}

// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && username === userData.username && password === userData.password) {
        localStorage.setItem('username', username);
        checkUserStatus();
        document.getElementById('login-popup').style.display = 'none';
        document.getElementById('popup-overlay').style.display = 'none';
    } else {
        alert('Invalid username or password');
    }
}

function logout() {
    console.log("Logout function called.");
    localStorage.removeItem('username');
    checkUserStatus();
}

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

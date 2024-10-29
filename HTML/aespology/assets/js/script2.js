document.addEventListener('DOMContentLoaded', () => {
    checkUserStatus();
});

function checkUserStatus() {
    const authLink = document.getElementById('auth-link');
    const logoutButton = document.getElementById('logout-button');
    const username = localStorage.getItem('username');

    if (localStorage.getItem('isLoggedIn') === 'true') {
        authLink.style.display = 'none';
        logoutButton.style.display = 'block';
        logoutButton.innerText = `Logout (${username})`;
    } else {
        authLink.style.display = 'block';
        logoutButton.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    alert('Logged out successfully!');
    document.getElementById('logout-button').style.display = 'none';
    window.location.href = 'login.html';
}
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData && username === userData.username && password === userData.password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        alert('Login successful!');
        window.location.href = 'aespology.html';
    } else {
        alert('Invalid username or password');
    }
}

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
    alert('Registration successful! Redirecting to login.');
    window.location.href = 'login.html';
}
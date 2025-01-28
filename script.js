const loginPopup = document.querySelector('.wrapper');
const loginButton = document.querySelector('.btnLogin-popup');

document.querySelector('.login-popup form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the entered email and password
    const email = document.querySelector('.login-popup input[type="email"]').value;
    const password = document.querySelector('.login-popup input[type="password"]').value;

    // Hardcoded admin credentials
    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';

    // Check if the entered credentials match the admin credentials
    if (email === adminEmail && password === adminPassword) {
        // Redirect to admin.html if the credentials are correct
        window.location.href = 'admin.html';
    } else {
        // Show an error message for incorrect credentials
        alert('Invalid email or password. Please try again.');
    }
});


// Show the login popup
loginButton.addEventListener('click', () => {
    loginPopup.classList.add('active');
});

// Close the popup
window.addEventListener('click', (event) => {
    if (event.target === loginPopup) {
        loginPopup.classList.remove('active');
    }
});

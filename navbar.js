


document.addEventListener("DOMContentLoaded", () => {
    // Toggle password visibility
    function togglePasswordVisibility(toggleButton, passwordField) {
        toggleButton.addEventListener("click", () => {
            const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
            passwordField.setAttribute("type", type);
            toggleButton.classList.toggle("fa-eye");
            toggleButton.classList.toggle("fa-eye-slash");
        });
    }

    togglePasswordVisibility(document.querySelector("#togglePassword"), document.querySelector("#password"));
    togglePasswordVisibility(document.querySelector("#toggleNewPassword"), document.querySelector("#newPassword"));
    togglePasswordVisibility(document.querySelector("#toggleConfirmPassword"), document.querySelector("#confirmPassword"));

    // Function to update navbar after login
    function updateNavbarAfterLogin(username) {
        const userDropdown = document.querySelector("#userDropdown");
        const userInitial = document.querySelector("#userInitial");
        const loginLink = document.querySelector("#loginLink");
        const userFullName = document.querySelector("#userFullName");
        const userEmail = document.querySelector("#userEmail");

        userInitial.textContent = username.charAt(0).toUpperCase();
        loginLink.style.display = "none";
        userDropdown.classList.remove("d-none");

        const storedUser = JSON.parse(sessionStorage.getItem("user"));
        if (storedUser) {
            userFullName.textContent = storedUser.username;
            userEmail.textContent = storedUser.email;
        }
    }

    // Check if the user is already logged in (for page refresh or return visits)
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));

    if (storedUser && isLoggedIn) {
        updateNavbarAfterLogin(storedUser.username);
    } else if (storedUser && !isLoggedIn) {
        // Prompt login if user is stored but not logged in
        alert("Please log in to continue.");
    }

    // Handle signup form submission
    const signupForm = document.querySelector("#signupForm");
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const newUsername = document.querySelector("#newUsername").value;
        const newEmail = document.querySelector("#newEmail").value;
        const newPassword = document.querySelector("#newPassword").value;
        const confirmPassword = document.querySelector("#confirmPassword").value;

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (!checkPasswordStrength(newPassword)) {
            alert("Password is too weak! Please use a stronger password.");
            return;
        }

        if (await isPasswordCompromised(newPassword)) {
            alert("This password has been compromised in a data breach. Please choose a different password.");
            return;
        }

        const user = {
            id: Date.now(), // Generate a unique ID for the user
            username: newUsername,
            email: newEmail,
            password: newPassword,
        };

        sessionStorage.setItem("user", JSON.stringify(user));
        alert("User registered successfully!");

        // Automatically transition to the login modal after signup
        const signupModal = bootstrap.Modal.getInstance(document.querySelector('#signupModal'));
        if (signupModal) {
            signupModal.hide();
        }
        const loginModal = new bootstrap.Modal(document.querySelector('#loginModal'));
        loginModal.show();
    });

    document.getElementById("signupLink").addEventListener("click", function(event) {
        event.preventDefault();

        // Close the login modal and open the signup modal
        const loginModal = bootstrap.Modal.getInstance(document.querySelector('#loginModal'));
        if (loginModal) {
            loginModal.hide();
        }
        const signupModal = new bootstrap.Modal(document.querySelector('#signupModal'));
        signupModal.show();
    });

    document.getElementById("loginLinkFromSignup").addEventListener("click", function(event) {
        event.preventDefault();

        // Close the signup modal and open the login modal
        const signupModal = bootstrap.Modal.getInstance(document.querySelector('#signupModal'));
        if (signupModal) {
            signupModal.hide();
        }
        const loginModal = new bootstrap.Modal(document.querySelector('#loginModal'));
        loginModal.show();
    });

    const loginForm = document.querySelector("#loginForm");
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.querySelector("#username").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        const storedUser = JSON.parse(sessionStorage.getItem("user"));

        if (
            storedUser &&
            storedUser.username === username &&
            storedUser.email === email &&
            storedUser.password === password
        ) {
            alert("Login successful!");

            // Update the navbar after login
            updateNavbarAfterLogin(username);

            // Mark user as logged in
            sessionStorage.setItem("isLoggedIn", true);

            // Store the selected room details (if any)
            const selectedRoom = sessionStorage.getItem("selectedRoom");
            if (selectedRoom) {
                sessionStorage.setItem("roomDetails", selectedRoom);
            }

            // Redirect to booking page
            window.location.href = "index.html";
        } else {
            alert("Invalid login credentials!");
        }
    });

    // Handle logout
    document.querySelector("#logoutBtn").addEventListener("click", (event) => {
        event.preventDefault();
    
        // Clear session storage
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("user");
    
        // Redirect to home page or login page after logout
        window.location.href = "index.html"; // Or another page
    
        alert("You have been logged out successfully!");
    });

    // Check password strength function
    function checkPasswordStrength(password) {
        const result = zxcvbn(password);
        return result.score >= 3;
    }

    // Check if password is compromised function with error handling
    async function isPasswordCompromised(password) {
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(password);
            const hashBuffer = await crypto.subtle.digest('SHA-1', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            const prefix = hashHex.slice(0, 5);
            const suffix = hashHex.slice(5).toUpperCase();

            const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const dataText = await response.text();
            return dataText.includes(suffix);
        } catch (error) {
            console.error("Failed to check if password is compromised:", error);
            alert("Unable to check if the password is compromised due to a network error. Please check your connection and try again.");
            return false;
        }
    }
});


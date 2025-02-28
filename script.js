// Preloader fade-out with smooth animation
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        preloader.classList.add("fade-out"); 
        setTimeout(() => {
            preloader.style.display = "none";
        }, 800); // Slightly longer for a smooth effect
    }
});

// Star Rating Logic
document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star");
    const ratingText = document.getElementById("rating-text");
    const ratingInput = document.getElementById("rating"); // Hidden input for backend
    const form = document.getElementById("contactForm");
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener("mouseover", () => highlightStars(star.dataset.value));
        star.addEventListener("click", () => setRating(star.dataset.value));
    });

    function highlightStars(value) {
        stars.forEach(star => {
            star.classList.toggle("active", star.dataset.value <= value);
        });
    }

    function setRating(value) {
        selectedRating = value;
        ratingText.textContent = `You rated this ${value} star(s).`;
        ratingInput.value = value; // Store the rating for submission
    }

    // Form Submission Logic
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message || selectedRating === 0) {
            alert("Please fill in all fields and provide a rating.");
            return;
        }

        const formData = { name, email, message, rating: selectedRating };

        try {
            const response = await fetch("http://localhost:5000/submit-review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json(); // Parse JSON response

            if (response.ok) {
                alert(data.message || "Thank you for your review!");
                form.reset();
                stars.forEach(star => star.classList.remove("active"));
                selectedRating = 0;
                ratingInput.value = 0;
                ratingText.textContent = "Click on the stars to rate!";
            } else {
                alert(data.error || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to submit. Please check your internet connection.");
        }
    });
});

// Smooth Scroll with Offset
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const offset = 20; 
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            
            window.scrollTo({
                top: elementPosition - headerHeight - offset,
                behavior: "smooth"
            });
        }
    });
});
document.getElementById("message").addEventListener("focus", function() {
    console.log("Textarea focused!");
});
document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star");
    const ratingText = document.getElementById("rating-text");
    const ratingInput = document.getElementById("rating");
    const form = document.getElementById("contactForm");
    const submitButton = document.getElementById("submit-rating"); // Get submit button
    let selectedRating = 0;

    // Star Rating Logic
    stars.forEach(star => {
        star.addEventListener("mouseover", () => highlightStars(star.dataset.value));
        star.addEventListener("click", () => setRating(star.dataset.value));
    });

    function highlightStars(value) {
        stars.forEach(star => {
            star.classList.toggle("active", star.dataset.value <= value);
        });
    }

    function setRating(value) {
        selectedRating = value;
        ratingText.textContent = `You rated this ${value} star(s).`;
        ratingInput.value = value;
    }

    // Form Submission Logic
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message || selectedRating === 0) {
            alert("Please fill in all fields and provide a rating.");
            return;
        }

        const formData = { name, email, message, rating: selectedRating };

        // **Show loading state**
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";

        try {
            const response = await fetch("https://portifolio-cjuq.onrender.com/submit-review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || "Thank you for your review!");
                form.reset();
                stars.forEach(star => star.classList.remove("active"));
                selectedRating = 0;
                ratingInput.value = 0;
                ratingText.textContent = "Click on the stars to rate!";
            } else {
                alert(data.error || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to submit. Please check your internet connection.");
        }

        // **Reset loading state**
        submitButton.disabled = false;
        submitButton.textContent = "Submit Rating";
    });
});
function runCode(button) {
    // Stop animation on first click
    button.classList.remove("pulsate");
    button.style.animation = "none"; // Fully stop animation

    let outputText = document.getElementById("output-text");

    // Toggle Play/Pause
    if (button.innerText === "▶") {
        button.innerText = "||"; // Change to Pause icon
        button.style.background = "#dc3545"; // Change color to red for "Pause"

        // Show the output text dynamically
        outputText.style.display = "block";

        // After 3 seconds, revert back to Play icon
        setTimeout(() => {
            button.innerText = "▶"; // Change back to Play icon
            button.style.background = "#28a745"; // Restore green color

            // Hide the output text again
            
        }, 3000);
    } else {
        button.innerText = "▶"; // Revert to Play icon
        button.style.background = "#28a745"; // Restore green color
         
        
    }
}

// Mobile Navbar Toggle Function (Keep it unchanged)
document.querySelector(".menu-toggle").addEventListener("click", function () {
    document.querySelector("#nav-links").classList.toggle("nav-active");
});

document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault(); // Stop default anchor jump
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const navbarHeight = document.querySelector('nav').offsetHeight; // Get navbar height
            
            window.scrollTo({
                top: targetElement.offsetTop - navbarHeight - 10, // Adjust offset
                behavior: 'smooth'
            });
        }

        // Close mobile menu if open
        document.querySelector('nav ul').classList.remove('nav-active');
    });
});
// Prevent re-triggering for About Me
let aboutTyped = false;

// Function to apply typing effect
function typeEffect(element) {
    let text = element.getAttribute("data-text");
    if (!text) return; // Prevent errors if data-text is missing

    let index = 0;
    function typing() {
        element.innerHTML = text.substring(0, index + 1); // Ensures proper order
        index++;

        if (index < text.length) {
            setTimeout(typing, 50);
        }
    }
    typing();
}


// Scroll event to trigger animations
function handleScroll() {
    let aboutSection = document.getElementById("about");
    let aboutText = document.querySelector("#about .typing");

    if (aboutSection) {
        let pos = aboutSection.getBoundingClientRect().top;
        let winHeight = window.innerHeight;

        if (pos < winHeight - 50 && !aboutTyped) {
            aboutTyped = true; // Prevent retriggering
            typeEffect(aboutText);
        }
    }

    // Typing effect for project titles (if in view)
    document.querySelectorAll(".typing").forEach((el) => {
        let pos = el.getBoundingClientRect().top;
        let winHeight = window.innerHeight;
        if (pos < winHeight - 50 && !el.classList.contains("typed")) {
            el.classList.add("typed");
            typeEffect(el);
        }
    });

    // Fade-in effect for highlighted elements
    document.querySelectorAll(".highlight").forEach((el) => {
        let pos = el.getBoundingClientRect().top;
        if (pos < window.innerHeight - 50) {
            el.classList.add("show");
        }
    });
}

// Attach scroll event listener
window.addEventListener("scroll", handleScroll);

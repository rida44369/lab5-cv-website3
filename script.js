document.addEventListener("DOMContentLoaded", function () {

    // 1. Automatically update copyright year
    const yearElements = document.querySelectorAll(".copyright");

    yearElements.forEach(function (element) {
        const currentYear = new Date().getFullYear();

        if (element.textContent.includes("2026")) {
            element.textContent = element.textContent.replace(
                "2026",
                currentYear
            );
        }
    });


    // 2. Smooth scrolling for internal page links
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                event.preventDefault();
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // 3. Reveal cards when they enter the screen
    const animatedElements = document.querySelectorAll(
        ".info-card, .fact-box, .objective-card, " +
        ".education-card, .quality-card, .skill-card, " +
        ".soft-skill-item, .course-card, .project-card, " +
        ".contact-card, .contact-bottom-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, currentObserver) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        animatedElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {
        animatedElements.forEach(function (element) {
            element.classList.add("is-visible");
        });
    }


    // 4. Contact form validation
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nameInput = contactForm.querySelector(
                'input[name="name"], input[id="name"]'
            );

            const emailInput = contactForm.querySelector(
                'input[name="email"], input[type="email"]'
            );

            const subjectInput = contactForm.querySelector(
                'input[name="subject"], input[id="subject"]'
            );

            const messageInput = contactForm.querySelector(
                'textarea[name="message"], textarea'
            );

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const subject = subjectInput ? subjectInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            if (!name || !email || !message) {
                showFormMessage(
                    "Please fill in your name, email, and message.",
                    "error"
                );
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );
                return;
            }

            if (message.length < 10) {
                showFormMessage(
                    "Your message should contain at least 10 characters.",
                    "error"
                );
                return;
            }

            // This website currently has no email service connected.
            // The form is validated, but no email is sent.
            showFormMessage(
                "Your form looks good! Email delivery is not connected yet. " +
                "Please contact Rida directly by email.",
                "success"
            );

            console.log("Contact form preview:", {
                name: name,
                email: email,
                subject: subject,
                message: message
            });
        });
    }


    // Helper function for contact form messages
    function showFormMessage(message, type) {
        if (!formMessage) {
            alert(message);
            return;
        }

        formMessage.textContent = message;
        formMessage.className = "form-message " + type;
        formMessage.style.display = "block";
        formMessage.setAttribute("role", "status");

        formMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }


    // 5. Add a small hover effect to social links
    const socialLinks = document.querySelectorAll(
        ".social-links a, .contact-social-box a"
    );

    socialLinks.forEach(function (link) {
        link.addEventListener("mouseenter", function () {
            this.style.transition = "transform 0.25s ease";
            this.style.transform = "translateY(-3px)";
        });

        link.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)";
        });
    });


    // 6. Highlight the current page in the navigation
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(function (link) {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });

});


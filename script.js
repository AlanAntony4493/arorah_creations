/* =========================================================
   ARORAH CREATIONS
   COMPLETE WEBSITE JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (menuToggle && mobileNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen = menuToggle.classList.toggle("open");

        mobileNav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    document.querySelectorAll(".mobile-nav a").forEach((link) => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("open");

            mobileNav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

}


/* =========================================================
   CUSTOM HAMPER FORM
========================================================= */

const hamperForm = document.getElementById("hamperForm");

const choiceButtons = document.querySelectorAll(".choice-btn");

const itemsField = document.getElementById("items");

const budgetField = document.getElementById("budget");

const customStyleWrapper =
    document.getElementById("customStyleWrapper");

const customStyleField =
    document.getElementById("customStyle");

const customOccasionWrapper =
    document.getElementById("customOccasionWrapper");

const customOccasionField =
    document.getElementById("customOccasion");


/* Store the customer's selections */

const selectedOptions = {
    style: "",
    occasion: ""
};


/* =========================================================
   CONDITIONAL FIELDS
========================================================= */

function updateConditionalFields() {

    /* Custom hamper style */

    if (customStyleWrapper && customStyleField) {

        const needsCustomStyle =
            selectedOptions.style === "Other";

        customStyleWrapper.hidden = !needsCustomStyle;

        customStyleField.required = needsCustomStyle;

        if (!needsCustomStyle) {
            customStyleField.value = "";
        }

    }


    /* Custom occasion */

    if (customOccasionWrapper && customOccasionField) {

        const needsCustomOccasion =
            selectedOptions.occasion === "Other";

        customOccasionWrapper.hidden = !needsCustomOccasion;

        customOccasionField.required = needsCustomOccasion;

        if (!needsCustomOccasion) {
            customOccasionField.value = "";
        }

    }

}


/* =========================================================
   CHOICE BUTTONS
========================================================= */

choiceButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const group = button.dataset.group;

        const value = button.dataset.value;

        if (!group || !value) {
            return;
        }


        /* Clear selections in the same group */

        document
            .querySelectorAll(
                `.choice-btn[data-group="${group}"]`
            )
            .forEach((item) => {

                item.classList.remove("selected");

                item.setAttribute("aria-pressed", "false");

            });


        /* Select the clicked button */

        button.classList.add("selected");

        button.setAttribute("aria-pressed", "true");


        /* Save the selection */

        selectedOptions[group] = value;


        /* Show or hide custom fields */

        updateConditionalFields();

    });

});


/* =========================================================
   WHATSAPP SETTINGS
========================================================= */

/*
   You can change the WhatsApp number later.

   For an Indian number, include the country code 91.

   Example format:
   919876543210

   Do not include:
   + sign
   Spaces
   Brackets
   Hyphens
*/

const WHATSAPP_NUMBER = "7306593124";


/* =========================================================
   OPEN WHATSAPP
========================================================= */

function openWhatsApp(message) {

    const encodedMessage = encodeURIComponent(message);

    const number = WHATSAPP_NUMBER.trim();

    const whatsappURL = number
        ? `https://wa.me/${number}?text=${encodedMessage}`
        : `https://wa.me/?text=${encodedMessage}`;


    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   CUSTOM HAMPER FORM SUBMISSION
========================================================= */

if (hamperForm) {

    hamperForm.addEventListener("submit", (event) => {

        event.preventDefault();


        /* Get form values */

        const style = selectedOptions.style;

        const occasion = selectedOptions.occasion;

        const items = itemsField
            ? itemsField.value.trim()
            : "";

        const budget = budgetField
            ? Number(budgetField.value)
            : 0;

        const customStyle = customStyleField
            ? customStyleField.value.trim()
            : "";

        const customOccasion = customOccasionField
            ? customOccasionField.value.trim()
            : "";


        /* Validate hamper style */

        if (!style) {

            alert("Please choose your hamper style.");

            return;

        }


        /* Validate custom style when Other is selected */

        if (style === "Other" && !customStyle) {

            alert("Please describe the hamper style you need.");

            if (customStyleField) {
                customStyleField.focus();
            }

            return;

        }


        /* Validate desired items */

        if (!items) {

            alert(
                "Please tell us what you would like included."
            );

            if (itemsField) {
                itemsField.focus();
            }

            return;

        }


        /* Validate budget */

        if (
            !Number.isFinite(budget) ||
            budget < 400
        ) {

            alert("Your hamper budget must be at least ₹400.");

            if (budgetField) {
                budgetField.focus();
            }

            return;

        }


        /* Validate occasion */

        if (!occasion) {

            alert("Please select the occasion.");

            return;

        }


        /* Validate custom occasion when Other is selected */

        if (occasion === "Other" && !customOccasion) {

            alert("Please describe the occasion.");

            if (customOccasionField) {
                customOccasionField.focus();
            }

            return;

        }


        /* Prepare the displayed style and occasion */

        const finalStyle = style === "Other"
            ? `Other - ${customStyle}`
            : style;

        const finalOccasion = occasion === "Other"
            ? `Other - ${customOccasion}`
            : occasion;


        /* Create the WhatsApp message */

        const message =

`Hi Arorah Creations! ♡

I'd like to create a custom hamper.

🎁 Hamper Style:
${finalStyle}

💰 My Budget:
₹${budget}

🎀 Occasion:
${finalOccasion}

💝 I'd like to include:
${items}

Please let me know the available options and details.

Thank you! ♡`;


        /* Open WhatsApp with the message */

        openWhatsApp(message);

    });

}


/* =========================================================
   WHATSAPP LINKS
   HEADER, CONTACT AND FOOTER
========================================================= */

const generalWhatsAppMessage =
    "Hi Arorah Creations! ♡ I'd like to know more about your gift hampers.";


document
    .querySelectorAll(
        'a[aria-label="WhatsApp"], #whatsappButton, .footer-socials a[href="#contact"]'
    )
    .forEach((link) => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            openWhatsApp(generalWhatsAppMessage);

        });

    });


/* =========================================================
   GALLERY LIGHTBOX SLIDESHOW
========================================================= */

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxClose = document.getElementById("lightboxClose");

const lightboxPrev = document.getElementById("lightboxPrev");

const lightboxNext = document.getElementById("lightboxNext");

const lightboxCounter = document.getElementById("lightboxCounter");

const galleryItems = Array.from(
    document.querySelectorAll(".gallery-item")
);


/* Current gallery image index */

let currentGalleryIndex = 0;


/* Touch swipe tracking */

let touchStartX = 0;

let touchStartY = 0;


/* Get image information from a gallery item */

function getGalleryImage(index) {

    const item = galleryItems[index];

    if (!item) {
        return null;
    }

    const image = item.querySelector("img");

    const imageSource =
        item.dataset.image ||
        (image ? image.src : "");

    const imageAlt =
        image
            ? image.alt
            : "Enlarged hamper";

    if (!imageSource) {
        return null;
    }

    return {
        source: imageSource,
        alt: imageAlt
    };

}


/* Update the displayed image and counter */

function showGalleryImage(index) {

    if (
        !lightbox ||
        !lightboxImage ||
        galleryItems.length === 0
    ) {
        return;
    }


    /* Wrap around when reaching either end */

    currentGalleryIndex =
        (index + galleryItems.length) % galleryItems.length;


    const imageData = getGalleryImage(currentGalleryIndex);

    if (!imageData) {
        return;
    }


    /* Display the selected image */

    lightboxImage.src = imageData.source;

    lightboxImage.alt = imageData.alt;


    /* Update the image counter */

    if (lightboxCounter) {

        lightboxCounter.textContent =
            `${currentGalleryIndex + 1} / ${galleryItems.length}`;

    }

}


/* Move to the next image */

function showNextGalleryImage() {

    if (!lightbox?.classList.contains("open")) {
        return;
    }

    showGalleryImage(currentGalleryIndex + 1);

}


/* Move to the previous image */

function showPreviousGalleryImage() {

    if (!lightbox?.classList.contains("open")) {
        return;
    }

    showGalleryImage(currentGalleryIndex - 1);

}


/* Close the lightbox */

function closeLightbox() {

    if (!lightbox) {
        return;
    }

    lightbox.classList.remove("open");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    if (lightboxImage) {

        lightboxImage.src = "";

        lightboxImage.alt = "Enlarged hamper";

    }


    document.body.style.overflow = "";

}


/* Open the slideshow at a particular image */

function openLightbox(index = 0) {

    if (
        !lightbox ||
        !lightboxImage ||
        galleryItems.length === 0
    ) {
        return;
    }


    /* Keep the index within the available gallery */

    currentGalleryIndex =
        Math.max(
            0,
            Math.min(index, galleryItems.length - 1)
        );


    showGalleryImage(currentGalleryIndex);


    lightbox.classList.add("open");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow = "hidden";

}


/* Open an image when a gallery item is clicked */

galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        openLightbox(index);

    });

});


/* Previous button */

if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            showPreviousGalleryImage();

        }
    );

}


/* Next button */

if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            showNextGalleryImage();

        }
    );

}


/* Close button */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            closeLightbox();

        }
    );

}


/* Close when clicking outside the image */

if (lightbox) {

    lightbox.addEventListener(
        "click",
        (event) => {

            if (event.target === lightbox) {

                closeLightbox();

            }

        }
    );

}


/* Keyboard navigation */

document.addEventListener(
    "keydown",
    (event) => {

        if (!lightbox?.classList.contains("open")) {
            return;
        }


        if (event.key === "Escape") {

            closeLightbox();

        } else if (event.key === "ArrowRight") {

            showNextGalleryImage();

        } else if (event.key === "ArrowLeft") {

            showPreviousGalleryImage();

        }

    }
);


/* Mobile swipe navigation */

if (lightbox) {

    lightbox.addEventListener(
        "touchstart",
        (event) => {

            if (!lightbox.classList.contains("open")) {
                return;
            }

            if (!event.touches.length) {
                return;
            }

            touchStartX = event.touches[0].clientX;

            touchStartY = event.touches[0].clientY;

        },
        { passive: true }
    );


    lightbox.addEventListener(
        "touchend",
        (event) => {

            if (!lightbox.classList.contains("open")) {
                return;
            }

            if (!event.changedTouches.length) {
                return;
            }


            const touchEndX =
                event.changedTouches[0].clientX;

            const touchEndY =
                event.changedTouches[0].clientY;


            const differenceX =
                touchEndX - touchStartX;

            const differenceY =
                touchEndY - touchStartY;


            /* Only treat horizontal gestures as image swipes */

            if (
                Math.abs(differenceX) > 50 &&
                Math.abs(differenceX) > Math.abs(differenceY)
            ) {

                if (differenceX < 0) {

                    showNextGalleryImage();

                } else {

                    showPreviousGalleryImage();

                }

            }

        },
        { passive: true }
    );

}


/* =========================================================
   GALLERY VIEW MORE
========================================================= */

const galleryViewButton =
    document.getElementById("galleryViewButton");


if (galleryViewButton) {

    galleryViewButton.addEventListener(
        "click",
        () => {

            openLightbox(0);

        }
    );

}


/* =========================================================
   ACTIVE DESKTOP NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const desktopNavLinks =
    document.querySelectorAll(
        ".desktop-nav a"
    );


if (
    sections.length &&
    desktopNavLinks.length
) {

    const updateActiveNav = () => {

        const scrollPosition =
            window.scrollY + 130;

        let currentSection = "home";


        sections.forEach((section) => {

            if (
                scrollPosition >= section.offsetTop
            ) {

                currentSection = section.id;

            }

        });


        desktopNavLinks.forEach((link) => {

            const isCurrent =
                link.getAttribute("href") ===
                `#${currentSection}`;


            link.classList.toggle(
                "active",
                isCurrent
            );

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    window.addEventListener(
        "resize",
        updateActiveNav
    );


    updateActiveNav();

}
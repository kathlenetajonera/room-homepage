const navbar = document.querySelector(".navbar");
const navicon = document.querySelector(".navicon");
const mobileMenu = document.querySelector(".menu");
const overlay = document.querySelector(".mobile-overlay");

const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const content = document.querySelectorAll(".content");
const imageContainer = document.querySelector(".image");

const lgMobileScreen = window.matchMedia("(min-width: 500px)");
const lgMobileSize = () => lgMobileScreen.matches;

let counter = 0;
let windowWidth = window.innerWidth;

updateContentBg(counter);

navicon.addEventListener("click", toggleMobileNav);

nextBtn.addEventListener("click", () => {
    counter < 2 ? counter++ : counter = 0;

    content.forEach(con => con.classList.remove("active", "fade-In", "fade-Out"));

    content[counter].classList.add("active", "fade-In");

    updateContentBg(counter);
})

prevBtn.addEventListener("click", () => {
    counter > 0 ? counter-- : counter = 2;

    content.forEach(con => con.classList.remove("active", "fade-Out", "fade-In"));

    content[counter].classList.add("active", "fade-Out");

    updateContentBg(counter);
})

function updateContentBg(contentIndex) {
    let isTablet = lgMobileSize();
    let currentIndex = contentIndex + 1;

    if (isTablet) {
        imageContainer.style.backgroundImage = `url(images/desktop-image-hero-${currentIndex}.jpg)`;
    } else {
        imageContainer.style.backgroundImage = `url(images/mobile-image-hero-${currentIndex}.jpg)`;
    }
}

function toggleMobileNav() {
    const isOpen = navicon.getAttribute("aria-expanded");

    if (isOpen == "true") {
        ariaExpandedFalse(navicon);
        removeActiveClass([navbar, mobileMenu, overlay]);
        enableScrolling();
    } else {
        ariaExpandedTrue(navicon);
        addActiveClass([navbar, mobileMenu, overlay]);
        disableScrolling();
    }
}

const ariaExpandedTrue = elem => elem.setAttribute("aria-expanded", "true");

const ariaExpandedFalse = elem => elem.setAttribute("aria-expanded", "false");

const addActiveClass = elem => elem.forEach(el => el.classList.add("active"));

const removeActiveClass = elem => elem.forEach(el => el.classList.remove("active"));

const disableScrolling = () => document.body.style.position = "fixed";

const enableScrolling = () => document.body.style.position = "";

window.addEventListener("resize", () => {
    if (window.innerWidth != windowWidth) {
        windowWidth = window.innerWidth;

        if (windowWidth > 768) {
            ariaExpandedFalse(navicon);
            removeActiveClass([navbar, mobileMenu, overlay]);
            enableScrolling();
        }
    }
})
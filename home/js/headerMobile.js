document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.querySelector(".header-mobile .mobile-menu-icon");
    const menuOverlay = document.querySelector(".header-mobile .mobile-menu-overlay");
    const menuContent = document.querySelector(".header-mobile .mobile-menu-content");
    const menuClose = document.querySelector(".header-mobile .mobile-menu-close");

    function openMenu() {
        menuOverlay.classList.add("open");
        menuContent.classList.add("open");
    }

    function closeMenu() {
        menuOverlay.classList.remove("open");
        menuContent.classList.remove("open");
    }

    if (menuIcon) {
        menuIcon.addEventListener("click", openMenu);
    }

    if (menuClose) {
        menuClose.addEventListener("click", closeMenu);
    }

    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeMenu);
    }
});

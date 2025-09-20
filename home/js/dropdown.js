document.addEventListener("DOMContentLoaded", () => {

    const containers = document.querySelectorAll("[data-dropdown-container]");

    containers.forEach(container => {
        const dropdownHeader = container.querySelector("[data-dropdown-header]");
        const dropdownContent = container.querySelector("[data-dropdown-content]");
        const dropdownArrow = container.querySelector("[data-dropdown-arrow]");

        dropdownHeader.addEventListener("click", () => {
            container.classList.toggle("open");
            dropdownArrow.classList.toggle("open");
        });
        
        // dropdownContent.addEventListener("click", () => {
        //     container.classList.toggle("open");
        //     dropdownArrow.classList.toggle("open");
        // });

    });

    document.addEventListener("click", (e) => {
        containers.forEach(container => {
            if (!container.contains(e.target)) {

                container.classList.remove("open");
                const arrow = container.querySelector("[data-dropdown-arrow]");
                if (arrow) arrow.classList.remove("open");
                
            }
        });
    });
});
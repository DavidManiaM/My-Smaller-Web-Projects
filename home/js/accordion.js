document.addEventListener("DOMContentLoaded", () => {

    const containers = document.querySelectorAll("[data-accordion-container]");
    containers.forEach(container => {
        const accordionHeader = container.querySelector("[data-accordion-header]");
        const accordionContent = container.querySelector("[data-accordion-content]");
        const accordionArrow = container.querySelector("[data-accordion-arrow]");

        accordionHeader.addEventListener("click", () => {
            container.classList.toggle("open");
            accordionArrow.classList.toggle("open");
        });
        
        // accordionContent.addEventListener("click", () => {
        //     container.classList.toggle("open");
        //     accordionArrow.classList.toggle("open");
        // });

    });

    // document.addEventListener("click", (e) => {
    //     containers.forEach(container => {
    //         if (!container.contains(e.target)) {

    //             container.classList.remove("open");
    //             const arrow = container.querySelector("[data-accordion-arrow]");
    //             if (arrow) arrow.classList.remove("open");
                
    //         }
    //     });
    // });
});
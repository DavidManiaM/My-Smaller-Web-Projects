const bubbleContainers = document.querySelectorAll("[data-bubble-container]");
bubbleContainers.forEach(container => {

    for(let i = 0; i < 20; i++){

        const radius = Math.floor(Math.random() * 5 + 3);
        const top = Math.floor(Math.random() * container.clientHeight);
        const left = Math.floor(Math.random() * container.clientWidth);
        const opacity = Math.random() * 0.5 + 0.3;
        const animationTime = Math.random() * 0.5 + 1;
        
        console.log(container.clientWidth, top, left);

        container.insertAdjacentHTML("beforeend", `
                <div class="bubble" style="
                    width: ${radius}px;
                    height: ${radius}px;
                    background-color: ${container.dataset.color};
                    top: ${top}px;
                    left: ${left}px;
                    opacity: ${opacity};
                    animation: float ${animationTime}s cubic-bezier(.45, .05, .55, .95) infinite;
                "/>
            `);
    }
    
});
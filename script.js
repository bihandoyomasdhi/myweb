let activeScrollFrame = null;

function getScrollTop(targetElement) {
    if (targetElement.id === "home") {
        return 0;
    }

    return targetElement.offsetTop;
}

function easeInOutCubic(progress) {
    if (progress < 0.5) {
        return 4 * progress * progress * progress;
    }

    return 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function animateScrollTo(targetTop, duration = 1000) {
    if (activeScrollFrame) {
        cancelAnimationFrame(activeScrollFrame);
    }

    const startTop = window.scrollY;
    const distance = targetTop - startTop;
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentTop = startTop + distance * easeInOutCubic(progress);

        window.scrollTo(0, currentTop);

        if (progress < 1) {
            activeScrollFrame = requestAnimationFrame(animate);
            return;
        }

        activeScrollFrame = null;
    }

    activeScrollFrame = requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href="#home"], a[href="#model"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (!targetElement) return;

            event.preventDefault();

            const targetTop = getScrollTop(targetElement);

            animateScrollTo(targetTop);
            history.pushState(null, "", targetId);
        });
    });
});

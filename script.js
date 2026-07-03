function smoothScroll(target, duration = 800) {
    const element = document.querySelector(target);

    // Cek apakah elemen ada
    if (!element) return;

    const start = window.pageYOffset;
    const end = element.getBoundingClientRect().top + start;
    const distance = end - start;

    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;

        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Ease In Out
        const ease =
            progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, start + distance * ease);

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}
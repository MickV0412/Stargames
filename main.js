// Simple diagonal falling starfield using canvas

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const STAR_COUNT = 180;
const stars = [];

function createStar() {
    const speed = 0.8 + Math.random() * 2.2;
    const length = 30 + Math.random() * 80;

    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed,
        length,
        thickness: 0.6 + Math.random() * 1.2,
        opacity: 0.3 + Math.random() * 0.7,
    };
}

for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(createStar());
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((-18 * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    for (const star of stars) {
        const gradient = ctx.createLinearGradient(
            star.x,
            star.y,
            star.x,
            star.y + star.length
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${star.opacity})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.thickness;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x, star.y + star.length);
        ctx.stroke();

        star.y += star.speed;

        if (star.y - star.length > canvas.height) {
            star.x = Math.random() * canvas.width;
            star.y = -Math.random() * canvas.height * 0.3;
            star.speed = 0.8 + Math.random() * 2.2;
            star.length = 30 + Math.random() * 80;
            star.thickness = 0.6 + Math.random() * 1.2;
            star.opacity = 0.3 + Math.random() * 0.7;
        }
    }

    ctx.restore();
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

// Logo reveal and auto scroll on load (only runs on index.html)
window.addEventListener("load", () => {
    const logoWrapper = document.querySelector(".logo-wrapper");
    const targetScrollSection =
        document.getElementById("games") || document.querySelector("main");

    if (logoWrapper) {
        requestAnimationFrame(() => {
            logoWrapper.classList.add("is-visible");
        });
    }

    // Only auto-scroll on the landing page (where the hero logo exists)
    if (logoWrapper && targetScrollSection) {
        const ANIMATION_MS = 1600;
        const EXTRA_DELAY_MS = 600;

        setTimeout(() => {
            targetScrollSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, ANIMATION_MS + EXTRA_DELAY_MS);
    }
});
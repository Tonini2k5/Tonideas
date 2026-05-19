const text = `
No soy muy bueno diciendo estas cosas,
pero quería hacer algo bonito para ti.

Gracias por estar conmigo,
por hacer mis días mejores,
incluso cuando no te das cuenta.

Tal vez esto no sea perfecto,
pero está hecho con mucho cariño.

`;

const typedText = document.getElementById("typedText");
const openBtn = document.getElementById("openBtn");
const letter = document.getElementById("letter");
const music = document.getElementById("music");
const intro = document.querySelector(".intro");
const envelopeTop = document.querySelector(".envelope-top");
const closeBtn = document.getElementById("closeBtn");
const flowers = document.getElementById("flowers");
const magicLayer = document.getElementById("magicLayer");

const magicFigures = [
    "❤️",
    "🐱",
    "🐼",
    "🌲",
    "🏍️",
    "🏆",
    "🥇",
    "✏️",
    "🐻",
    "🐶",
    "🌹",
    "⭐",
    "✨",
    "💌",
    "👩‍❤️‍👨",
    "💙",
    "💘",
    "💞",
    "Te amooo",
    "Reina",
    "Te quierooo",
    "I love you",
    "Carlitaaaa",
    "muuuuaaack",
    "LOCA💖",
    "#TeOdioSamuel",
    "Nerita linda🫠",
    "Contigo, siempre",
    "Mi todo",
    "Solo tú",
    "Bebé hermosa",
    "mi todo🫶"
];

const fireworkColors = [
    "#ff3b3b",
    "#ff6b9a",
    "#ffd1dc",
    "#ffffff",
    "#7dd3fc",
    "#86efac",
    "#facc15"
];

const flowerEmojis = ["🌸", "🌼", "🌷", "🌹"];

let isOpen = false;
let flowerInterval = null;
let typingTimeout = null;
let fadeInterval = null;

openBtn.addEventListener("click", () => {

    if (isOpen) return;

    isOpen = true;

    stopFlowers();

    flowers.innerHTML = "";
    flowers.style.opacity = "0";
    flowers.classList.add("hidden");

    document.body.classList.remove("magic-active");
    magicLayer.innerHTML = "";

    envelopeTop.style.transform = "rotateX(180deg)";

    music.play().catch(() => { });

    setTimeout(() => {

        letter.classList.remove("hidden");
        typedText.textContent = "";

        typeWriter(text, typedText);

        intro.style.opacity = "0";

        setTimeout(() => {
            intro.style.display = "none";
        }, 1500);

    }, 1200);

});

function typeWriter(text, element, speed = 40) {

    let i = 0;

    function typing() {

        if (i < text.length) {

            element.textContent += text.charAt(i);

            i++;

            typingTimeout = setTimeout(typing, speed);
        }

    }

    typing();
}

closeBtn.addEventListener("click", () => {

    isOpen = false;

    clearTimeout(typingTimeout);
    clearInterval(fadeInterval);

    letter.classList.add("hidden");

    intro.style.display = "flex";

    envelopeTop.style.transform = "rotateX(0deg)";

    setTimeout(() => {
        intro.style.opacity = "1";
    }, 50);

    flowers.classList.remove("hidden");
    flowers.style.opacity = "1";

    startFlowers();

    document.body.classList.add("magic-active");

});

function startFlowers() {

    if (flowerInterval) return;

    flowerInterval = setInterval(createFlower, 900);
}

function stopFlowers() {

    clearInterval(flowerInterval);
    flowerInterval = null;
}

function createFlower() {

    const flower = document.createElement("div");

    flower.classList.add("flower");

    const innerFlower = document.createElement("span");

    innerFlower.classList.add("flower-inner");

    innerFlower.innerText =
        flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];

    flower.appendChild(innerFlower);

    flower.style.left = "-10vw";
    flower.style.bottom = "15px";
    flower.style.animationDuration =
        (12 + Math.random() * 8) + "s";

    flowers.appendChild(flower);

    setTimeout(() => {
        flower.remove();
    }, 20000);
}

window.addEventListener("pointerdown", (e) => {

    if (!document.body.classList.contains("magic-active")) return;

    if (isOpen) return;

    if (e.target.closest("button")) return;

    createMagic(e.clientX, e.clientY);

});

function createMagic(x, y) {

    const magic = document.createElement("div");

    magic.classList.add("magic-item");

    const content =
        magicFigures[Math.floor(Math.random() * magicFigures.length)];

    magic.innerText = content;

    magic.style.left = x + "px";
    magic.style.top = y + "px";

    const color =
        fireworkColors[Math.floor(Math.random() * fireworkColors.length)];

    magic.style.color = color;
    magic.style.textShadow = `
        0 0 12px ${color},
        0 0 28px ${color},
        0 0 45px rgba(255,255,255,0.4)
    `;

    magicLayer.appendChild(magic);

    createSparkles(x, y);

    setTimeout(() => {
        magic.remove();
    }, 2600);
}

function createSparkles(x, y) {

    const amount = 18;

    for (let i = 0; i < amount; i++) {

        const sparkle = document.createElement("span");

        sparkle.classList.add("sparkle");

        const angle = (Math.PI * 2 * i) / amount;
        const distance = 35 + Math.random() * 45;

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        const color =
            fireworkColors[Math.floor(Math.random() * fireworkColors.length)];

        sparkle.style.left = x + "px";
        sparkle.style.top = y + "px";
        sparkle.style.background = color;
        sparkle.style.boxShadow = `0 0 12px ${color}`;

        sparkle.style.setProperty("--x", moveX + "px");
        sparkle.style.setProperty("--y", moveY + "px");

        magicLayer.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1200);
    }
}
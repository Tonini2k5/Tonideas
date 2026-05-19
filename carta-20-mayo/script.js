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
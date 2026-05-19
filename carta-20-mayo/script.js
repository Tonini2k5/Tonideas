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

let isOpen = false;

openBtn.addEventListener("click", () => {

    if (isOpen) return;

    isOpen = true;

    stopFlowers();

    // Abrir sobre
    envelopeTop.style.transform = "rotateX(180deg)";

    // Música
    music.play().catch(() => { });

    // Esperar antes de mostrar carta
    setTimeout(() => {

        // Mostrar carta
        letter.classList.remove("hidden");
        typedText.innerHTML = "";

        typeWriter(text, typedText);

        // Desvanecer intro
        intro.style.opacity = "0";

        // Ocultar intro
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

            setTimeout(typing, speed);
        }

    }

    typing();
}

closeBtn.addEventListener("click", () => {

    isOpen = false;

    // Ocultar carta
    letter.classList.add("hidden");

    // Mostrar intro nuevamente
    intro.style.display = "flex";

    envelopeTop.style.transform = "rotateX(0deg)";

    setTimeout(() => {
        intro.style.opacity = "1";
    }, 50);

    // Mostrar flores
    flowers.classList.remove("hidden");

    flowers.style.opacity = "1";

    startFlowers();

});

const flowerEmojis = ["🌸", "🌼", "🌷", "🌹"];

let flowerInterval = null;

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

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

openBtn.addEventListener("click", () => {

    // Abrir sobre
    envelopeTop.style.transform = "rotateX(180deg)";

    // Música
    music.play();

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

            element.innerHTML += text.charAt(i);

            i++;

            setTimeout(typing, speed);
        }

    }

    typing();
}
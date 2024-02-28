const cardsContainer = document.querySelector('.cards');
const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "navy",
    "purple",
    "teal",
];

const colorPicklist = [...colors, ...colors];
const cardCount = colorPicklist.length;

let revealedCount = 0;
let activeCard = null;
let awaitingEndOfMove = false;


function buildCard(color) {
    const element = document.createElement('div');

    element.classList.add('card');
    element.setAttribute('data-color', color);
    element.setAttribute('data-revealed', 'false');

    element.addEventListener("click", function () {
        const revealed = element.getAttribute('data-revealed');

        if (awaitingEndOfMove || revealed === "true" || element === activeCard) {
            return;
        }

        element.style.backgroundColor = color;

        if (!activeCard) {
            activeCard = element;

            return;
        }

        const colorToMatch = activeCard.getAttribute('data-color');

        if (colorToMatch === color) {
            activeCard.setAttribute('data-revealed', 'true');
            element.setAttribute('data-revealed', 'true');

            activeCard = null;
            awaitingEndOfMove = false;
            revealedCount += 2;

            if (revealedCount === cardCount) {
                alert("Congrats! If you want to play again, refresh the page !!!");
            }
            return;
        }

        awaitingEndOfMove = true;

        setTimeout(function () {
            element.style.backgroundColor = null;
            activeCard.style.backgroundColor = null;

            awaitingEndOfMove = false;
            activeCard = null;
        }, 1000);
    });

    return element;
}

for (let i = 0; i < cardCount; i++) {
    const randomIndex = Math.floor(Math.random() * colorPicklist.length);
    const color = colorPicklist[randomIndex];
    const card = buildCard(color);

    colorPicklist.splice(randomIndex, 1);
    cardsContainer.appendChild(card);
}
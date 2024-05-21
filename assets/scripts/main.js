let playerTurn = true;
let gameRunning = true;
const fightStatusElement = document.getElementById("fightStatus");

let hero = {
    name: "Shadow Shaman",
    image: ".jpg",
    health: 100,
    attacks: [
        {
            name: "Entity sap",
            dialogue: "tsaaaap",
        },
        {
            name: "Shadow shard",
            dialogue: "shhaaaaaa",
        },
        {
            name: "Ancient gloop",
            dialogue: "gluuuuuuh",
        },
    ],
    attack() {
        return Math.ceil(Math.random() * 30);
    },
    die() {
        fightStatusElement.innerText = `"Shadow shaman got banished into the shadow realm!"`;
    },
};

let villain = {
    name: "Mad goblin",
    image: ".jpg",
    health: 100,
    attacks: [
        {
            name: "Double fists",
            dialogue: "oof, arr",
        },
        {
            name: "Rolly-polly",
            dialogue: "uuurgh",
        },
        {
            name: "Thrown dagger",
            dialogue: "feeeyuuu",
        },
    ],
    attack() {
        let damage = Math.ceil(Math.random() * 30);
        let attack = Math.floor(Math.random() * 3);
        return [damage, this.attacks[attack]];
    },
    die() {
        fightStatusElement.innerText = `"Mad goblin looked up to the sky, then collapsed"`;
    },
};

const mainHeadingElement = document.getElementById("mainHeading");
mainHeadingElement.innerText = `${hero.name} vs ${villain.name}`;

const heroNameElement = document.getElementById("heroName");
heroNameElement.innerText = hero.name;

const heroHealthElement = document.getElementById("heroHealth");
heroHealthElement.innerText = hero.health;

const heroImageElement = document.getElementById("heroImage");
heroImageElement.src = hero.image;

const villainNameElement = document.getElementById("villainName");
villainNameElement.innerText = villain.name;

const villainHealthElement = document.getElementById("villainHealth");
villainHealthElement.innerText = villain.health;

const villainImageElement = document.getElementById("villainImage");
villainImageElement.src = villain.image;

const buttonElements = document.getElementsByTagName("button");
for (let i = 0; i < buttonElements.length; i++) {
    buttonElements[i].innerText = hero.attacks[i].name;
    buttonElements[i].setAttribute("data-attack-name", hero.attacks[i].name);

    buttonElements[i].addEventListener('click', function () {
        if (playerTurn && gameRunning) {
            let damage = hero.attack();
            villain.health -= damage;
            villainHealthElement.innerText = villain.health;
            fightStatusElement.innerText = `${hero.name} used his ${this.getAttribute("data-attack-name")} attack and dealt ${damage} damage!`;
            playSound(this.getAttribute("data-attack-name"));
            playerTurn = false;
            checkGameOver();
            setTimeout(villainTurn, 5000);
        }
    });
}

function villainTurn() {
    if (gameRunning) {
        let attackInfo = villain.attack();
        hero.health -= attackInfo[0];
        heroHealthElement.innerText = hero.health;
        fightStatusElement.innerText = `${villain.name} used his ${attackInfo[1].name} attack and dealt ${attackInfo[0]} damage!`;
        playSound(attackInfo[1].name);
        checkGameOver();
        playerTurn = true;
    }
}

function checkGameOver() {
    if (hero.health <= 0) {
        hero.die();
        gameRunning = false;
    }
    else if (villain.health <= 0) {
        villain.die();
        gameRunning = false;
    }
}

function playSound(fileName) {
    let sound = new Audio(`assets/sounds/${fileName}.mp3`);
    sound.play();
}
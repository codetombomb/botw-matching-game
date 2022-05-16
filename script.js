document.addEventListener("DOMContentLoaded", () => {
    getMonsters()
})

// X Fetch monster cards 
// X ---- Select difficulty
// X ---- Hard (32) - Med (16) - Easy (8)
//---- Amount of lives varies based on difficulty
//----   Hard (6) - Med (6) - Easy (6)
//---- Amount of cards varies based on difficulty
// Start button! 
//---- Render cards based
// --- 

const gameConfig = {
    monsterCards: null,
    difficulty: null,
    hard: 32,
    medium: 16,
    easy: 8,
    hearts: 6,
    difficultyOptions: ["Hard", "Medium", "Easy"],
    cardMap: [],
    isSecondSelection: false,
    cardLookup: {}
}

async function getMonsters() {
    await fetch("https://botw-compendium.herokuapp.com/api/v2/all")
        .then(resp => resp.json())
        .then(({ data }) => {
            gameConfig.monsterCards = data.monsters
            renderSelectDifficulty(gameConfig.difficultyOptions)
        })
        .catch(err => console.log(err))
}

function renderSelectDifficulty(levels) {
    renderTitle("Select difficulty:", ["select-difficulty-title"], document.querySelector('main'))
    const buttons = levels.map(level => createButton(level, "difficulty-button", handleDifficultyButtonClick))
    buttons.forEach(button => document.querySelector("main").appendChild(button))
}

function renderTitle(content, classList, element) {
    const title = document.createElement("h1")
    title.textContent = content
    classList.forEach(cls => title.classList.add(cls))
    element.appendChild(title)
}

function createButton(info, clsName, callback) {
    const button = document.createElement('button')
    button.textContent = info
    button.className = clsName
    button.addEventListener("click", callback)
    return button
}

function handleDifficultyButtonClick(e) {
    gameConfig.difficulty = e.target.textContent
    clearMain()
    document.querySelector("main").append(createButton("Start", "start-button", startGame))
}

function clearMain() {
    document.querySelector("main").innerHTML = ''
}

function renderCards() {
    populateCardMap()
    const main = document.querySelector("main")
    main.style.flexDirection = "row"
    main.style.flexWrap = "wrap"
    const doubleCards = [...gameConfig.cardMap, ...gameConfig.cardMap]
    const shuffled = shuffleCards(doubleCards)
    shuffled.forEach(card => {
        document.querySelector("main").append(createImg(card))
    })
}

function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
    return cards
}

function createImg(info) {
    const img = document.createElement('img')
    img.src = info.image
    img.className = "card"
    img.addEventListener("click", flipCard)
    return img
}

function populateCardMap() {
    gameConfig[gameConfig.difficulty.toLowerCase()] === gameConfig.cardMap.length
    while (gameConfig[gameConfig.difficulty.toLowerCase()] / 2 !== gameConfig.cardMap.length) {
        let card = gameConfig.monsterCards[Math.floor(Math.random() * 81) + 1];
        if (!gameConfig.cardLookup[card.name]) {
            gameConfig.cardLookup[card.name] = card
            gameConfig.cardMap.push(card)
        }
    }
}

function flipCard() {
    console.log("flipping card");
}

function renderTimer() {
    console.log('rendering timer');
}

function startGame() {
    clearMain()
    renderCards()
    renderHearts()
}

function stopGame() {

}

function renderHearts() {
    console.log("rendering hearts");
    for (let i = 0; i < gameConfig.hearts; i++) {
        const hearts = document.querySelector("#hearts")
        const heartImg = document.createElement("img")
        heartImg.className = "heart"
        heartImg.src = './assets/zelda-heart.png'
        hearts.append(heartImg)
    }
}
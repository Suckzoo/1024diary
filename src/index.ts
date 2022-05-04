import { GameInstance } from "./game";

interface ViewportSize {
    width: number,
    height: number
}
function getProperViewportSize(): ViewportSize {
    let gameHeight = window.innerHeight, gameWidth = window.innerWidth;
    if (window.innerHeight > window.innerWidth * 3 / 4) {
        gameHeight = window.innerWidth * 3 / 4;
    }
    else if (window.innerWidth > window.innerHeight * 4 / 3) {
        gameWidth = window.innerHeight * 4 / 3
    } else {
        gameHeight = gameWidth * 3 / 4
    }
    document.getElementById("container").style.width = `${gameWidth}px`;
    document.getElementById("container").style.height = `${gameHeight}px`;
    return {
        width: gameWidth,
        height: gameHeight
    }
}

function runGame() {
    alert(1);
    const {width, height} = getProperViewportSize();
    const game = GameInstance(document.getElementById("container"), width, height);
    game.run();
    window.addEventListener('resize', () => {
        const {width: currWidth, height: currHeight} = getProperViewportSize();
        document.getElementById("container").style.width = `${currWidth}px`;
        document.getElementById("container").style.height = `${currHeight}px`;
        game.applyScreenResize(currWidth, currHeight);
    })
};

runGame();
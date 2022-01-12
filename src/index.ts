import { PIXIGame } from "./game";

(function () {
    const myGame = new PIXIGame({
        documentBody: document.body,
        width: 800,
        height: 600
    });
    myGame.load();
    myGame.run();
})();
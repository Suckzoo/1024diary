import { GameInstance } from "./game";

(function () {
    const game = GameInstance(document.body, 800, 600);
    game.run();
})();
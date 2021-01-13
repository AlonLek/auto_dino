class Orchestrator {
    constructor(game) {
        this.game = game;
    }


    run(mode, isJumping) {
        if (mode === 'auto') {
            let isJumping = true;
            console.log(this.game.getState());

            this.game.update(isJumping);
            this.game.render();
        }

        if (mode === 'manual') {
            this.game.update(isJumping);
            this.game.render();
        }

    }


}

class Orchestrator {
    constructor(game) {
        this.game = game;
    }


    run(mode, isJumping) {
        if (mode === 'auto') {
            let isJumping = true;
            state = this.game.getState();
            reward = this.game.getReward();

            this.game.update(isJumping);
            this.game.render();
        }

        if (mode === 'manual') {
            this.game.update(isJumping);
            this.game.render();
        }

    }


}

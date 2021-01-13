class Orchestrator {
    constructor(game) {
        this.game = game;
    }


    run() {
        let is_jumping = true;
        console.log(this.game);
        if (this.game.jump_velocity > 0){

            is_jumping = false;
        }

        this.game.update(is_jumping);

    }


}

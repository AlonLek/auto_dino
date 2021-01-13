
class Dino{
	constructor(){
		this.h = 0;
		this.v = 0;

		this.maxHeight = 200;
		this.timeToApex = 0.4 * 1000 / 50;
		this.minGravity = (2 * this.maxHeight / (this.timeToApex*this.timeToApex))
		this.jumpVelocity = this.timeToApex * this.minGravity
		
		this.boundary = 48;

		this.el = null;
	}
	
	update(isJumping){
		const acceleration = isJumping ? -this.minGravity : -2 * this.minGravity;
		if (isJumping && this.h < 5)
			this.v = this.jumpVelocity;

		this.v += acceleration;

		this.h += this.v;
		if (this.h <= 0){
			this.h = 0;
		}

		this.render();
	}
	
	render(){
		if (this.el === null){
			 this.el = buildDino();
			const gameEl = document.getElementById('game');
			gameEl.appendChild(this.el);
		}
		
		this.el.style.bottom = this.h;
		this.el.style.left = 0;
	}
}

class Cactus{
	constructor(x){
		this.x = x;

		this.height = 62;
		this.el = null;
	}
	
	update(){
		this.x -= 20;
		this.render();
	}
	
	render(){
		if (this.el === null){
			this.el = buildCactus();
			const gameEl = document.getElementById('game');
			gameEl.appendChild(this.el);
		}
		this.el.style.left = this.x;
		this.el.style.bottom = 0;
	}
	
	destroy(){
		const gameEl = document.getElementById('game');
		gameEl.removeChild(this.el);
	}
}

class Game{
	constructor(){
		this.maxCactus = 2;
		this.dino = new Dino();
		this.score = 0;
		this.currentCactii = new Set();
		for(let i=0;i<this.maxCactus;i++){
			let cactus = new Cactus(Math.round(300 + Math.random()*900));
			this.currentCactii.add(cactus);
		}
		this.dead = false;
		
		this.gameOverMessage = null;
		this.scoreMessage = null;
	}

	update(isJumping){
		if (this.dead) return;
		this.dino.update(isJumping);
		for (let cact of this.currentCactii){
			cact.update();
			if (cact.x <= 0){
				cact.destroy();
				this.currentCactii.delete(cact);
				this.score++;
			}
			if(cact.x <= this.dino.boundary && this.dino.h < cact.height){
				this.dead = true;
			}
		}
		if (this.currentCactii.size < this.maxCactus && Math.random() < 0.05){
			let cactus = new Cactus(1000);
			this.currentCactii.add(cactus);
		}
	}
	
	getScore(){
		return this.score;
	}
	
	startRendering(){
		const gameEl = document.getElementById('game');
		gameEl.innerHTML = '';
	}
	
	render(){
		this.dino.render();
		for (let cact of this.currentCactii){
			cact.render();
		}
		if (this.scoreMessage === null){
			const gameEl = document.getElementById('game');
			this.scoreMessage = document.createElement('div');
			this.scoreMessage.classList.add('score');
			gameEl.appendChild(this.scoreMessage);
		}

		this.scoreMessage.innerText = 'Score: ' + this.getScore();
		
		if (this.dead && this.gameOverMessage === null){
			const gameEl = document.getElementById('game');
			this.gameOverMessage = document.createElement('div');
			this.gameOverMessage.classList.add('message');
			this.gameOverMessage.appendChild(buildFromText('GAME OVER\nPress R to restart', 'p'));
			gameEl.appendChild(this.gameOverMessage);
		}
	}
}
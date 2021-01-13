
class Dino{
	constructor(){
		this.h = 0;
		this.v = 0;

		this.max_height = 200;
		this.time_to_apex = 0.4 * 1000 / 50;
		this.min_gravity = (2 * this.max_height / (this.time_to_apex*this.time_to_apex))
		this.jump_velocity = this.time_to_apex * this.min_gravity
		
		this.boundary = 48;

		this.el = null;
	}
	
	update(is_jumping){
		const acceleration = is_jumping ? -this.min_gravity : -2 * this.min_gravity;
		if (is_jumping && this.h < 5)
			this.v = this.jump_velocity;

		this.v += acceleration;

		this.h += this.v;
		if (this.h <= 0){
			this.h = 0;
		}

		this.render();
	}
	
	render(){
		if (this.el == null){
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

		this.el = buildCactus();
		this.update_el();
		const gameEl = document.getElementById('game');
		gameEl.appendChild(this.el);
		this.height = this.el.offsetHeight;
	}
	
	update(){
		this.x -= 20;
		this.update_el();
	}
	
	update_el(){
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
		const gameEl = document.getElementById('game');
		gameEl.innerHTML = '';

		this.maxCactus = 2;
		this.dino = new Dino();
		this.currentCactii = new Set();
		for(let i=0;i<this.maxCactus;i++){
			let cactus = new Cactus(Math.round(300 + Math.random()*900));
			this.currentCactii.add(cactus);
		}
		this.dead = false;
	}
	
	update(is_jumping){
		if (this.dead) return;
		this.dino.update(is_jumping);
		for (let cact of this.currentCactii){
			cact.update();
			if (cact.x <= 0){
				cact.destroy();
				this.currentCactii.delete(cact);
			}
			if(cact.x <= this.dino.boundary && this.dino.h < cact.height){
				console.log('dead');
				this.end();
			}
		}
		if (this.currentCactii.size < this.maxCactus && Math.random() < 0.05){
			let cactus = new Cactus(1000);
			this.currentCactii.add(cactus);
		}
	}
	
	render(){
		
	}
	
	end(){
		this.dead = true;
		const gameEl = document.getElementById('game');
		let message = document.createElement('div');
		message.classList.add('message');
		message.appendChild(buildFromText('GAME OVER\nPress R to restart', 'p'));
		gameEl.appendChild(message);
	}
}
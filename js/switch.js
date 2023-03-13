/*語言切換選單*/
$('.switch-list').hide()
$('.language-pack').click(function(e){
    e.stopPropagation();
    $('.switch-list').toggle(300, 'linear')
})
$("body").click(function(){
    $('.switch-list').hide()
})
$('.switch-list').click(function(e){
    e.stopPropagation();
})

/*語言圖示hover變色*/
$('.language-pack').hover(function(){
	$('.switch-icon').attr("src","images/language/icon_language_hover.svg");
},
function(){
	$('.switch-icon').attr("src","images/language/icon_language.svg");

});

/*滑動至最上方*/
$('.top_btn').hide();
		$(window).scroll(function() {
			var sh = $(window).scrollTop();
			if(sh > 150) {
				$('.top_btn').show(500, 'swing');
			}else {
				$('.top_btn').hide(500, 'swing');
			}
		});
		
		$('.top_btn').click(function() {
			$('html,body').animate({
				scrollTop : 0 //到最上面  
			}, 500);
		return false;
		});
var scaleItem = document.querySelector('.bnTitle');

/*獎金跳動動畫每2.5秒一次*/
const animate = document.querySelector('.award');
animate.classList.add('fuyofuyo');
animate.addEventListener('animationend', () => {
animate.classList.remove('fuyofuyo');  
setTimeout(function(){
animate.classList.add('fuyofuyo');
},2500)
})


// scaleItem.classList.add('effect');

// scaleItem.addEventListener('animationend', ()=>{
// 	scaleItem.classList.remove('effect');
// 	setTimeout(function(){
// 		scaleItem.classList.add('effect');
// 	},3000)
// })

// var pig = document.querySelector('.connect-part');
anime({
	targets: scaleItem,
	scale: [0,1],
	rotate: [360,0],
	duration: 700,
	delay: 300,
	easing: 'spring(1, 80, 10, 0)',
	complete: function () {
        animationDone = true;
		animateAdd();
    }   
  });
function animateAdd(){
	scaleItem.classList.add('float');
}

// ------------------------------ particles
const randomBetween = (min, max) => ~~(Math.random() * (max - min + 1)) + min;

const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
const PI2 = Math.PI * 2;

// all set in `setStage`
let canvasWidth;
let canvasHeight;
let canvasMidX;
let canvasMidY;

let particles = [];

let rafId = null;
let timeoutId = null;
let automate = true;
let tick = 0;
let frame = 0;

noise.seed(Math.random());

class Particle {
	constructor(options) {
		const defaults = { x: 0, y: 0, radius: 10, direction: 0, velocity: 0, explode: false };

		Object.assign(this, defaults, options);

		this.velX = Math.cos(this.direction) * this.velocity;
		this.velY = Math.sin(this.direction) * this.velocity;

		this.friction = 0.9;
		this.decay = randomBetween(95, 91) * 0.01; //9091
		this.gravity = this.radius * 0.01;
	}

	update() {
		this.x += this.velX;
		this.y += this.velY;

		this.velX *= this.friction;
		this.velY *= this.friction;
		this.velocity *= this.friction;

		// uncomment for a gravity like effect
		// this.velY += this.gravity;

		this.radius *= this.decay;
		this.gravity += 0.05;
	}
}

const clear = () => {
	ctx.globalCompositeOperation = 'destination-out';
	ctx.fillStyle = 'hsla(0, 0%, 0%, 0.8)';
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.globalCompositeOperation = 'lighter';
}

const setStage = () => {
	clear();

	canvasWidth = window.innerWidth;
	canvasHeight = window.innerHeight;
	midX = canvasWidth >> 1;
	midY = canvasHeight >> 1;

	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	if(canvasWidth < 1000){
		canvas.height = canvasWidth;
	}
}

const createRandomParticles = () => {
	const margin = 100;
	const x = randomBetween(margin, canvasWidth - margin);
	const y = randomBetween(margin, canvasHeight - margin);

	createParticles(x, y);
}

const boom = (e) => {
	createParticles(e.clientX, e.clientY);
}

const createParticles = (x, y) => {
	let numParticles = 50; //50

	while (numParticles--) {
		const direction = Math.random() * PI2;
		const velocity = randomBetween(10, 20);
		const radius = 10 + (Math.random() * 20);
		const explode = true;
		const particle = new Particle({
			x,
			y,
			direction,
			velocity,
			radius,
			explode
		});

		particles.push(particle);
	}
}

const loop = () => {
	clear();

	if (automate && frame % 75 === 0) {
		createRandomParticles();
	}

	particles.forEach((particle, index) => {
		// determine color
		// const hue = (noise.perlin2(tick, tick) * 360);
		// const hue = (noise.perlin2(0.7, 0.1) * 360);${parseInt(Math.random()*255)}
		const fill = `hsl(${parseInt(Math.random()*65)}, 80%, 50%)`;

		// draw and update every existing particle
		ctx.beginPath();
		ctx.fillStyle = fill;
		ctx.arc(particle.x, particle.y, particle.radius, 0, PI2);
		ctx.fill();
		ctx.closePath();

		// update particle's properties
		particle.update();

		// check if particle should explode and create new particles
		if (Math.abs(particle.radius) <= 3 && particle.explode) {
			particle.explode = false;
			let children = 30;

			while (children--) {
				particles.push(new Particle({
					x: particle.x,
					y: particle.y,
					radius: particle.radius * 4,
					direction: Math.random() * PI2,
					velocity: particle.velocity * (randomBetween(2, 10)),
					explode: false
				}));
			}
		}

		if (particle.radius <= 0.1 || particle.velocity <= 0.1) {
			particles.splice(particles.indexOf(particle), 1);
		}
	});

	tick += 0.01;

	frame++;
	rafId = requestAnimationFrame(loop);
}


canvas.addEventListener('mouseout', (e) => {
	automate = true;
});
canvas.addEventListener('mouseover', (e) => {
	automate = false;
});

canvas.addEventListener('mousedown', boom);
window.addEventListener('resize', setStage);
canvas.style.zIndex ='15'
// canvas.style.mixBlendMode ="screen"

// document.body.appendChild(canvas);


setStage();
createRandomParticles();
loop();
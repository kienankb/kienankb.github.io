let WINDOW_WIDTH = 640;
let WINDOW_HEIGHT = 480;

window.addEventListener('DOMContentLoaded', (event) => {
	draw();
});

class Point {
	constructor() {
		this.x = Math.random() * WINDOW_WIDTH;
		this.y = Math.random() * WINDOW_HEIGHT;
		this.v = Math.random() * 360;
	}
}

function draw() {
	var elem = document.getElementById('draw-shapes');
	var two = new Two({ width: WINDOW_WIDTH, height: WINDOW_HEIGHT }).appendTo(elem);
	let points = [];
	for (var i = 0; i < 5; i++) {
		points.push(new Point());
	}
	console.log(points);
	two.bind('update', function(frameCount) {
		for (var i = 0; i < points.length; i++) {
			let dot = two.makeCircle(points[i].x, points[i].y, 5);
			dot.fill = 'black';
			dot.noStroke();
		}
	}).play();
}
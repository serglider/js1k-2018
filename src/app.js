const W = a.width;
const H = a.height;
const drCr = drawCircle.bind(null, c, 8, '#000');
const drLn = drawLine.bind(null, 4, '#000');
const orig = {x: W/2, y: H/2};
const arms = createArms(orig, 20);
const tracking = new DrawingCanvas();
animate();

function animate() {
    c.clearRect(0, 0, W, H);
    update();
    track();
    draw();
    requestAnimationFrame(animate);
}

function track() {
    const point = arms[arms.length - 1].end;
    tracking.addPoint(point);
}

function DrawingCanvas() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = W;
    canvas.height = H;

    const drCr = drawCircle.bind(null, ctx, 3, '#f00');

    this.canvas = canvas;
    this.addPoint = (p) => {
        drCr(p.x, p.y);
    };
}

function update() {
    arms.forEach(a => a.update());
}

function draw() {
    c.drawImage(tracking.canvas, 0, 0);
    drCr(orig.x, orig.y);
    arms.forEach(a => a.draw());
}

function createArms(orig, n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
        const l = getRandomInt(40, 250);
        const da = getRandom(-0.12, 0.12);
        const o = i ? arr[i - 1].end : orig;
        const arm = new Arm(o, l, da);
        arr.push(arm);
    }
    return arr;
}


function Arm(orig, length, da) {
    let angle = 0;
    this.end = {};

    this.draw = () => {
        drCr(this.end.x, this.end.y);
        drLn(orig.x, orig.y, this.end.x, this.end.y);
    };

    this.update = () => {
        angle += da;
        this.end.x = orig.x + Math.cos(angle) * length;
        this.end.y = orig.y + Math.sin(angle) * length;
    };
}

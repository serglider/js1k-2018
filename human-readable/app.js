/**
 *
 *   There are several predefined variables in the contest shim:
 *   a - canvas
 *   b - document.body
 *   c = context of the "a" canvas
 *
 */
const canvasWidth = a.width;
const canvasHeight = a.height;
const origin = {
    x: canvasWidth / 2,
    y: canvasHeight / 2
};
const input = document.createElement('input');
input.style = 'position:fixed;top:0;width:99%';
b.appendChild(input);
let raf, arms, trackCanvas;;

input.onchange = function () {

    cancelAnimationFrame(raf);

    const parts = input.value.split('&');
    const lengthString = parts[0];
    const angles = (parts[1] && parts[1].split(',')) || [];

    const getAngle = i => !angles[i] ? 0.01 : (+angles[i].trim() || 1) * Math.PI / 180;
    const getLength = str => Math.abs(+str.trim() || 50);

    const data = lengthString.split(',').map((s, i) => [getLength(s), getAngle(i)]);

    arms = data.reduce((acc, item, i) => {
        const orig = i ? acc[i - 1].endPoint : origin;
        let arm = new Arm(orig, item[0], item[1]);
        acc.push(arm);
        return acc;
    }, []);

    trackCanvas = new TrackCanvas(canvasWidth, canvasHeight);

    animate();
};

function animate() {
    // clear
    c.clearRect(0, 0, canvasWidth, canvasHeight);

    // update
    arms.forEach(a => a.update());
    trackCanvas.addPoint(arms[arms.length - 1].endPoint);

    // draw
    c.drawImage(trackCanvas.image, 0, 0);
    arms.forEach(a => a.draw());

    // request next frame
    raf = requestAnimationFrame(animate);
}

function Arm(orig, len, deltaAngle) {

    let angle = 0;
    this.endPoint = {};

    this.draw = () => {
        c.beginPath();
        c.moveTo(orig.x, orig.y);
        c.lineTo(this.endPoint.x, this.endPoint.y);
        c.lineWidth = 4;
        c.stroke();
    };

    this.update = () => {
        angle += deltaAngle;
        this.endPoint.x = orig.x + Math.cos(angle) * len;
        this.endPoint.y = orig.y + Math.sin(angle) * len;
    };
}

function TrackCanvas(w, h) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    const radius = 3;
    const innerRadius = 0;
    ctx.fillStyle = 'red';

    this.image = canvas;

    this.addPoint = d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, innerRadius, 2 * Math.PI, false);
        ctx.fill();
    };
}

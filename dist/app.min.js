w = a.width;
h = a.height;
k = document;
o = {x: w/2, y: h/2};
p = Math.PI;
e = k.createElement('input');
e.style = 'position:fixed;top:0;width:99%';
e.value = '200,25&1,12';
b.appendChild(e);
let r;
e.focus();
e.onblur = function () {
    cancelAnimationFrame(r);
    let parts = e.value.split('&');
    let data = parts[0];
    let an = (parts[1] && parts[1].split(',')) || [];
    data = data.split(',').map((_, i) => [Math.abs(+_.trim() || 50), (!an[i] ? 0.01 : (+an[i].trim() || 1) * p / 180)]);
    j = data.reduce((acc, item, i) => {
        z = i ? acc[i - 1].e : o;
        let arm = new L(z, item[0], item[1]);
        acc.push(arm);
        return acc;
    }, []);
    t = new D;
    animate();
};
e.blur();

function animate() {

    c.clearRect(0, 0, w, h);

    j.forEach(a => a.u());
    t.a(j[j.length - 1].e);

    c.drawImage(t.i, 0, 0);
    j.forEach(a => a.d());

    r = requestAnimationFrame(animate);
}

function L(o, len, da) {
    let a = 0;
    this.e = {};

    this.d = () => {
        c.beginPath();
        c.moveTo(o.x, o.y);
        c.lineTo(this.e.x, this.e.y);
        c.lineWidth = 4;
        c.stroke();
    };

    this.u = () => {
        a += da;
        this.e.x = o.x + Math.cos(a) * len;
        this.e.y = o.y + Math.sin(a) * len;
    };
}

function D() {
    this.i = k.createElement('canvas');
    this.i.width = w;
    this.i.height = h;
    g = this.i.getContext('2d');
    g.fillStyle = 'red';
    this.a = d => {
        g.beginPath();
        g.arc(d.x, d.y, 3, 0, 2 * p, false);
        g.fill();
    };
}

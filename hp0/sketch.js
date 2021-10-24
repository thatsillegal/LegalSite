let winw=600;
let col=5;
let row=6;
let u=winw/col;
let winh=u*row;
let lw=u/25;

let length= row*col
let tiles = [];
let osc, envelope, fft;

function setup() {
  createCanvas(winw, winh);
  osc = new p5.SinOsc();
  envelope = new p5.Env();
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);
  envelope.setRange(1, 0);  
  osc.start();

  for (let id = 0; id < length; id++) {
      tiles.push( Math.floor(Math.random() * 2)  );
  }
}

function draw() {
  background(90,200,200);
  
  strokeWeight(lw/2);
  stroke(0)
  noFill();
  for (let id = 0; id < length; id++) {
    let i = Math.floor(id / col);
    let j = id % col;
    for (let d = 0; d < 17; d++) {
      let h = u + (d - 8) * lw;
      stroke(255-abs(d - 8) * 16,200,200)
      if (0 == tiles[id]) {
        arc(j * u, i * u, h, h, 0, PI / 2);
        arc((j + 1) * u, (i + 1) * u, h, h, PI, PI * 3 / 2);
      } else {
        arc((j + 1) * u, i * u, h, h, PI / 2, PI);
        arc(j * u, (i + 1) * u, h, h, PI * 3 / 2, TWO_PI);
      }
    }
  }

  strokeWeight(2);
  stroke(255)
  for (let id = 0; id < length; id++) {
    let i = Math.floor(id / col);
    let j = id % col;
    rect(j * u, i * u, u, u);
  }
}

function mouseReleased() {
  for (let id = 0; id < length; id++) {
    let i = Math.floor(id / col);
    let j = id % col;
    if (mouseX > j * u && mouseX < (j + 1) * u && mouseY > i * u && mouseY < (i + 1) * u) {
      tiles[id] = (tiles[id] + 1) % 2;
      getAudioContext().resume()
      osc.freq(midiToFreq(50 + id % 8));
      envelope.play(osc, 0, 0.1);
      return;
    }
  }

}


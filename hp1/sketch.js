let winw = window.innerWidth;
let col = document.getElementById('cols').value;
let fm = 3 * col / 2 + 0.5;
console.log('fm='+fm)
let row = document.getElementById('rows').value;
console.log(typeof(row))
let r = winw / fm;
console.log('r='+r)
let sq= Math.sqrt(3);
console.log('sq='+sq)
//这个地方必须强制转换，怪不得总是运算出错，把6加到0.5后面变成 0.56
let winh = ( 0.5+ Number(row)) * sq*r ;

console.log('winh='+winh)

let lw = r / 20.0;

let length = row * col
let tiles = [];
let osc, envelope, fft;

function resetSketch(){
  winw = window.innerWidth;
  col = document.getElementById('cols').value;
  fm = 3 * col / 2 + 0.5;
  console.log('fm='+fm)
  row = document.getElementById('rows').value;
  console.log(typeof(row))
  console.log('row='+row)
  r = winw / fm;
  console.log('r='+r)
  console.log('sq='+sq)

  winh = ( 0.5+ Number(row)) * sq*r ;

  console.log('winh='+ winh)
  lw = r / 20.0;

  length= row*col
  tiles = [];

  createCanvas(winw, winh);
  // console.log(fm);
  // console.log(winw);
  // console.log(winh);
  osc = new p5.SinOsc();
  envelope = new p5.Env();
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);
  envelope.setRange(1, 0);

  for (let id = 0; id < length; id++) {
      tiles.push( Math.floor(Math.random() * 2)  );
  }
}

function setup() {
  createCanvas(winw, winh);
  // console.log(fm);
  // console.log(winw);
  // console.log(winh);
  osc = new p5.SinOsc();
  envelope = new p5.Env();
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);
  envelope.setRange(1, 0);
  // osc.start();

  for (let id = 0; id < length; id++) {
    tiles.push( Math.floor(Math.random() * 2)  );
}
}

function draw() {
  background(90, 200, 200);

  strokeWeight(2);
  noFill();
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let x = (3 * j / 2 + 1)*r;
      let t = 0 == j % 2 ? 1 : 0.5;
      let y = (i + t) * sq * r;

      id= i*col+j;
      drawHex(x,y,tiles[id]);
    }
  }
}

function drawHex(x,y, k){
  push();
  translate (x,y);
  push();
  rotate( k*TWO_PI/3);

  for (let d = 0; d < 17; d++) {
    let sh= 0.5*(d - 8) * lw;  //**************** */
    let h = r + (d - 8) * lw;
    stroke(255-abs(d - 8) * 16,200,200);
    arc( -r, 0, h, h,  -PI/3,PI/3);
    arc( r, 0, h, h, PI*2/3,  PI*4/3);
    line(sh, sq*r/2 , sh, -sq*r/2 );
  }

  stroke(255,120);
  strokeWeight(1);
  noFill();
  beginShape();
  for( let k =0 ; k<6 ;k++){
    let a= k*PI/3;
     vertex(r*cos(a), r*sin(a) )
  }
  endShape(CLOSE);
  pop();
  pop();
}

function mouseReleased() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let x = (3 * j / 2 + 1) * r;
      let t = 0 == j % 2 ? 1 : 0.5;
      let y = (i + t) * sq * r;
      let dx = mouseX - x;
      let dy = mouseY - y;
      if (0.9 * 0.9 * r * r > dx * dx + dy * dy) {
        id = i * col + j;
        tiles[id] = (tiles[id] + 1) % 3;
        // getAudioContext().resume()
        osc.start();
        osc.freq(midiToFreq(50 + id % 8));
        envelope.play(osc, 0, 0.1);
        return;
      }
    }
  }
}




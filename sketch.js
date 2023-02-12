let cursor;
let balls = Array(1000);
let windows = Array(100);
let fillHSL = {
  h: 281,
  s: 100,
  l: 40,
};
let gridUnits = 4;
let myFont;

function preload() {
  //myFont = loadFont('https://fonts.gstatic.com/s/ibmplexmono/v15/-F63fjptAgt5VM-kVkqdyU8n1i8q1w.woff2');
}

function setup() {
  noStroke();
  noFill();
  //pixelDensity(6);
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL, 360, 100, 100, 1);

  //make background windows
  for(let i = 0; i < windows.length; i++) {
    windows[i] = new UIWindow({
      position: createVector(roundToGrid(random(-100, width - 50)), roundToGrid(random(-100, height - 50))),
      size: roundToGrid(random(200, 400)),
      title: "xXWindow" + i + "Xx",
    });
  }

  windows = shuffleArray(windows);

  //make custom foreground windows
  windows[windows.length - 2] = new UIWindow({
    position: createVector(roundToGrid(width / 2), roundToGrid(40)),
    size: roundToGrid(300),
    title: "Big Window",
  });
  
  windows[windows.length - 1] = new UIWindow({
    position: createVector(roundToGrid((width / 2) - 100), roundToGrid(230)),
    size: roundToGrid(250),
    title: "Little Window",
  });
  
  windows[windows.length - 0] = new UIWindow({
    position: createVector(roundToGrid((width / 2) + 30), 320),
    size: roundToGrid(200),
    title: "Tiny Window",
  });
  
  //make a bunch of other balls for each window
  for(let i = 0; i < balls.length; i++) {
    balls[i] = new Ball({
      position: createVector(0, 0),
      velocity: p5.Vector.random2D().mult(random(0, 4)),
      diameter: random(1, 20),
      strokeWeight: 0,
      //container: random() < 0.6 ? windows[windows.length - 3] : random() < 0.8 ? windows[windows.length - 2] : windows[windows.length -1],
      container: windows[round(random(0, windows.length - 1))],
    });
    windows[windows.indexOf(balls[i].container)].contents.push(i);
  }

  cursor = new Cursor();
}

function draw() {
  background(fillHSL.h, 20, 95);
  
  //draw windows that contain balls
  windows.forEach(window => {
    window.drawWindow();
    window.contents.forEach(content => {
      balls[content].drawBall();
    });
    window.drawWindowOverlay();
  });

  cursor.drawCursor();
}
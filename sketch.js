const cursors = Array(600);
const windows = Array(160);
const fillHSL = {
  h: 281,
  s: 100,
  l: 40,
};
const windowPadding = -32;
const gridUnits = 4;
let IBMPlexMonoRegular;
let IBMPlexMonoSemiBold;
let IBMPlexMonoBold;

function preload() {
  IBMPlexMonoRegular = loadFont('fonts/IBMPlexMono-Regular.ttf');
  IBMPlexMonoSemiBold = loadFont('fonts/IBMPlexMono-SemiBold.ttf');
  IBMPlexMonoBold = loadFont('fonts/IBMPlexMono-Bold.ttf');
}

function setup() {
  noStroke();
  noFill();
  //pixelDensity(2);
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL, 360, 100, 100, 1);

  //make background windows
  for(let i = 0; i < windows.length; i++) {
    let diagonal = roundToDisplayGrid(random(180, windowWidth / 2));

    windows[i] = new UIWindow({
      position: createVector(roundToGrid(random(windowPadding, windowWidth - diagonal - windowPadding)), roundToGrid(random(windowPadding, windowHeight - (diagonal * 3 / 4) - windowPadding))),
      diagonal: diagonal,
      title: "xXWindow" + i + "Xx",
    });
  }

  windows.sort((a, b) => (a.diagonal < b.diagonal) ? 1 : -1);

  //make custom foreground windows
  // windows[windows.length - 2] = new UIWindow({
  //   position: createVector(roundToGrid(width / 2), roundToGrid(40)),
  //   diagonal: roundToDisplayGrid(300),
  //   title: "Big Window",
  // });
  
  // windows[windows.length - 1] = new UIWindow({
  //   position: createVector(roundToGrid((width / 2) - 100), roundToGrid(230)),
  //   diagonal: roundToDisplayGrid(250),
  //   title: "Little Window",
  // });
  
  // windows[windows.length - 0] = new UIWindow({
  //   position: createVector(roundToGrid((width / 2) + 30), 320),
  //   diagonal: roundToDisplayGrid(200),
  //   title: "Tiny Window",
  // });

  for(let i = 0; i < cursors.length; i++) {
    cursors[i] = new Cursor({
      container: windows[round(random(windows.length / 4, windows.length - 1))],
    });
    windows[windows.indexOf(cursors[i].container)].contents.push(i);
  }
}

function draw() {
  background(fillHSL.h, 20, 95);
  
  for(let i = windows.length / 4; i < windows.length; i++) {
    windows[i].drawWindowBackground();
    windows[i].contents.forEach(content => {
      cursors[content].drawCursor();
    });
    windows[i].drawWindowForeground();
  }

  // windows.forEach(window => {
  //   window.drawWindowBackground();
  //   window.contents.forEach(content => {
  //     cursors[content].drawCursor();
  //   });
  //   window.drawWindowForeground();
  // });
}
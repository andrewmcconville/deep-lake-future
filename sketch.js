const cursors = Array(50);
const windows = Array(10);
const videos = Array(10);
const fillHSL = {
  h: 281,
  s: 100,
  l: 40,
};
const windowPadding = -32;
const gridUnits = 4;
const interfaceWidth = 560;
const interfaceHeight = 420;
let app;
let IBMPlexMonoRegular;
let IBMPlexMonoSemiBold;
let IBMPlexMonoBold;
let windowLayoutInterval = 10000;

function preload() {
  IBMPlexMonoRegular = loadFont('fonts/IBMPlexMono-Regular.ttf');
  IBMPlexMonoSemiBold = loadFont('fonts/IBMPlexMono-SemiBold.ttf');
  IBMPlexMonoBold = loadFont('fonts/IBMPlexMono-Bold.ttf');

  for(let i = 0; i < videos.length; i++) {
    videos[i] = createVideo(`videos/Clip${i+1}_10sec.mp4`);
    videos[i].volume(0);
    videos[i].size(768, 432);
    videos[i].hide();
    videos[i].loop();
    videos[i].parent('appContainer');
  }
}

function setup() {
  pixelDensity(1);
  noStroke();
  noFill();
  app = createCanvas(interfaceWidth, interfaceHeight);
  app.parent('appContainer');
  colorMode(HSL, 360, 100, 100, 1);
  windowLayout();
  setTimeout(windowLayout, windowLayoutInterval);
}

function refresh(){
  setup();
}

function draw() {
  background(fillHSL.h, 20, 95);
  
  for(let i = 0; i < windows.length; i++) {
    windows[i].drawWindowBackground();
    windows[i].contents.forEach(content => {
      cursors[content].drawCursor();
    });
    windows[i].drawWindowForeground();
  }
}

function windowLayout() {
  //make background windows
  for(let i = 0; i < windows.length; i++) {
    let diagonal = roundToDisplayGrid(random(180, interfaceWidth / 2));

    windows[i] = new UIWindow({
      position: createVector(roundToGrid(random(windowPadding, interfaceWidth - diagonal - windowPadding)), roundToGrid(random(windowPadding, interfaceHeight - (diagonal * 3 / 4) - windowPadding))),
      diagonal: diagonal,
      title: "xXWindow" + i + "Xx",
      video: videos[i],
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
      container: windows[round(random(0, windows.length - 1))],
    });
    windows[windows.indexOf(cursors[i].container)].contents.push(i);
  }

  setTimeout(windowLayout, windowLayoutInterval);
}

function keyPressed() {
  //h
  if(keyCode === 72) {
    toggleVideos(0);
  }
  //e
  else if(keyCode === 69) {
    toggleVideos(1);
  }
  //l
  else if(keyCode === 76) {
    toggleVideos(2);
  }
  //o
  else if(keyCode === 79) {
    toggleVideos(3);
  }
  //,
  else if(keyCode === 188) {
    toggleVideos(4);
  }
  //space
  else if(keyCode === 32) {
    toggleVideos(5);
  }
  //w
  else if(keyCode === 87) {
    toggleVideos(6);
  }
  //r
  else if(keyCode === 82) {
    toggleVideos(7);
  }
  //d
  else if(keyCode === 68) {
    toggleVideos(8);
  }
  //.
  else if(keyCode === 190) {
    toggleVideos(9);
  }
  else if(keyCode === keyCode) {
    console.log(keyCode);
  }
}

let previousIndex = -1;
function toggleVideos(videoIndex) {
  let currentIndex = videoIndex;

  videos.forEach(video => {
    video.hide();
  });

  if(currentIndex != previousIndex) {
    videos[videoIndex].show();
    previousIndex = currentIndex;
  } else {
    previousIndex = -1;
  }
}
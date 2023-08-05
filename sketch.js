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
const interfaceWidth = 640; //560 Apple 3 width
const interfaceHeight = 360; //162 Apple 3 height
let app;
let IBMPlexMonoRegular;
let IBMPlexMonoSemiBold;
let IBMPlexMonoBold;
let refreshInterval = 10000;
let videoIsOpen = false;

function preload() {
  IBMPlexMonoRegular = loadFont('fonts/IBMPlexMono-Regular.ttf');
  IBMPlexMonoSemiBold = loadFont('fonts/IBMPlexMono-SemiBold.ttf');
  IBMPlexMonoBold = loadFont('fonts/IBMPlexMono-Bold.ttf');

  for(let i = 0; i < videos.length; i++) {
    videos[i] = createVideo(`videos/Clip${i+1}_10sec.mp4`);
    videos[i].volume(0);
    videos[i].size(interfaceWidth, interfaceHeight);
    videos[i].hide();
    videos[i].loop();
    videos[i].parent('appContainer');
  }
}

function setup() {
  pixelDensity(1);
  frameRate(24.98);
  noStroke();
  noFill();
  app = createCanvas(interfaceWidth, interfaceHeight);
  app.parent('appContainer');
  colorMode(HSL, 360, 100, 100, 1);
  windowLayout();
}

function draw() {
  background(0, 0, 0);
  
  for(let i = 0; i < windows.length; i++) {
    windows[i].drawWindowBackground();
    windows[i].contents.forEach(content => {
      cursors[content].drawCursor();
    });
    windows[i].drawWindowForeground();
  }
}

function pageRefresh() {
  if(videoIsOpen) {
    //do nothing
  }
  else {
    location.reload();
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

  for(let i = 0; i < cursors.length; i++) {
    cursors[i] = new Cursor({
      container: windows[round(random(0, windows.length - 1))],
    });
    windows[windows.indexOf(cursors[i].container)].contents.push(i);
  }

  setInterval(pageRefresh, refreshInterval);
}

function keyPressed() {
  //a
  if(keyCode === 65) {
    toggleVideos(0);
  }
  //b
  else if(keyCode === 66) {
    toggleVideos(1);
  }
  //c
  else if(keyCode === 67) {
    toggleVideos(2);
  }
  //d
  else if(keyCode === 68) {
    toggleVideos(3);
  }
  //e
  else if(keyCode === 69) {
    toggleVideos(4);
  }
  //f
  else if(keyCode === 70) {
    toggleVideos(5);
  }
  //g
  else if(keyCode === 71) {
    toggleVideos(6);
  }
  //h
  else if(keyCode === 72) {
    toggleVideos(7);
  }
  //i
  else if(keyCode === 73) {
    toggleVideos(8);
  }
  //j
  else if(keyCode === 74) {
    toggleVideos(9);
  }
  else if(keyCode === keyCode) {
    console.log(keyCode);
  }
}

function videoRefresh() {
  location.reload();
}

let previousIndex = -1;
let videoRefreshToggle;
function toggleVideos(videoIndex) {
  clearTimeout(videoRefreshToggle);
  let currentIndex = videoIndex;
  videoIsOpen = true;

  videos.forEach(video => {
    video.hide();
  });

  if(currentIndex != previousIndex) {
    videos[videoIndex].show();
    previousIndex = currentIndex;
    videoRefreshToggle = setTimeout(videoRefresh, refreshInterval);
  } else {
    previousIndex = -1;
    location.reload();
  }
}
//click mouse to turn to next page

let page1a;
let page1b;
let page2a;
let page2b;
let page3a;
let page3b;
let page4a;
let page4b;
let page5a;
let page5b;
let page6a;
let page6b;
let page7a;
let page7b;

let page1_bg_assets = [];

const PAGE_DATA = [
  {
    bg: [],
    assets: [],
    mp3: null,
  },
  {
    bg: [],
    assets: [],
    mp3: null,
  },
  {
    bg: [],
    assets: [],
    mp3: null,
  },
  {
    bg: [],
    assets: [],
    mp3: null,
  },
  {
    bg: [],
    assets: [],
    mp3: null,
  },
  {
    bg: [],
    assets: [],
    mp3: null,
  },
  {
    bg: [],
    assets: [],
    mp3: null,
  },
];

let currentPageIndex = 0;

let bgm;

function preload() { //I used different softwares to export files so there are uppercase and lowercase"png"
  page1a = loadImage("page1-a.jpg");
  page1b = loadImage("page1-b.jpg");
  page2a = loadImage("page2-a.PNG");
  page2b = loadImage("page2-b.PNG");
  page3a = loadImage("page3-a.png");
  page3b = loadImage("page3-b.jpg");
  page4a = loadImage("page4-a.png");
  page4b = loadImage("page4-b.PNG");
  page5a = loadImage("page5-a.PNG");
  page5b = loadImage("page5-b.PNG");
  page6a = loadImage("page6-a.PNG");
  page6b = loadImage("page6-b.PNG");
  page7a = loadImage("page7-a.png");
  page7b = loadImage("page7-b.PNG");

  soundFormats("mp3", "ogg"); //I recorded with my phone but the format was m4a, and I had to export it to mp3 with another software...took some time.
  
  PAGE_DATA[0].bg = [page1a, page1b];
  PAGE_DATA[0].assets = [];
  PAGE_DATA[0].mp3 = loadSound("1"); //page 1 recording

  PAGE_DATA[1].bg = [page2a, page2b];
  PAGE_DATA[1].mp3 = loadSound("2"); //page 2 recording

  PAGE_DATA[2].bg = [page3a, page3b];
  PAGE_DATA[2].assets = [{ x: 0, y: 0, img: loadImage("page3-assets-1.png") }];
  PAGE_DATA[2].mp3 = loadSound("3"); //page 3 recording

  PAGE_DATA[3].bg = [page4a, page4b];
  // PAGE_DATA[3].assets = [{ x: 0, y: 0, img: loadImage("page4-assets-1.PNG") }];
  PAGE_DATA[3].mp3 = loadSound("4"); //page 4 recording

  PAGE_DATA[4].bg = [page5a, page5b];
  // PAGE_DATA[4].assets = [{ x: 0, y: 0, img: loadImage("page5-assets-1.PNG") }];
  PAGE_DATA[4].mp3 = loadSound("5");//page 5 recording

  PAGE_DATA[5].bg = [page6a, page6b];
  PAGE_DATA[5].assets = [];
  PAGE_DATA[5].mp3 = loadSound("6"); //page 6 recording

  PAGE_DATA[6].bg = [page7a, page7b];
  PAGE_DATA[6].assets = [];
  PAGE_DATA[6].mp3 = loadSound("7"); //page 7 recording

  bgm = loadSound("bgm"); //I found this background music online (https://www.storyblocks.com/audio/stock/childrens-story-nature-mischief-restyfex_kklk59uu.html)
}

function setup() {
  createCanvas(2732 / 2, 2048 / 2); 
  frameRate(5);
  bgm.setVolume(0.3); //make sure it would not cover my voice
  bgm.play();
  bgm.loop();
}

function draw() {
  const currentPage = PAGE_DATA[currentPageIndex];
  let index =
    currentPage.bg.length <= 1 ? 0 : frameCount % currentPage.bg.length;

  image(currentPage.bg[index], 0, 0, width, height);

  if (currentPage.assets.length > 0) {
    for (const asset of currentPage.assets) {
      image(asset.img, asset.x, asset.y, width, height);
    }
  }
}

function mousePressed() {
  currentPageIndex++;

  if (currentPageIndex > 6) {
    currentPageIndex = 0;
  }

  const currentPage = PAGE_DATA[currentPageIndex];

  if (!currentPage.mp3.isPlaying()) {
    currentPage.mp3.play();
  }
}


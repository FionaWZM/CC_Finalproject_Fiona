//press the spacebar to turn to next page
//page4: press and hold the boy's hat
//for page 5 press and hold the mouse on the big carrot
//for page 6 press and hold the mouse on water bottle

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

let coverGraph;
let bug;

// Assemble each page of resources into an array
const PAGE_DATA = [
  {
    bg: [], // background image
    assets: [], // other image sources
    mp3: null, // audio
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
    isCustom: true, // Whether to customize the rendering
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
    isCustom: true,
  },
  {
    bg: [],
    assets: [],
    mp3: null,
    isCustom: true,
  },
  {
    bg: [],
    assets: [],
    mp3: null,
  },
];

let currentPageIndex = 0;

let bgm;

const flowerList = [];

function preload() {
  //I used different softwares to export files so there are uppercase and lowercase"png"
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
  PAGE_DATA[2].assets = [
    { name: "RightCover", img: loadImage("page3-assets-1.png") },
  ];

  PAGE_DATA[2].mp3 = loadSound("3"); //page 3 recording

  PAGE_DATA[3].bg = [page4a];
  // PAGE_DATA[3].assets = [{ x: 0, y: 0, img: loadImage("page4-assets-1.PNG") }];
  PAGE_DATA[3].mp3 = loadSound("4"); //page 4 recording

  PAGE_DATA[4].bg = [page5a, page5b];
  // PAGE_DATA[4].assets = [{ x: 0, y: 0, img: loadImage("page5-assets-1.PNG") }];
  PAGE_DATA[4].mp3 = loadSound("5"); //page 5 recording

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
  frameRate(5); // 
  bgm.setVolume(0.3); //make sure it would not cover my voice
  bgm.play();
  bgm.loop();

  coverGraph = createGraphics(width, height);
  bug = new Bug(coverGraph);

  let leaveCount = 0;
  const leaveAssets = [
    // "page3-assets-DarkLeaf.PNG",
    "page3-assets-DarkLeafOriginal.PNG",
    // "page3-assets-LightLeaf.PNG",
    "page3-assets-LightLeafOriginal.PNG",
  ];
//Let the leaves form an oval around the boy's face and divide it into 15 parts
  const centerX = 341.5;
  const centerY = 512;
  let angleStep = 360 / 15;
  for (let theta = 0; theta < 360; theta += angleStep) {
    let x = centerX + 341 * cos(theta);
    let y = centerY + 512 * sin(theta);
    const leaveImgPath = leaveAssets[leaveCount % leaveAssets.length];
    const img = loadImage(leaveImgPath);
    PAGE_DATA[2].assets.push({
      type: "leave",
      x,
      y,
      img,
      a: createVector(x - centerX, y - centerY).heading() + PI / 2,
      _a: createVector(x - centerX, y - centerY).heading() + PI / 2,
    });
    leaveCount++;
  }

  // init page4 flower object array
  const hatVec = createVector(1011, 332); // Vector of hat position
  for (let i = 0; i < 6; i++) {
    const randomFlowerPos = createVector(
      random(1011 - 150, 1011 + 150),
      random(332 - 80, 332 + 80)
    );
    if (hatVec.dist(randomFlowerPos) < 150) {
      flowerList.push(new Flower(randomFlowerPos.x, randomFlowerPos.y));
    }
  }
}

function draw() {
  // currentPage resource for the current page
  const currentPage = PAGE_DATA[currentPageIndex];

  // Non-customized
  if (!currentPage.isCustom) {
    // Index of background images
    let index =
      currentPage.bg.length <= 1 ? 0 : frameCount % currentPage.bg.length;

    // Switch the background image back and forth according to the index of the background image
    image(currentPage.bg[index], 0, 0, width, height);

    if (currentPage.assets.length > 0) {
      for (const asset of currentPage.assets) {
        image(asset.img, asset.x, asset.y, width, height);
      }
    }

    if (currentPageIndex == 1) {
      push();
      translate(-1000, -1100);
      bug.update();
      bug.draw();
      pop();
    }

    //press the boy's hat
    if (currentPageIndex == 3) {
      // Looping flowers
      for (const f of flowerList) {
        // When the mouse is not pressed
        if (mouseIsPressed === false) {
          f.back(); // returns back to its original position
        }
        // draw on canvas
        f.draw();
      }

      const hatVec = createVector(1011, 332); // hat position
      const mouseVec = createVector(mouseX, mouseY); // mouse position
      if (mouseIsPressed === true) {
        // mouse when pressed
        if (hatVec.dist(mouseVec) < 200) {
          // Mouse distance from the hat < 200
          console.log("按住了");
          for (const f of flowerList) {
            f.grow(); // let the flowers grow
          }
        }
      }
    }
  } else {
    // isCustom = true

    // page 3 custome render
    if (currentPageIndex == 2) {
      // Rendering the background image
      image(currentPage.bg[0], 0, 0, width, height);

      // render leaves
      const leaveAssets = currentPage.assets.filter((_) => _.type === "leave");
      for (const leave of leaveAssets) {
        push();
        imageMode(CENTER);
        translate(leave.x, leave.y);

        // Get current mouse position => vector
        const mVec = createVector(mouseX, mouseY);
        // Leaf position => vector
        const leaveVec = createVector(leave.x, leave.y);

        // Distance between current mouse position and leaf position < 140 px
        if (mVec.dist(leaveVec) < 140) {
          // Let the angle of the current leaf be random + (45° ~ -45°)
          leave.a = leave.a + random(-PI / 2, PI / 2);
        } else {
          // Restore angles
          leave.a = leave._a;
        }
        // Rotate the canvas to achieve the movements of the leaves
        rotate(leave.a);
        image(leave.img, 0, 0, leave.img.width / 6, leave.img.height / 6);
        pop();
      }

      //
      image(currentPage.assets[0].img, 0, 0, width, height);
    }

    
    if (currentPageIndex == 4) {
      let index = 0;

      const carrotVec = createVector(1918 / 2, 1186 / 2); // Vector of carrot positions
      const mouseVec = createVector(mouseX, mouseY); //Vector of mouse positions
      if (mouseIsPressed && carrotVec.dist(mouseVec) < 230) {
        // If the mouse is pressed and the distance between the carrot and the mouse is < 230
        // index will change 0,1
        index =
          currentPage.bg.length <= 1 ? 0 : frameCount % currentPage.bg.length;
      }

      image(currentPage.bg[index], 0, 0, width, height);
    }

    
    if (currentPageIndex == 5) {
      let index = 0;

      const bottleVec = createVector(2529 / 2, 218 / 2); // Vector of bottle positions
      const mouseVec = createVector(mouseX, mouseY);
      if (mouseIsPressed && bottleVec.dist(mouseVec) < 110) {
        index =
          currentPage.bg.length <= 1 ? 0 : frameCount % currentPage.bg.length;
      }

      image(currentPage.bg[index], 0, 0, width, height);
    }
  }
}

function mouseMoved() {
  // const currentPage = PAGE_DATA[currentPageIndex];
  // if (currentPageIndex == 2) {
  //   const mVec = createVector(mouseX, mouseY);
  //   const leaveAssets = currentPage.assets.filter((_) => _.type === "leave");
  //   for (const leave of leaveAssets) {
  //     const leaveVec = createVector(leave.x, leave.y);
  //     if (mVec.dist(leaveVec) < 140) {
  //       leave.a = leave.a + random(-PI / 2, PI / 2);
  //     } else {
  //       leave.a = leave._a;
  //     }
  //   }
  // }
}

function keyPressed() {
  if (keyCode === 32) {
    currentPageIndex++;

    if (currentPageIndex > 6) {
      currentPageIndex = 0;
    }

    const currentPage = PAGE_DATA[currentPageIndex];

    if (!currentPage.mp3.isPlaying()) {
      currentPage.mp3.play();
    }
  }
}

function mousePressed() {
  console.log(mouseX, mouseY);
}

class Bug {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.a = 0;
    this.speed = 12;
  }

  update() {
    // this.a += random(-0.05, 0.01);
    this.x += random(-this.speed, this.speed) + random(4);
    this.y += random(-this.speed, this.speed);

    if (this.x <= -500) {
      this.x = -500;
    }
    if (this.x >= 0) {
      this.x = 0;
    }
    if (this.y >= 50) {
      this.y = 50;
    }
    if (this.y < -10) {
      this.y = -10;
    }
    console.log(this.x, this.y);
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.a);

    fill("#989898");
    noStroke();
    ellipse(2123, 1886, 35, 35);
    fill("#1A1A1A");
    ellipse(2143, 1898, 68, 68);
    push();

    beginShape();
    vertex(2159, 1869);
    vertex(2158, 1861);
    vertex(2149, 1855);
    vertex(2148, 1847);
    vertex(2143, 1841);
    vertex(2148, 1842);
    vertex(2152, 1854);
    vertex(2166, 1864);
    vertex(2167, 1870);
    endShape(CLOSE);
    pop();

    push();
    beginShape();
    vertex(2176, 1869);
    vertex(2183, 1862);
    vertex(2197, 1860);
    vertex(2205, 1851);
    vertex(2210, 1853);
    vertex(2201, 1858);
    vertex(2199, 1863);
    vertex(2185, 1866);
    vertex(2183, 1871);
    endShape(CLOSE);
    pop();

    push();
    beginShape();
    vertex(2199, 1879);
    vertex(2207, 1877);
    vertex(2220, 1884);
    vertex(2230, 1882);
    vertex(2237, 1888);
    vertex(2219, 1888);
    vertex(2209, 1882);
    vertex(2206, 1884);
    endShape(CLOSE);
    pop();

    push();
    beginShape();
    vertex(2148, 1955);
    vertex(2149, 1963);
    vertex(2162, 1971);
    vertex(2165, 1981);
    vertex(2169, 1985);
    vertex(2173, 1985);
    vertex(2167, 1978);
    vertex(2164, 1966);
    vertex(2155, 1962);
    vertex(2155, 1959);
    endShape(CLOSE);
    pop();

    push();
    beginShape();
    vertex(2129, 1941);
    vertex(2124, 1948);
    vertex(2128, 1961);
    vertex(2123, 1974);
    vertex(2127, 1977);
    vertex(2128, 1970);
    vertex(2131, 1962);
    vertex(2129, 1951);
    vertex(2133, 1946);
    endShape(CLOSE);
    pop();

    push();
    beginShape();
    vertex(2122, 1927);
    vertex(2112, 1928);
    vertex(2104, 1924);
    vertex(2096, 1925);
    vertex(2090, 1922);
    vertex(2092, 1929);
    vertex(2100, 1928);
    vertex(2106, 1928);
    vertex(2118, 1935);
    vertex(2126, 1934);
    endShape(CLOSE);
    pop();

    push();
    beginShape();
    vertex(2107, 1894);
    vertex(2098, 1895);
    vertex(2092, 1893);
    vertex(2085, 1895);
    vertex(2094, 1898);
    vertex(2108, 1895);
    endShape(CLOSE);
    pop();

    push();
    beginShape();
    vertex(2123, 1869);
    vertex(2118, 1853);
    vertex(2115, 1849);
    vertex(2116, 1847);
    vertex(2122, 1855);
    vertex(2124, 1869);
    endShape(CLOSE);
    pop();

    push();
    beginShape();
    fill("#BC1919");
    vertex(2118, 1920);
    vertex(2133, 1952);
    vertex(2181, 1969);
    vertex(2216, 1947);
    vertex(2225, 1900);
    vertex(2191, 1869);
    vertex(2157, 1868);
    vertex(2146, 1899);
    endShape(CLOSE);
    pop();

    push();
    beginShape();
    fill("#1A1A1A");
    ellipse(2108, 1886, 3, 5);
    ellipse(2116, 1873, 5, 4);
    fill("#838282");
    ellipse(2118, 1905, 15, 19);
    ellipse(2137, 1873, 21, 13);
    fill("#281F1F");
    ellipse(2156, 1909, 20, 18);
    ellipse(2190, 1954, 21, 17);
    ellipse(2214, 1919, 14, 20);
    fill("#1A1A1A");
    ellipse(2174, 1875, 20, 11);
    ellipse(2188, 1901, 19, 19);
    ellipse(2165, 1938, 20, 18);
    ellipse(2133, 1935, 13, 19);

    pop();

    push();

    line(2146, 1899, 2215, 1947);
    pop();

    pop();
  }
}

class Flower {
  constructor(x, y) {
    this.x = x; // x of flowers
    this.y = y; // y of flowers

    this.mode = random(["Sunflower", "Rose"]);

    this.routePx = x;
    this.routePy = y;
    this.route = []; // root
    this.maxLen = int(random(50, 100)); // maximum value
  }

  
  grow() {
    if (this.route.length < this.maxLen) {
      const newY = this.routePy - 2; // generate a new y
      const newX =
        this.routePx + sin(this.route.length / 30) * 4 * random([-1, 1]); // generate a new x

      this.route.push(createVector(newX, newY));
      this.routePy = newY;
      this.routePx = newX;

      this.x = this.routePx;
      this.y = this.routePy;
    }
  }

  //
  back() {
    if (this.route.length > 0) {
      // pop Deletes the last element of the array and returns the deleted element
      const last = this.route.pop();

      // last: Deleted values
      this.x = last.x;
      this.y = last.y;
    }
  }

  draw() {
    // Draw path

    push();
    noStroke();
    fill("#0b7a23");
    if (this.route.length > 0) {
      for (const r of this.route) {
        ellipse(r.x, r.y, 20);
      }
    }
    pop();

    if (this.mode === "Sunflower") {
      // Sunflower
      let xinR = 10;
      push();
      noStroke();
      translate(this.x, this.y);
      angleMode(DEGREES);
      push();
      fill("#ffe100");
      let len = random(80, 100);
      for (let i = 0; i < 20; i++) {
        ellipse(0, 0, 20, xinR + len);
        rotate(18);
      }
      pop();

      push();
      rotate(9);
      fill("#fff");
      let len2 = len / 2.5;
      for (let i = 0; i < 20; i++) {
        triangle(-xinR / 3, 0, xinR / 3, 0, 0, len2);
        rotate(18);
      }
      pop();

      push();
      fill("#6e4318");
      let len3 = len / 3;
      for (let i = 0; i < 20; i++) {
        ellipse(0, 0, 10, xinR + len3);
        rotate(18);
      }
      pop();

      fill("#a69519");
      ellipse(0, 0, xinR + xinR / 2);

      fill("#6e4318");
      ellipse(0, 0, xinR);
      pop();
    }
    if (this.mode === "Rose") {
      let xinR = 10;
      push();
      noStroke();
      translate(this.x, this.y);
      angleMode(DEGREES);
      push();
      fill("#d35377");
      let len = random(80, 100);
      for (let i = 0; i < 12; i++) {
        ellipse(0, 0, 20, xinR + len);
        rotate(360 / 12);
      }
      pop();

      push();
      rotate(360 / 6 / 2);
      fill("#ffff1f");
      let len2 = len / 4;
      for (let i = 0; i < 9; i++) {
        triangle(-xinR / 3, 0, xinR / 3, 0, 0, len2);
        rotate(360 / 8);
      }
      pop();

      fill("#d35377");
      ellipse(0, 0, xinR + xinR / 2);

      fill("#ffff1f");
      ellipse(0, 0, xinR);
      pop();
    }
  }
}

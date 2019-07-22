/*
 Written New version by Juan Carlos Ponce Campuzano
 19-Jul-2019
 https://jcponce.github.io/
*/

let mandelSet;
let juliaSet;

let widthMandel = 480;
let centerX = -0.7;
let sizeGraph = 2.7;

let widthJulia = 480;
let sizeGraphJ = 3;

let mx = 1;
let my = 1;

// --Controls--
let clts = {
title: 'Mandelbrot-Julia Sets',
iter: 100,
Save: function () {
    save('mandelbrot-julia.jpg');
},
User: false,
Cx: 0,
Cy: 0,
};

let changeC = false;
let prevmx = 0;
let prevmy = 0;

let easing = 0.9;
let radius = 5;
let edge = 0;
let inner = edge + radius;

// KeyCodes available at: http://keycode.info/
const KC_UP = 38;        // Move up W
const KC_DOWN = 40;        // Move down S
const KC_LEFT = 37;        // Move left A
const KC_RIGHT = 39;    // Move right D
const KC_UNZOOM = 189;    // Zoom back -
const KC_ZOOM = 187;    // Zoom in +
const KC_RESET = 82;    // Reset zoom level and position R

function setup() {
  createCanvas(960, 480);

  ellipseMode(RADIUS);
  rectMode(CORNERS);

  pixelDensity(1);
  //frameRate(60);
  //smooth();
    
  mandelbrot = new MandelbrotSet(widthMandel, sizeGraph);
  julia = new JuliaSet(widthJulia, sizeGraphJ);
    
  // create gui (dat.gui)
  let gui = new dat.GUI({
                          width: 310
                          });
  gui.close();
  //gui.add(clts, 'title').name("Title:");
  //gui.add(clts, 'inst').name("Fixed point:");
  gui.add(clts, 'iter', 0, 300).step(1).name("Iterations:");
  gui.add(clts, 'Save').name("Save (jpg)");
  
  let folder = gui.addFolder('More options');
  
  folder.add(clts, 'User').name("Set c:");
  folder.add(clts, 'Cx').min(-4).max(4).step(0.01).name("Re(c):");
  folder.add(clts, 'Cy').min(-4).max(4).step(0.01).name("Im(c):");

}

function draw() {
    
  cursor(HAND);
    
  //mandelSet = new Mandelbrot(clts.iter, widthMandel, sizeGraph);

  mandelbrot.update();
  mandelbrot.plot();

    julia.update();
    julia.plot();
    
    if (!clts.User) {
      if (!changeC) {
        
        
        if (abs(mouseX - mx) > 0.1) {
            mx = mx + (mouseX - mx) * easing;
        }
        if (abs(mouseY - my) > 0.1) {
            my = my + (mouseY - my) * easing;
        }
        
        mx = constrain(mx, inner, (width - inner) / 2);
        my = constrain(my, inner, height - inner);
        
        fill(255);
        ellipse(mx, my, radius, radius);
        
      } else{
          fill(1, 200, 233)
          prevmx = mx;
          prevmy = my;
          ellipse(prevmx, prevmy, radius, radius);
      }
    }
    
    
    
    
}

function keyReleased() {
    if (keyCode === 73)//I key
        mandelbrot.printDebug = !mandelbrot.printDebug;
}

function mouseWheel() {
    mandelbrot.zoomAt(mouseX, mouseY, 0.85, event.delta < 0);
}

function doubleClicked(){
    if(changeC){
        changeC = false;
    } else {
        changeC = true;
    }
    
}


//Auxiliary functions
function setPixelRGB(x, y, r, g, b) {
  let pixelID = (x + y * width) * 4;
  pixels[pixelID + 0] = r;
  pixels[pixelID + 1] = g;
  pixels[pixelID + 2] = b;
  pixels[pixelID + 3] = 255;
}

function setPixelHSV(x, y, h, s, v) {
  let r, g, b, i, f, p, q, t;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      r = v, g = t, b = p;
      break;
    case 1:
      r = q, g = v, b = p;
      break;
    case 2:
      r = p, g = v, b = t;
      break;
    case 3:
      r = p, g = q, b = v;
      break;
    case 4:
      r = t, g = p, b = v;
      break;
    case 5:
      r = v, g = p, b = q;
      break;
  }

  setPixelRGB(x, y, round(r * 200), round(g * 255), round(b * 255));
}

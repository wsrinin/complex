// Based on https://www.openprocessing.org/sketch/491395 
// by Dan Anderson https://www.openprocessing.org/user/34940

/* Written in p5.js (https://p5js.org/)
 * Under Creative Commons License
 * https://creativecommons.org/licenses/by-sa/4.0/
 * Written by Juan Carlos Ponce Campuzano, 19-Jul-2018
 */

var slider;

function setup(){
    createCanvas(400,450);
    slider = createSlider(0, 1, 0, 0.001);
    slider.position(120, 407);
    slider.style('width', '150px');
    colorMode(HSB);
    noStroke();
}

function draw(){
    background(255);
    noFill();
    stroke(0);
    strokeWeight(1.2);
    rect(0,0,width,height-50);
    
    fill(40);
    noStroke();
    textSize(16);
    text("Im",width/2+5,20);
    text("Re",width-28,(height-50)/2+15);
    text("pi/2",3*width/4,(height-50)/2+15);
    
    
    stroke(80);
    strokeWeight(1.4);
    line(0,(height-50)/2,width,(height-50)/2);
    line(width/2,0,width/2,(height-50));
    
    let detail = 8;//Must be greater than 4 to run properly
    
    for (let i = 0; i < width; i += detail){
        for (let j =0; j < height-50; j += detail){
            let x,y;
            x = map(i,0,width,-PI/2,PI/2);
            y = map(j,height-50,0,-PI/2,PI/2);
            
            let nextx,nexty;
            
            nextx = exp(x)*cos(y);
            nexty = exp(x)*sin(y);
            
            let xp,yp;
            
            xp = map(x * (1-slider.value()) + nextx * slider.value(),-PI,PI,0,width);
            yp = map(y * (1-slider.value()) + nexty * slider.value(),-PI,PI,height-50,0);
            
            //point(xp,yp);
            stroke(i*0.8, 255,255);
            ellipse(xp,yp,2.5,2.5);
        }
    }
    
    //Black background for slider
    fill(0);
    stroke(0);
    strokeWeight(1.2);
    rect(0,400,400,50);
    
}

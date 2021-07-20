let img = '';
let status = '';
let objects = [];

function preload(){
    img = loadImage('animals.jpg');
}

function setup(){
    canvas = createCanvas(1200,625);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded(){ 
    console.log('model loaded');
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, result){
    if(error){
        console.error(error);
    } else {
        console.log(result);
        objects = result;
    }
}

function draw(){
    image(img,0,0);

    if(status != ''){
        for(i = 0; i < objects.length; i++){
            fill('#6a0dad');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + '' + percent + '%', objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
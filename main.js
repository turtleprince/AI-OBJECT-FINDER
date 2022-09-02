var Status = "";
var objects = [];

function preload() {


}

function setup() {
    canvas = createCanvas(650, 500);
    background("red");
    canvas.position(630, 300);

    video = createCapture(VIDEO);
    video.hide();

}

function draw() {
    image(video, 0, 0, 650, 500);

    if (Status != "") {
        objectDetector.detect(video, got_results)


        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";

            document.getElementById("dec").innerHTML = "Number of objects detected are: " + objects.length;
            accuracy = floor(objects[i].confidence * 100);

            fill("orange");
            text(objects[i].label + " " + accuracy + "%", objects[i].x, objects[i].y);


            noFill();
            stroke("orange");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);


        }
    }
}

function Start() {
    objectDetector = ml5.objectDetector("cocossd", model_loaded);
    document.getElementById("status").innerHTML = "Status : Dectecting Objects";

}

function model_loaded() {
    console.log("Coccossd model loaded");
    Status = true;

}

function got_results(error, results) {
    if (error) {
        console.error(error);

    }
    else {
        console.log(results);
        objects = results;
    }
}
video = "";
status = "";
objects = [];

function preload()
{
    video = createVideo("video.mp4");
    video.hide();
}

function setup()
{
    canvas = createCanvas(400, 400);
    canvas.center();
}

function Start()
{
    ObjectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
}

function modelLoaded()
{
    console.log("ModelLoaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw()
{
    image(video, 0, 0, 400, 400);

    if(status != "")
    {
        ObjectDetector.detect(video, gotResult);
        for(i = 0 ; i = objects[i].length ; i++)
        {
            document.getElementById("status").innerHTML = "Status = Objects Detected";
            document.getElementById("number_if_objects").innerHTML = "Number Of Objects Detected Are : " + objects[i].length;

            fill("green");
            percent = floor(objects[i].confidence * 100);
            noFill();
            stroke("green");
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            rect(objects[i].x, objects[i].y , objects[i].width, objects[i].height);
            
        }

    }
}


function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }else{
        console.log(results);
        objects = results;
    }
}
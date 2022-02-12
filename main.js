song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
Thescoreoftheleftwristis = 0;
function setup(){
    canvas = createCanvas(600, 500)
    canvas.center();

    video = createCapture(VIDEO)
    video.hide();

    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotPoses);
}

function modelloaded(){
    console.log('Posenet is ready');
}
function draw(){
    image(video, 0, 0, 600, 500);

    fill("cyan");
    stroke("cyan");
    if(Thescoreoftheleftwristis > 0.2){

        circle(leftWristX, leftWristY, 20);
        TheleftwristYvariable = Number(leftWristY);
        volume = TheleftwristYvariable/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}
function preload(){
    song = loadSound('music.mp3')
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
        Thescoreoftheleftwristis = results[0].pose.keypoints[9].score;
        
    }
}
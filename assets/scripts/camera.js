const cam_canvas = document.getElementById("camCanvas")
let video = null

navigator.mediaDevices.getUserMedia({video:true})
.then(function(data)
{
    video = document.createElement("video");
    video.srcObject = data;
    video.play()
    video.onloadeddata=function()
    {
        cam_canvas.width = video.videoWidth
        cam_canvas.height = video.videoHeight
        
    }
}
).catch(function(error)
{
    console.log(error)
}
)

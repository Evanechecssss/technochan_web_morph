function drawPoint(loc, label, rad = 0.07, line =  0.01, color = 'pink')
{
    ctx.lineWidth = line;
    ctx.beginPath()
    ctx.arc(loc.x,loc.y,rad,0,Math.PI*2)
    ctx.stroke();
    ctx.fillStyle = color
    ctx.fill()
    ctx.fillStyle = 'black'
    ctx.font = (rad*2) + "px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(label,loc.x,loc.y)
    ctx.lineWidth = lineWidth;
}

function getMarkedLocations(imgData, color = [0,255,0], thresold = 200)
{
    const data = imgData.data;
    locs = []
    for (let i = 0; i<=data.length; i+=4)
    {
        const r = data[i];
        const g= data[i+1];
        const b = data[i+2];
        if (match([r,g,b],color, thresold))
        {
            const pIndex = i/4;
            const y = Math.floor([pIndex/imgData.width]);
            const x = pIndex%imgData.width;
            locs.push({x,y});
        }
    }
    return locs
}

function match(c1,c2,thr)
{
    return distance(c1,c2)<=thr;
}

function distance(p1,p2)
{
    let dist = 0;
    for (let i = 0; i<p1.length; i++)
    {
        dist +=(p1[i]-p2[i])*(p1[i]-p2[i]);
    }
    return Math.sqrt(dist);
}

function average(locs)
{
    const avg = {x:0,y:0}
    for (let i = 0; i<locs.length; i++)
    {
        avg.x +=locs[i].x;
        avg.y +=locs[i].y;
    }
    avg.x/=locs.length;
    avg.y/=locs.length;
    return avg;
}
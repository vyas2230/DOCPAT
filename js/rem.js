var timerid = 0;
var images = new Array(	"bag.jpg","bag2.jpg","bag3.jpg");
var countimages = 0;
function startTime()
{
    if(timerid)
    {
        timerid = 0;
    }
    var tDate = new Date();

    if(countimages == images.length)
    {
        countimages = 0;
    }
    if(tDate.getSeconds() % 5 == 0)
    {
        document.getElementById("img-head").src = images[countimages];
    }
    countimages++;

    timerid = setTimeout("startTime()", 1000);
}
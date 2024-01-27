$(document).ready(function()
{
    var dayid = 0;
    document.getElementsByClassName("titleheader")[0].innerHTML = "Day " + 1;
    $(".day").click(function(){
        dayid = $(this).children("span").text();
        document.getElementsByClassName("titleheader")[0].innerHTML = "Day " + dayid;
        clear();
    });

     $("#nextButton").click(function(){
        if(dayid >= 5)
        {
            dayid = 1;
        }
        else
        {
            dayid++;
        } 
        document.getElementsByClassName("titleheader")[0].innerHTML = "Day " + dayid;
        clear();
     });
     
     $("#prevButton").click(function(){
        if(dayid <= 1)
        {
            dayid = 5;
        }
        else
        {
            dayid--;
        } 
        document.getElementsByClassName("titleheader")[0].innerHTML = "Day " + dayid;
        clear();
     });

    $("#clear").click(function(){
        clear();
    });
    
    $(".showLog").click(function(){
        var Data = JSON.parse(localStorage.getItem('logData'));
        for(var i = 0; i < Data.length; i++)
        {
            $(".logList").append("<li>"+Data[i].currentDate+" "
                                    +Data[i].currentTime+" , "
                                    +Data[i].longitude+" , "
                                    +Data[i].latitude+" , "
                                    +Data[i].serial+" , "
                                    +Data[i].pilot+" , "
                                    +Data[i].key+" , "
                                    +Data[i].contract+" , "
                                    +Data[i].category+"</li>");
        }
    });

    $("#saveLog").click(function(){
        if($("#serial").val() != "" && $("#contract").val() != "" && $("#pilot").val() != "" && $("#key").val() != "")
        {
            if($("#serial").val().length == 4)
            {
                if (navigator.geolocation) 
                {
                    var d = new Date($.now());
                    navigator.geolocation.getCurrentPosition(function(position)
                    {
                        var currentDate = d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
                        var currentTime = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
                        // var logData = []
                        
                        payload = 
                        {
                            currentDate: currentDate,
                            currentTime: currentTime,
                            longitude: position.coords.longitude.toFixed(0),
                            latitude: position.coords.latitude.toFixed(0),
                            serial: $('#serial').val(),
                            pilot: $('#pilot').val(),
                            key: $('#key').val(),
                            contract: $('#contract').val(),
                            category: $('#category').val()
                        }
                        var log = JSON.parse(localStorage.getItem('logData') || '[]');
                        log.push(payload)
                        window.localStorage.setItem('logData',JSON.stringify(log));
                    });
                    alert("Save Log");
                    $(".showLog").click();
                } 
                else 
                { 
                    alert("Log not saved. Please fix problem and try again.");
                }
            }
            else
            {
                alert("Drone id code must be 4 number");
            }
        }
        else
        {
            alert('Please enter in fields!');
        }
        
    });

    $("#back").click(function(){
        $(".logList").empty();
        clear();
    });

    $("#yes").click(function(){
        alert("Logs sent");
        $("#back").click();
    });

    $("#cancel").click(function(){
        $("#back").click();
    });
});

function clear()
{
    $("#serial").val('');
    $("#pilot").val('');
    $("#key").val('');
    $("#contract").val('');
    $("#category").val($("#category option:first").val()).change();
}



var countis = 0
var setintfn;
var runnertimes={}
var globalstarttime;
var offsetlastrace = 0;
var lastcurrdatatime;

function resetrunnerfirstlapflag(){
    for (let i in runnertimes){
        runnertimes[i]["firstlapsincestart"] = true
    }
}

function resetrunnertabletimes(){
    $(".lapcount").text("0");
    $(".totaltime").text("todo");
    $(".averagetime").text("todo");
    $(".lastlap").text("");
}

function findoffset(starttime, endtime){

         let offset = endtime - starttime;

         let hours = offset/(1000 *60 * 60)
         hours = Math.floor(hours)

         let minutes = offset%(1000 *60 * 60)
         minutes = minutes/(1000 *60)
         minutes = Math.floor(minutes)

         let seconds = offset%(1000 *60)
         seconds = seconds/(1000)
         seconds = Math.floor(seconds)

         let mseconds = offset%1000
         try{

             mseconds = mseconds.toString();
             console.log(mseconds.length)
             let requiredlen = 3 - mseconds.length;
             mseconds = "0".repeat(requiredlen) + mseconds
             //console.log(mseconds)

             }
         catch(err){

             console.log("error")

         }


         let offsettimestring = hours + 'H '+minutes+'M '+seconds+'S ' + mseconds+'Mi'
         return offsettimestring

}

$(document).ready(function(){
    $("#addname").click(function(){
        countis++;
        let runnerid = "r"+ countis;
        console.log(runnerid)
        let rnameis = $("#namefield").val();
        
        let idtd1 = runnerid + 'td1';
        let idtd2 = runnerid + 'td2';
        let idtd3 = runnerid + 'td3';
        let idtd4 = runnerid + 'td4';
        let tablerowstr = '<tr>\
        <td><button id="'+runnerid+'" class="button button4">'+rnameis+'</button></td>\
        <td id="'+idtd1+'" class="lapcount">0</td>\
        <td id="'+idtd2+'" class="totaltime"></td>\
        <td id="'+idtd3+'" class="averagetime"></td>\
        <td id="'+idtd4+'" class="lastlap"></td>\
        </tr>'
        
        $('table tr:last').after(tablerowstr);

        runnertimes[runnerid] = {            
                lastlaptime:0,
                firstlapsincestart:true                                    
        };

        $("#"+runnerid).click(function(){

            if( globalstarttime == undefined){
                alert("Please click Start Race");
                return;
            }

            let lapcount = $("#"+idtd1).text();
            let offsettime;
            if( lapcount <= 0  ){
                let currlaptimeis = new Date().getTime();                
                runnertimes[runnerid]["lastlaptime"] = currlaptimeis;
                offsettime = findoffset(globalstarttime, currlaptimeis);                
            }
            else{
                let timeoflastlap = runnertimes[runnerid]["lastlaptime"]
                let currlaptimeis = new Date().getTime();
                runnertimes[runnerid]["lastlaptime"] = currlaptimeis;
                offsettime = findoffset(timeoflastlap, currlaptimeis);
            }

            lapcount++;
            runnertimes[runnerid]["firstlapsincestart"] = false


            $("#"+idtd1).text(lapcount);
            $("#"+idtd2).text("todo");
            $("#"+idtd3).text("todo");
            $("#"+idtd4).text(offsettime);
        })
    });

     $("#startrace").click(function(){

        $(this).prop('disabled', true);
        $(".button4").prop('disabled', false);

         counteron = true;
         globalstarttime = new Date().getTime();
         
         setintfn = setInterval(function(){
             currdate = new Date().getTime();

             let cstrtime = findoffset(globalstarttime, currdate);
             $("#timeval").text(cstrtime)
             }, 1);
  
     });

     $("#endrace").click(function(){

            clearInterval(setintfn);
            offsetlastrace = 0;
            $("#startrace").prop('disabled', false);
            $(".button4").prop('disabled', true);
            resetrunnertabletimes();

    });

    $("#endrace").dblclick(function(){

            clearInterval(setintfn);
            offsetlastrace = 0;
            $("#timeval").text("0H 0M 0S 000Mi")  
            $("#startrace").prop('disabled', false);
            $(".button4").prop('disabled', true);
            resetrunnertabletimes();

            /*$("div").append("<select></select>");
            $("select").append("  <option value=\"volvo\">Volvo</option>");
            resetrunnerfirstlapflag();*/
    });

});


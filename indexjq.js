var countis = 0
var setintfn;
var runnertimes={}
var globalstarttime;

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

         mseconds = mseconds.toString();
         let requiredlen = 3 - mseconds.length;
         mseconds = "0".repeat(requiredlen) + mseconds
         //console.log(mseconds)

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
        <td id="'+idtd1+'">0</td>\
        <td id="'+idtd2+'"></td>\
        <td id="'+idtd3+'"></td>\
        <td id="'+idtd4+'"></td>\
        </tr>'
        
        $('table tr:last').after(tablerowstr);

        runnertimes[runnerid] = {            
                lastlaptime:0                                    
        };

        $("#"+runnerid).click(function(){

            if( globalstarttime == undefined){
                alert("Please click Start Race");
                return;
            }

            let lapcount = $("#"+idtd1).text();
            let offsettime;
            if( lapcount <= 0){
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

            $("#"+idtd1).text(lapcount);
            $("#"+idtd2).text("todo");
            $("#"+idtd3).text("todo");
            $("#"+idtd4).text(offsettime);
        })
    });

     $("#startrace").click(function(){

        //$("#startrace").prop("disabled", true);
        //$(this).css("background-color", "#f44336")
       // $(this).css({ 'disabled' : 'true'})
        //$(this).attr("background-color", "#f44336")



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
         clearInterval(setintfn)
         //$("#timeval").text("0H 0M 0S 000Mi")   
         $("#startrace").prop('disabled', false);
         $(".button4").prop('disabled', true);       
    });

});


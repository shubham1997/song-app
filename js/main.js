        $('.cover button').on('click', function() {
            var name = $('#name-input').val();
            //var pass = $('#password-input').val();//password ki string check krne k liye
            //if(name === "test@acadview.com" && pass === "JavascriptRocks")//Check kiya ki strings equal hai ya nhi
            if(name.length > 3)//user gets access only if username input value is greater than or equal to 2 
            {

                var message = "Welcome, " + name;
                $('.main .user-name').text(message);
                $('.cover').addClass('hidden');
                $('.main').removeClass('hidden');
            }
            else
            {
                $('#name-input').removeClass('name-inp').addClass('error');
                //$('#password-input').addClass('error');
                alert("ERROR!!\nUsername should have more than 3 characters");
            }
        });

        var currentSongNumber = 1;
        var willLoop = 0;
        var willShuffle = 0;

        //function to manage the play and pause interface using the fontawesome icons
        function toggleSong(){
            var song = document.querySelector('audio');
            if (song.paused == true) {
                $('.play-icon').removeClass('fa-play').addClass('fa-pause');//removes play icon and adds pause icon
                
                song.play();
                document.getElementById('audioElement').play();
            } 
            else {
                $('.play-icon').removeClass('fa-pause').addClass('fa-play');//removes pause icon and adds play icon
                song.pause();
            }
        }

        $('.play-icon').on('click', function() {
            toggleSong();
        });

        //function to manage the play and pause functionality using the spacebar(keyboard keys)
        $('body').on('keypress',function(event){
            var target = event.target;
            if(event.keyCode == 32 && target.tagName!='INPUT') 
            //spacebar key holds value 32
            {
                toggleSong();
            }
        });


var song = {
        'name': 'Some Name',
        'artist': 'Some Artist',
        'album': 'Some Album',
        'duration': '3:46',
        'fileName': 'song.mp3',
       'image':'song.jpg'
    }
    var songs = [{
        'name': 'Dooriyan',
        'artist': 'Guri',
        'album': 'dooriyan',
        'duration': '3:45',
       'fileName': 'song1.mp3',
        'image':'song1.jpg'
    },
    {
        'name': 'Rabb Jane',
        'artist': 'Garry Sandhu',
        'album': 'Rabb Jane',
        'duration': '3:27',
        'fileName': 'song2.mp3',
        'image':'song2.jpg'
    },
    {
        'name': 'Gangster Scene',
        'artist': 'Gursewak Dhillon',
        'album': 'Gangster Scene',
        'duration': '2:59',
        'fileName': 'song3.mp3',
        'image':'song3.jpg'
    },
    {
        'name': 'Kuwari',
        'artist': 'Mankirt Aulakh',
        'album': 'Kuwari',
        'duration': '3:19',
        'fileName': 'song4.mp3',
        'image':'song4.jpg'
    },
    {
        'name': 'Wang',
        'artist': 'Preet Harpal',
        'album': 'Case-The Time Contious',
        'duration': '5:16',
        'fileName': 'song5.mp3',
        'image':'song5.jpg'
    }];
   
       
        function fancyTimeFormat(time)
        {   
            // Hours, minutes and seconds
            var hrs = ~~(time / 3600);//isko use nhi kiya
            var mins = ~~((time % 3600) / 60);
            var secs = time % 60;

            // Output like "1:01" or "4:03:59" or "123:03:59"
            var ret = "";

            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : ""); //ret variable mey store krliya
            }

            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
        }

        //updates the current time and the duration of the songs.
        function updateCurrentTime(){ 
            var song = document.querySelector('audio');
            var currentTime = Math.floor(song.currentTime);//removes digits present after decimal
            var duration = Math.floor(song.duration);//same as above
            var bar=(currentTime*100)/duration;//for progres bar 
            currentTime = fancyTimeFormat(currentTime);
            duration = fancyTimeFormat(duration)
            $('.time-elapsed').text(currentTime);
            $('.song-duration').text(duration);
            Progressbar(bar);
        }

        function Progressbar(bar){
          var prog = document.querySelector('.progress-filled');
          prog.style.width= bar +"%";//final width css
        }
        $('.player-progress').click(function(event){
            var $this=$(this);
            var selectedLength= event.pageX-$this.offset().left;//jitni length se song play krna h
            var totalLength=$this.width();//song ka total span
            var width=(selectedLength/totalLength)*100;
            var song=document.querySelector('audio');
            song.currentTime=(song.duration*width)/100;
        });

        //setting the volume functionality
        var values = document.querySelector('#vol-control');
        var song = document.querySelector('audio');
        values.addEventListener('change',setVolume)//watching the change
        $('.responsive-pane i').on('click',function(){
                $('.responsive-pane i').removeClass('fa-volume-up').addClass('fa-volume-off');//chaining
                $('.responsive-pane i').removeClass('fa-volume-down').addClass('fa-volume-off');//chaining
                $('.responsive-pane span').text('Muted');
                song.volume=0;
            console.log(song.volume);
        })
        function setVolume(){
            song.volume = this.value / 100;//converts to values in btw 0 n 1
            if(this.value < 50){//font awesome k icon change krne k liye
                $('.responsive-pane i').removeClass('fa-volume-up').addClass('fa-volume-down');//chaining
                $('.responsive-pane span').text(' ');
                values=this.value;
            }
            else if(this.value > 50){
                $('.responsive-pane i').removeClass('fa-volume-down').addClass('fa-volume-up');
                $('.responsive-pane span').text(' ');
                values=this.value;
            }//changing the fa icon
        };

        function changeCurrentSongDetails(songObj) {//song k image name aur album show krn k liye
            $('.current-song-image').attr('src','Img/' + songObj.image)//src mey value dene ka new way
            $('.current-song-name').text(songObj.name)
            $('.current-song-album').text(songObj.album)
        }


        var songNumber = 1;

        function addSongNameClickEvent(songObj, position) //we have made a machine jispe 2 buttons diye hai songName and position ke liye
        {

            var songName = songObj.fileName;
            var id = '#song' + position; //#song ke saath position ko jod do and agar position 1 hai to output #song1 hogi jisse id mein store kar diya
            $(id).click(function() //agar #song1 hai to one vaale div pe event lage ga
                {
                      songNumber= position
                    var audio = document.querySelector('audio');
                    var currentSong = audio.src;
                    if (currentSong.search(songName) != -1) {
                        toggleSong();
                    } else {
                        audio.src = songName;
                        toggleSong();
                        changeCurrentSongDetails(songObj);
                    }
                });
        }

        

window.onload = function() {
    changeCurrentSongDetails(songs[0]);
    for(var i =0; i < songs.length;i++) {
        var obj = songs[i];
        var name = '#song' + (i+1);
        var song = $(name);
        song.find('.song-name').text(obj.name);
        song.find('.song-artist').text(obj.artist);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
        addSongNameClickEvent(obj,i+1);
    }
updateCurrentTime(); 
setInterval(function() {
updateCurrentTime();
},1000);
   $('#songs').DataTable({
        paging: false
    })
};


$('.fa-repeat').on('click',function(){
    $('.fa-repeat').toggleClass('inactive');
    willLoop = 1- willLoop; //for repeat
});

$('.fa-random').on('click',function(){
    $('.fa-random').toggleClass('inactive');
    willShuffle = 1- willShuffle; //for shuffle
});

//to keep songs continuing and checking if or not repeat is requested
$('audio').on('ended',function(){
    var audio = document.querySelector('audio');
    if(willLoop==0){//agar repeat icon press nhi kia hua
        if(currentSongNumber < songs.length)
        {
            var nextSongObj = songs[currentSongNumber];//immediatee next song ko select krta h
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
            currentSongNumber = currentSongNumber + 1;
        }
        else{
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            audio.currentTime = 0;
        }
    }
    else if(willLoop==1){// repeat icon activate krne pr
        if(currentSongNumber < songs.length)
        {
            var nextSongObj = songs[currentSongNumber];
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
            currentSongNumber = currentSongNumber + 1;
        }
        else if(currentSongNumber = songs.length){
            var nextSongObj = songs[0]; //phir se list k pehle wale song ko select r leta h
            audio.src = nextSongObj.fileName;
            toggleSong();
            changeCurrentSongDetails(nextSongObj);
            currentSongNumber = 1;
        }
    }
    else if(willShuffle==1){
       
    }
});

var next = document.querySelector('.fa-step-forward')
next.addEventListener('click',function(){
    var audio=document.querySelector('audio');
    if(songNumber<songs.length){//songNumber agar limit k andar h tho next song selct karenge
        var nextSong = songs[songNumber];
        audio.src=nextSong.fileName;
        changeCurrentSongDetails(nextSong)
        songNumber++;
        toggleSong();
    }
   else if(songNumber=songs.length){//agar song akhri h
       changeCurrentSongDetails(songs[0])//tho phir pehla song select hojayega
       toggleSong();
        songNumber=1;
    }
});

var previos = document.querySelector('.fa-step-backward')
previos.addEventListener('click',function(){
    var audio=document.querySelector('audio');
    if(songNumber>1){//ye Next ka opposie h
            var prevSong=songs[songNumber-2];
            audio.src=prevSong.fileName;
            changeCurrentSongDetails(prevSong);
            toggleSong();
            songNumber--;
        }
   else{
            var prevSong=songs[songs.length-1];
            audio.src=prevSong.fileName;
            changeCurrentSongDetails(prevSong);
            toggleSong();
            songNumber=songs.length;
    }
})

function timeJump(){var song = document.querySelector('audio');song.currentTime=song.duration-5;}
//song ko jump krwane k liye





<!--visualizer-code-->
$(document).ready(function () {
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioElement = document.getElementById('audioElement');
var audioSrc = audioCtx.createMediaElementSource(audioElement);
var analyser = audioCtx.createAnalyser();

// Bind our analyser to the media element source.
audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);

var frequencyData = new Uint8Array(200);

var svgHeight = '300';
var svgWidth = '800';
var barPadding = '1';

function createSvg(parent, height, width) {
  return d3.select(parent).append('svg').attr('height', height).attr('width', width);
}

var svg = createSvg('.visualizer', svgHeight, svgWidth);
var d = 28;
// Create our initial D3 chart.
svg.selectAll('rect')
   .data(frequencyData)
   .enter()
   .append('rect')
   .attr('x', function (d, i) {
      return i * (svgWidth / frequencyData.length);
   })
   .attr('width', svgWidth / frequencyData.length - barPadding);

// Continuously loop and update chart with frequency data.
function renderChart() {
   requestAnimationFrame(renderChart);

   // Copy frequency data to frequencyData array.
   analyser.getByteFrequencyData(frequencyData);

   // Update d3 chart with new data.
   svg.selectAll('rect')
      .data(frequencyData)
      .attr('y', function(d) {
         return svgHeight - d;
      })
      .attr('height', function(d) {
         return d;
      })
      .attr('fill', function(d) {
         return 'rgb(234, 224, ' + d + ')';
      });
}

// Run the loop
renderChart();
});
 $('.fa-music').on('click', function() {
            
                $('.dataTables_wrapper').addClass('hidden');
                $('.visualizer').removeClass('hidden');
           
        });


 $('.fa-home').on('click', function() {
     
                $('.visualizer').addClass('hidden');       
                $('.dataTables_wrapper').removeClass('hidden');
           
        });
    





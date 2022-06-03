
var penguinCount = 0;
var maxCount = 0;
var tickAudio = new Audio('./audio/tick.mp3');
var bombAudio = new Audio('./audio/bomb.mp3');
var tadaAudio = new Audio('./audio/tada.mp3');
var penguinIds = [];

function updateScore() {
     if (penguinCount > maxCount) maxCount = penguinCount;
     $("#score").html("Max : " + maxCount + " Current : " + penguinCount);
}
    
function shufflePenguins() {
    penguinIds.sort(() => Math.floor(Math.random() * 3 - 1)); 
    var items = document.querySelector("#itemsList");
    penguinIds.forEach((i, j) => items.appendChild(items.children[i]));
}

function getPenguinIds() {
    $("#itemsList")
    .children()
    .each((i, j) => penguinIds.push(j.id));
}

function addClass(currentElement) {
  var currentId = currentElement.id;
  return "p" + currentId.slice(7, currentId.length);
}

function start(){
    $(".popup-overlay, .popup-content").addClass("active");
    $('#backdrop').addClass('backdrop');
    $('#restart').css('z-index','-1');
}

$(document).ready( function() {
  start();
  getPenguinIds();
  shufflePenguins();
  updateScore();
    
  var penguins = $("[id^=penguin]");
  var yeti = $("#yeti");
    
    $('#start').click(function(){
        $(".popup-overlay, .popup-content").removeClass("active");
        $('#backdrop').removeClass('backdrop');
        $('#restart').css('z-index','0');
    })
     $('#restart').click(function(){
       getPenguinIds();
       shufflePenguins();
         penguinCount=0;
         maxCount=0;
       updateScore();
          penguins.each((k, v) => {v.classList = "";});
    })
    
penguins.mousedown(function() {
    if (this.classList == "") {
      this.classList.add(addClass(this));
      tickAudio.play();
      penguinCount+=10 ;
      updateScore();
    }
  });

  yeti.mousedown(function() {
     $('#backdrop').addClass('backdrop');
       $('#restart').css('z-index','-1');
     this.classList.add("y");
     var arr = [];
     penguins.each((k, v) => {
          var i = v.classList;
         if(i.value)
          arr.push(i)
     });
     penguins.each((k, v) => {v.classList = "";});
      
     if(arr.length>=8) {
         tadaAudio.play();
         penguinCount+=20 ;
         updateScore();
     }else{
          bombAudio.play();
     }
   
    setTimeout(() => {
        var r= (arr.length>=8)?confirm("Congratulation ! You won the game"): confirm('You lose ! Game Over');
        
        if (r==true)
        {
          $('#backdrop').removeClass('backdrop');
             $('#restart').css('z-index','0');
        }
        else{ $('#backdrop').removeClass('backdrop'); $('#restart').css('z-index','0');}
        
      yeti.removeClass("y");
     
      penguinCount = 0;
      updateScore();
      shufflePenguins();
    }, 100);
  });
    
});
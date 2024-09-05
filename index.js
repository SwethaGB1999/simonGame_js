let buttonColours=['red','blue','green','yellow'];
var gamePattern=[];
var userClickedPattern=[];
let level=0;
let started=false;


function nextSequence(){
    level+=1;
    $('h1').text('Level '+level);
    userClickedPattern=[]; //user patter is rest everytime next sequence is called. important step!
    var randomNumber=Math.floor(Math.random()*4);
    gamePattern.push(buttonColours[randomNumber]);
    console.log(randomNumber);
    console.log(gamePattern);
    $('.'+buttonColours[randomNumber]).fadeOut(100).fadeIn(100);
    var audio=new Audio('sounds/'+buttonColours[randomNumber]+'.mp3');
    audio.play();
 
}
// $(document).on('click',function(){
//     nextSequence();
// });
$('.btn').click(function(){
    var userChosenColor=$(this).attr('id');
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    var audio2= new Audio('sounds/'+userChosenColor+'.mp3');
    audio2.play();
    
    $('#'+userChosenColor).addClass('pressed');
    setTimeout(function(){
        $('#'+userChosenColor).removeClass('pressed');
    },100);
    checkAnswer(userClickedPattern.length-1);
    

});

$(document).on('keypress',function(){
    if(!started){
        nextSequence();
    
        $('h1').text('Level '+level);
        started=true;
    }

});

function checkAnswer(currentLevel){
    
        if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
            console.log('success!');

            if(userClickedPattern.length===gamePattern.length){
            setTimeout(function() {nextSequence()},1000);
        }
        } else{
            console.log('wrong');
            $('body').addClass('game-over');
            setTimeout(function(){
                $('body').removeClass('game-over');
            },200);
            let audio3=new Audio('./sounds/wrong.mp3');
            audio3.play();
            started=false;
            $('h1').text('Game over , press any Key to Start.');
            level=0;
            gamePattern=[];
            
        }
}
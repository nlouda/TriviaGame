$(document).ready(function()
{
// questions
var trivia = [
{
question:"What subject does Proffesor McGonagall teach?",
choices:["Potions","Transfiguration","Charms","History of Magic"],
answers: [false,true,false,false],
},
{
question:"Harry, Ron, and Hermione help save the Sorcerer's Stone from being stolen. How old was its co-creator, Nicholas Flamel, when he decided to destroy it?",
choices:["1000", "945","445","665"],
answers:[false,false,false,true],
},
{
    question:"Who was the Wooping Willow planted for?",
    choices:["Remus Lupin","Rubeus Hagrid","Dumbledore","Sirius Black"],
    answers:[true,false,false,false],
},
{
    question:"Who is Harry Potter most afraid of?",
    choices:["Snape","Dead family & friends","Dementors","Voldemort"],
    answers:[false,false,true,false],
},
{
    question:"What's the name of Bellatrix husband?",
    choices:["Albert Lestrange ","Rolphius Lestrange","Adolph Lestrange","Rodolphus Lestrange"],
    answers:[false,false,false,true],
},
{
    question:"What is the name of Fleur Delacour's sister?",
    choices:["Victorie","Dominique","Flora","Gabrielle"],
    answers:[false,false,false,true],
},
{
    question:"Which class did Severus Snape always want to teach?",
    choices:["Potions","Defense Against the Dark Arts","History of Magic","Transfiguration"],
    answers:[false,true,false,false],
}
] // end of trivia questions

var currentQuestion = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;


$("#start").on('click', displayQ)


function displayQ(){
    $(".message-content").remove();
    $("#start").remove();

var questionArea = $("<div>");
questionArea.attr("id","question-area")
var timer = $("<h2>")
var question = $("<h2>")

questionArea.appendTo("#content")
timer.appendTo(questionArea)
question.appendTo(questionArea)

var time = 10;
timer.html("<h2>" + time + " seconds remaining</h2>")

var countDown = setInterval(function(){
    time--;
    timer.html("<h2>" + time + " seconds remaining</h2>")

    if(time === 0){
        clearInterval(countDown)
        questionArea.fadeToggle("slow", timedOut)
        unanswered++;
    }
}, 1000);
//question display
question.html(trivia[currentQuestion].question)
// for loop to display current question
for(var i = 0; i < trivia[currentQuestion].choices.length; i++)
{
var choices = $("<button>")
choices.html(trivia[currentQuestion].choices[i])
choices.addClass("answer-buttons")
choices.attr("value", trivia[currentQuestion].answers[i])
choices.attr("id", "a" + i)
choices.appendTo(questionArea)
};


$(".answer-buttons").on("click",function(){
    console.log($(this).attr("value"));

    if($(this).attr("value")==="true"){
        questionArea.fadeToggle("slow", displayCorrect)
        clearInterval(countDown)
        correct++;
    };

    if($(this).attr("value")==="false"){
        questionArea.fadeToggle("slow", displayIncorrect)
        clearInterval(countDown)
        incorrect++;
    };

});
};

function displayCorrect(){
    var cycle = setTimeout(displayQ,2000);
    var messageArea = $("<div>");
    messageArea.addClass("message-content")
    var winMessage=$("<h2>");
    messageArea.appendTo($("#content"));
    winMessage.appendTo($(messageArea));
    winMessage.html("Correct!");

if(currentQuestion === (trivia.length -1)){
    clearTimeout(cycle);
    setTimeout(gameOver, 1000)
}
currentQuestion++;

};
function displayIncorrect(){
    var cycle = setTimeout(displayQ, 2000);
    var messageArea = $("<div>");
    messageArea.addClass("message-content")
    var lossMessage=$("<h2>");
    messageArea.appendTo($("#content"));
    lossMessage.appendTo($(messageArea));
    lossMessage.html("Wrong! The right answer was: " + trivia[currentQuestion].choices[trivia[currentQuestion].answers.indexOf(true)]);
    
if(currentQuestion === (trivia.length -1)){
    clearTimeout(cycle);
    setTimeout(gameOver, 1000)
}
currentQuestion++;
};

function timedOut(){
    var cycle = setTimeout(displayQ, 2000);
    var messageArea = $("<div>");
    messageArea.addClass("message-content")
    var lossMessage = $("<h2>");
    messageArea.appendTo($("#content"));
    lossMessage.appendTo(messageArea)
    lossMessage.html("You timed out! The right answer was: " + trivia[currentQuestion].choices[trivia[currentQuestion].answers.indexOf(true)]);
    
    if (currentQuestion === (trivia.length - 1)) { 
      clearTimeout(cycle);
      setTimeout( gameOver, 1000)
    }
    currentQuestion++;   
};


function gameOver(){
$(".message-content").remove();
var totalCorrect = $("<h5>")
var totalIncorrect = $("<h5>")
var totalUnanswered = $("<h5>")
var restart = $("<button>")
totalCorrect.appendTo($("#content"))
totalCorrect.html("You have "+correct+" correct!")
totalIncorrect.appendTo($("#content"))
totalIncorrect.html("You have "+incorrect+" wrong.")
totalUnanswered.appendTo("#content")
restart.appendTo("#content")

if(unanswered=== 1){
    totalUnanswered.html("You did not answer " + unanswered +" question.")
}
if(unanswered === 0 || unanswered > 1){
    totalUnanswered.html("You didn't answer " + unanswered + " questions.")  
}


restart.addClass("restart")
restart.text("Restart")
restart.appendTo($("#content"))


$(".restart").on("click", function() {
  totalCorrect.remove();
  totalIncorrect.remove();
  totalUnanswered.remove();
  restart.remove();
  currentQuestion = 0;
  correct = 0; 
  wrong = 0;
  unanswered = 0;
  displayQ();
})
}

})



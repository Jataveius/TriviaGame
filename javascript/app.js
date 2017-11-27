$(document).ready(function () {
    
// Start Button
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

// Reset Button
$('#reset').on('click', function(){
	$(this).hide();
	newGame();
});

// // Hide questions
// $('.question').click(function() {
//     $('#' + $(this).data('rel')).show().siblings('div').hide();
// })

// Questions array
var question;
var answer;
var currentQuestion;
 var correctAnswer; 
 var wrongAnswer; 
 var unanswered; 
 var seconds; 
 var time; 
 var answered; 
 var userSelect;

//  http://www.triviaplaying.com/287-Trivia-Questions-Answers-funny.htm 
 
var question = [{ 
    q:"1. It was illegal for women to wear what in 19th century Florence?",
 
       answer: ["Pants, Sneakers, Buttons, Short cut hairsytles"],

       correctAnswer: 2,
},{


    q: "2. What was the first animated film to be nominated for a best picture Oscar?",
 
    answer: ["Bamby, Beauty and the Beast, Little Mermaid, Lion King"],
    
           correctAnswer: 1,
},{

q:"3. What was superhero Green Lantern vulnerable to?",
        answer: ["Anything Yellow, Losing his Ring, Darkside, Mogo Stone, from his home planet"],
 
          correctAnswer: 1,
},{
 
    q:"4. On Scooby Doo what was Shaggys real name?",
    answer: ["Norville, Roger, Thomas, Shag"],

        correctAnswer: 1, 
 
},{
    q: "5. What is Olive Oyls brothers name?",
    answer: ["Peanut Oyl, Palm Oyl, Caster Oyl, Hemp Oyl"],

    correctAnswer: 2,
},{

    q:"6. "

},{
    q:"7. "

},{
    q:"8. "
},{

    q:"9. "
 },{   
    q:"10. "
    


// Results
 var result = {
	correct: "That's Correct!",
	incorrect: "Wrong Choice!",
	timesUp: "Times Up!",
	finished: "Here is how you did!."
}

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#wrongAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	wrongAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#ques').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+ question.length);
	$('.question').html('<h2>' + question[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(question[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and check answer
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 30;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = question[currentQuestion].answerList[question[currentQuestion].answer];
	var rightAnswerIndex = question[currentQuestion].answer;

    //checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		wrongAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.timesUp);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (question.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#ques').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#wrongAnswers').html("Wrong Answers: " + wrongAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#reset').addClass('reset');
	$('#reset').show();
	$('#reset').html('Reset Game?');
}
});
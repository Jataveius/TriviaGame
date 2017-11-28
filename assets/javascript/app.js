					//  http://www.triviaplaying.com/287-Trivia-Questions-Answers-funny.htm 
					var questions=[{
						q:"It was illegal for women to wear what in 19th century Florence?",
						multipleChoice: [
							"Pants",
							"Sneakers",
							"Buttons",
							"Short cut hairsytles"],
						answer: 2,
					
					},{
						q:"What was the first animated film to be nominated for a best picture Oscar?",
						multipleChoice: [
							"Bamby",
							 "Beauty and the Beast", 
							 "Little Mermaid", 
							 "Lion King"],
						answer: 1,
					}, {
						q:"What was superhero Green Lantern vulnerable to?",
						multipleChoice: [
							"Anything Yellow", 
							"Losing his Ring", 
							"Darkside", 
							"Mogo Stone, from his home planet"],
						answer: 0,
					}, {
						q:"On Scooby Doo what was Shaggys real name?",
						multipleChoice: [
							"Norville", 
							"Roger", 
							"Thomas", 
							"Shag"],
						answer: 0,
					}, {
						q: "What is Olive Oyls brothers name?",
						multipleChoice: [
							"Peanut Oyl", 
							"Palm Oyl", 
							"Caster Oyl", 
							"Hemp Oyl"],
						answer: 2,
					}, {
						q: "Which plant was Ulma Thurman named after in Batman & Robin? ",
						multipleChoice: [
							"Daisy",
							"Marigold",
							"Rose",
							"Ivy"],
						answer: 3,
					}, {
						q: "How many friends are there in the Friends tv show? ",
						multipleChoice: [
							"four",
							"seven",
							"six",
							"five"],
						answer: 2,
					}, {
						q: "In Cheyenne Wyoming what is illegal on Wednesday? ",
						multipleChoice: [
							"Taking a shower",
							"Driving on one-way roads",
							"Water your yard",
							"Going to work"],
						answer: 0,
					}, {
						q: "Einstein called what ,the most difficult thing to understand?",
						multipleChoice: [
							"Electricity",
							"Income Tax",
							"Mathmatics",
							"Queen's English"],
						answer: 1,
					}, {
						q: "What was used as Dr McCoy's medical scanner in Star Trek?",
						multipleChoice: [
							"stapler",
							"x-ray machine",
							"t.v.",
							"salt shaker"],
						answer: 3,
					}];


					var currentQuestion;
					var answer;
					var wrongAnswer;
					var unanswered;
					var seconds;
					var time;
					var answered;
					var userSelect;

					// Button to start the game
				
					$('#startBtn').on('click', function () {
						$(this).hide();
						newGame();
					});

					// Button to Reset the game
					$('#resetButton').on('click', function () {
						$(this).hide();
						newGame();
					});

					function newGame() {
						$('#finalMessage').empty();
						$("#answer").empty();
						$('#wrongAnswers').empty();
						$('#unanswered').empty();
						currentQuestion = 0;
						answer = 0;
						wrongAnswer = 0;
						unanswered = 0;
						newQuestion();
					}

					function newQuestion() {
						$('#message').empty();
						$('#answer').empty();
						$('#gif').empty();
						answered = true;

						//Sets new questions & multipleChoice
						$('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + questions.length);
						$('.q').html('<h2>' + questions[currentQuestion].q + '</h2>');
						for (var i = 0; i < 4; i++) {
							var choices = $('<div>');
							choices.text(questions[currentQuestion].multipleChoice[i]);
							choices.attr({
								'data-index': i
							});
							choices.addClass('thisChoice');
							$('.multipleChoice').append(choices);
						}
						countdown();
						//Pauses the questions bettween answers
						$('.thisChoice').on('click', function () {
							userSelect = $(this).data('index');
							clearInterval(time);
							answerPage();
						});
					}
					// Count down

					function countdown() {
						seconds = 30;
						$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
						answered = true;
						time = setInterval(showCountdown, 1000);
					}

					function showCountdown() {
						seconds--;
						$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
						if (seconds < 1) {
							clearInterval(time);
							answered = false;
							answerPage();
						}
					}

					// Messages section
					var messages = {
						correct: "Your right!",
						incorrect: "No that's wrong.",
						timesUp: "Your time is Up!",
						finished: "Here's how you did."
					}

					// Clears the questions
					function answerPage() {
						$('#currentQuestion').empty();
						$('.thisChoice').empty(); 
						$('.q').empty();

						// Multiple Choice section
						var rightAnswerText = questions[currentQuestion].multipleChoice[questions[currentQuestion].answer];
						var rightAnswerIndex = questions[currentQuestion].answer;
		
						if ((userSelect == rightAnswerIndex) && (answered == true)) {
							answer++;
							$('#message').html(messages.correct);
						} else if ((userSelect != rightAnswerIndex) && (answered == true)) {
							wrongAnswer++;
							$('#message').html(messages.incorrect);
							$('#answer').html('The correct answer was: ' + rightAnswerText);
						} else {
							unanswered++;
							$('#message').html(messages.timesUp);
							$('#answer').html('The correct answer was: ' + rightAnswerText);
							answered = true;
						}

						if (currentQuestion == (questions.length - 1)) {
							setTimeout(scoreboard, 5000)
						} else {
							currentQuestion++;
							setTimeout(newQuestion, 5000);
						}
					}

					// Score 
					function scoreboard() {
						$('#timeLeft').empty();
						$('#message').empty();
						$('#answer').empty();
					
						// The final message 
						$('#finalMessage').html(messages.finished);
						$('#answer').html("The Correct Answers: " + answer);
						$('#wrongAnswers').html("The Incorrect Answers: " + wrongAnswer);
						$('#unanswered').html("Unanswered: " + unanswered);
						$('#resetButton').addClass("reset");
						$('#resetButton').show();
						$('#resetButton').html("Reset Game");
					}
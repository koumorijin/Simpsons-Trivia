$(document).ready(function(){
	
	let questionArray = ["In 'Lisa Goes Gaga' what does Lisa nickname herself on the school blog?", "In 'The Girl Code' what do Lisa and her programming friends call their predictive social media AI app?",
						 "When was 'The Simpsons' first aired on braodcast television?","As of December 2017 how many episodes have been aired?","What are the names of the two reoccuring aliens on the show?",
						 "In 'Tree House of Horror XX' what turns the citizens of Springfield into 'munchers'?","'In the Principal and the Pauper' what is Principal Seymour Skinner's actual name?",
						 "What is the name of the local Springfield baseball team?","How many puppies did She's the Fastest, Santa's Little Helper companion greyhound, have?",
						 "In 'Homer at the Bat' what was the fate of Ken Griffey Jr.?"];
	let answerArray = [["Truthteller", "Snowden", "Deepthroat", "Whistleblower"],["Trevor","Princeton","Conrad","Michael"],["May 23, 1992","January 12, 1991","December 17, 1989", "June 19,1985"],
						["726","468","626","897"],["Kung and Kudo","Larry and Lyle","Lang and Lodos","Kang and Kodos"],["Radioactive Fallout","Burger Squared","A Flu from China","Weird Science"],
						["Billy Joel","Labzhob Turgenisten","Adam Smith","Armin Tamzarian"],["The Physcicists","The Atoms","The Isotopes","The Electrons"],["10","20","17","25"],
						["He develops 'gigantism' after drinking too much brain and nerve tonic.","He falls into the never ending pit.","He's kicked off theam for having sideburns.","He gets arrested by the Springfiled Police, and charged with every open crime."]];
	let correctAnswerArray = ["A: Truthteller","C: Conrad","C: December 17, 1989","C: 626","D: Kang and Kodos","B: Burger Squared","D: Armin Tamzarian","C: The Isotopes","D: 25","A: He develops 'gigantism' after drinking too much brain and nerve tonic."];
	let correctAnswers = 0;
	let wrongAnswers = 0;
	let unanswered = 0;
	let counter = 10;
	let timer;
	let questionCounter = 0;
	let gameContainer;

	$("#startButton").click(function(){	
		$(".start").empty();
		//console.log("I was clicked");
		generateHTML();
		timerWrapper();
	});

	$("body").on("click", ".answer", function(event){
		selectedAnswer = $(this).text();
		console.log(selectedAnswer);
		if(selectedAnswer === correctAnswerArray[questionCounter]){
			correctAnswer();
			clearInterval(timer);
		}else{
			wrongAnswer();
			clearInterval(timer);
		}
	});

	$("body").on("click", ".reset-button", function(){
		resetGame();
	})

	function generateHTML(){
		gameContainer = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>10</span></p><p class='text-center'><img class='center-block img-responsive question-image' src='./assets/images/homerThinking.png'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A: " + answerArray[questionCounter][0] + "</p><p class='answer'>B: " + answerArray[questionCounter][1] + "</p><p class='answer'>C: " + answerArray[questionCounter][2] + "</p><p class='answer'>D: " + answerArray[questionCounter][3] + "</p>";
		$(".start").html(gameContainer);
	}
	function timerWrapper(){
		timer = setInterval(tenSeconds,1000);
		function tenSeconds(){
			if(counter === 0){
				clearInterval(timer);
				timeoutLoss();
			}
			if(counter > 0){
				counter --;
			} 
			$(".timer").html(counter);
		}
	}
	function timeoutLoss(){
		unanswered ++;
		gameContainer = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p><p class='text-center'>You took to long!</p><p class='text-center'>The correct answer is " + correctAnswerArray[questionCounter] + "</p><img class='center-block img-responsive' src='./assets/images/bartFail.png'>";
		$(".start").html(gameContainer);
		setTimeout(wait,4000); 
	}
	function correctAnswer(){
		correctAnswers++;
		gameContainer = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p><p class='text-center'>Nice job hotshot!</p><p class='text-center'>Your answer " + correctAnswerArray[questionCounter] + " is correct!</p><img class='center-block img-responsive' src='./assets/images/bartSlingShot.png'>";
		$(".start").html(gameContainer);
		setTimeout(wait,4000);
	}
	function wrongAnswer(){
		wrongAnswers++;
		gameContainer = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p><p class='text-center'>Doh!</p><p class='text-center'>The correct answer is " + correctAnswerArray[questionCounter] + "</p><img class='center-block img-responsive' src='./assets/images/bartFail.png'>";
		$(".start").html(gameContainer);
		setTimeout(wait,4000);
	}
	function wait(){
		if(questionCounter < 9){
			questionCounter++;
			generateHTML();
			counter = 10;
			timerWrapper();
		}else{
			endGame();
		}
	}
	function endGame(){
		if(correctAnswers >= 7){
			gameContainer = "<p class='text-center'>Great Job!  You really know your Simpsons!</p><p class='text-center'>Here's how you did: </p><p class='summary-correct'>Correct Answers: " + correctAnswers + "</p><p class='summary-wrong'>Wrong Answers: " + wrongAnswers + "</p><p class='summary-unanswered'> Unanswered Questions: " + unanswered + "</p><p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Play Again!</a></p>";
			$(".start").html(gameContainer);  
		}else if(correctAnswers >= 5){
			gameContainer = "<p class='text-center'>Nice Job!  You kinda know what your talking about!</p><p class='text-center'>Here's how you did: </p><p class='summary-correct'>Correct Answers: " + correctAnswers + "</p><p class='summary-wrong'>Wrong Answers: " + wrongAnswers + "</p><p class='summary-unanswered'> Unanswered Questions: " + unanswered + "</p><p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Play Again!</a></p>";
			$(".start").html(gameContainer);  
		}else{
			gameContainer = "<p class='text-center'>Doh!  You should try again for a better score!</p><p class='text-center'>Here's how you did: </p><p class='summary-correct'>Correct Answers: " + correctAnswers + "</p><p class='summary-wrong'>Wrong Answers: " + wrongAnswers + "</p><p class='summary-unanswered'> Unanswered Questions: " + unanswered + "</p><p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Play Again!</a></p>";
			$(".start").html(gameContainer);  
		}
	}
	function resetGame(){
		questionCounter = 0;
		correctAnswers = 0;
		wrongAnswers = 0;
		unanswered = 0;
		counter = 10;
		generateHTML();
		timerWrapper();
	}
});












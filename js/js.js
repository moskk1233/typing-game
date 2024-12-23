const words = [
	'more',
	'you',
	'saw',
	'the',
	'life',
	'there',
	'look',
	'good',
	'down',
	'by',
	'between',
	'red',
	'first',
	'state',
	'spell',
	'keep',
	'not',
	'best',
	'might',
	'while',
	'work',
	'still',
	'good',
	'always',
	'father',
	'those',
	'line',
	'line',
	'took',
	'word',
	'keep',
	'first',
	'tell',
	'place',
	'different',
	'back',
	'not',
	'children',
	'much',
	'our',
	'next',
	'help',
	'something',
	'around',
	'mother',
	'our',
	'ask',
	'stop',
	'got',
	'night',
	'always',
	'these',
	'as',
	'black',
	'story',
	'kind',
	'plant',
	'now',
	'man',
	'need',
	'girl',
	'side',
	'make',
	'other',
	'so',
	'part',
	'page',
	'under',
	'her',
	'name',
	'group',
	'might',
	'plant',
	'few',
	'use',
	'house',
	'hard',
	'how',
	'hand',
	'white',
	'sound',
	'he',
	'talk',
	'word',
	'being',
	'would',
	'could',
	'same',
	'page',
	'saw',
];

$(document).ready(function() {
	let score = 0;
	let timeLeft = 60;
	let timer;
	let currentTypedWord = '';
	let incorrectCount = 0;
	let isGameRunning = false;

	function startGame() {
		score = 0;
		timeLeft = 60;
		currentTypedWord = '';
		incorrectCount = 0;
		isGameRunning = true;
		$('#score-dashboard .fs-1').first().text(score);
		$('#score-dashboard .fs-1').last().text(timeLeft);
		$('#game-btn').prop('disabled', true);
		$('#typed-word').text('').removeClass('text-danger text-success');
		nextWord();
		timer = setInterval(updateTime, 1000);
	}

	function updateTime() {
		timeLeft--;
		$('#score-dashboard .fs-1').last().text(timeLeft);
		if (timeLeft <= 0) {
			clearInterval(timer);
			$('#game-btn').prop('disabled', false);
			alert('Game Over! Your score is ' + score);
		}
	}

	function nextWord() {
		const randomIndex = Math.floor(Math.random() * words.length);
		$('#game-word').text(words[randomIndex]);
		currentTypedWord = '';
		incorrectCount = 0;
		$('#typed-word').text('').removeClass('text-danger text-success');
	}

	$(document).keypress(function(event) {
		if (!isGameRunning) return;
		
		const key = String.fromCharCode(event.which).toLowerCase();
		const currentWord = $('#game-word').text();

		if (key === currentWord[currentTypedWord.length]) {
			currentTypedWord += key;
			$('#typed-word').text(currentTypedWord).removeClass('text-danger').addClass('text-success');
		} else {
			incorrectCount++;
			$('#typed-word').addClass('text-danger');
			if (incorrectCount >= 2) {
				if (score > 0) {
					score--;
				}
				$('#score-dashboard .fs-1').first().text(score);
				nextWord();
			}
		}
		
		if (currentTypedWord === currentWord) {
			score++;
			$('#score-dashboard .fs-1').first().text(score);
			nextWord();
		}
	})

	$('#game-btn').click(startGame);
})
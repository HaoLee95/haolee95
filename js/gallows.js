(function () {
	'use strict';

	var lettersWrapper = document.getElementById('alphabet');
	var imageWrapper = document.getElementById('image-wrapper');
	var resultElement = document.getElementById('result');
	var lettersToWrap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var phraseToGuess = 'NETWORK MEDIA SOGANG';
	var maxFailsNumber = 9;
	var sounds = {
		success: new Audio('./sounds/success.wav'),
		fail: new Audio('./sounds/fail.wav')
	};
	var guessFails = 0;
	var uncoveredLetters = [];

	function updateImage() {
		imageWrapper.innerHTML = '';

		var image = imageWrapper.appendChild(document.createElement('img'));
		image.src = './img/s' + guessFails + '.jpg';
	};

	function updateResult() {
		resultElement.innerHTML = phraseToGuess.split('').map(function (phraseLetter) {
			if (phraseLetter === ' ' || uncoveredLetters.indexOf(phraseLetter) > -1) {
				return phraseLetter;
			}

			return '-';
		}).join('');
	};

	function discoverLetter(letter, letterElement) {
		if (letterElement.classList.contains('discovered')) return;

		letterElement.classList.add('discovered');

		if (phraseToGuess.indexOf(letter) > -1) {
			letterElement.classList.add('success');
			sounds.success.play();
			uncoveredLetters.push(letter);
			updateResult();

			var isGuessed = phraseToGuess.split('').every(function (letter) {
				return letter === ' ' || uncoveredLetters.indexOf(letter) > -1;
			});

			if (isGuessed) showResult(true);
		} else {
			letterElement.classList.add('fail');
			sounds.fail.play();

			if (++guessFails > maxFailsNumber) showResult(false);
			else updateImage();
		}
	};

	function showResult(state) {
		var gameState = ['Loser... :<', 'Winner :D'][+state];
		var resetElement = document.createElement('a');

		resetElement.href = '';
		resetElement.innerHTML = 'ONCE AGAIN? ( ͡° ͜ʖ ͡°)';
		resetElement.classList.add('reset');

		lettersWrapper.innerHTML = gameState + '! Correct word: ' + phraseToGuess;
		lettersWrapper.appendChild(resetElement);
	};

	function appendLetters() {
		lettersToWrap.split('').forEach(function (letter, index) {
			var letterElement = lettersWrapper.appendChild(document.createElement('div'));
			var letterPosition = index + 1;
			var lettersInWidth = 7;

			if (letterPosition % lettersInWidth === 0) {
				var clearfixElement = lettersWrapper.appendChild(document.createElement('div'));
				clearfixElement.classList.add('clearfix');
			}

			letterElement.innerHTML = letter;
			letterElement.classList.add('letter');
			letterElement.addEventListener('click', function () {
				return discoverLetter(letter, letterElement);
			}, false);
		});
	};

	appendLetters();
	updateResult();
	updateImage();
})();

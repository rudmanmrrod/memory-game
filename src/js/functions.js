/**
 * Function to start game
 * @method startGame
 * @return loadtable on card number 
 */
function startGame(){
	var card_number = $('#card_number').val();
	var difficulty = $('input[name=difficulty]:checked').val()
	if(card_number>=10){
		$('#timer').show();
		loadTable(card_number);
		timeStart();
	}
}

/**
 * Function to load table on central screen
 * @method loadTable
 * @param {int} items
 * @return cards on central table 
 */
function loadTable(items){
	var html = '';
	for (var i = parseInt(items); i >= 0; i--) {
		html += '<div class="col s2 m2">';
		html += '<div class="card card-grid" onclick=flipCard(this)>';
		html += '<div class="front">';
		html += 'Front content';
		html += '</div>';
		html += '<div class="back">';
		html += 'Back content';
		html += '</div>';
		html += '</div>';
		html += '</div>';
	}
	$('#content .row').html(html);
	$(".card-grid").flip({
	  trigger: 'manual'
	});
} 

/**
 * Function to flip card
 * @method flipCard
 * @param {object} element
 * @return flip clicked element
 */
function flipCard(element){
	var flip = $(element).data("flip-model");
	var active = 0;
	$.each($(".card-grid"),function(key,value){
		var fliped_element = $(value).data("flip-model");
		if(fliped_element.isFlipped){
			active += 1;
		}
	});
	if(active>=2){
		$.each($(".card-grid"),function(key,value){
			$(value).flip(false);
		});
	}
	if(flip.isFlipped==false){
		$(element).flip(true);	
	}else{
		$(element).flip(false);
	}
}

/**
 * Timer Start
 * @method timeStart
 * @return timer start
 */
function timeStart(){
	timer.start();
	timer.addEventListener('secondsUpdated', function (e) {
	  $('.timer_values').html(timer.getTimeValues().toString());

	});
}

/**
 * Timer Stop
 * @method timeStop
 * @return stop the timer
 */
function timeStop(){
	timer.stop();
}

/**
 * Timer Reset
 * @method timeReset
 * @return resets timer
 */
function timeReset(){
	timer.reset();
	timer.addEventListener('reset', function (e) {
	    $('.timer_values').html(timer.getTimeValues().toString());
	});
}
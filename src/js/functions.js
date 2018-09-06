/**
 * Function to start game
 * @method startGame
 * @return loadtable on card number 
 */
function startGame(){
	var card_number = $('#card_number').val();
	if(card_number>=10){
		$('#timer').show();
		loadTable(card_number);
		timeStart();
		startMatrix();
		$('input[name=difficulty]').attr('disabled',true)
		$('#card_number').attr('readonly',true)
	}
}

/**
 * Function to restart game
 * @method restartGame
 * @return restart game values 
 */
function restartGame(){
	MaterialDialog.dialog(
		"You wanna restart the game?",
		{
			title:"Restart",
			buttons:{
				confirm:{
					className:"blue darken-3",
					text:"confirm",
					callback:function(){
						$('input[name=difficulty]').removeAttr('disabled');
						$('#card_number').removeAttr('readonly');
						$('#content .row').html('');
						timeStop();
						$('.timer_values').html('00:00:00');
						$('#timer').hide();
						flibBoard = [];
					}
				}
			}
		}
	);
}

/**
 * Function to start matrix for game
 * @method startMatrix
 * @return loadtable on card number 
 */
function startMatrix(){
	var card_number = $('#card_number').val();
	while (flibBoard.length<card_number) {
		var random_number = Math.floor((Math.random() * parseInt(card_number/2)) + 1);
		times = countItem(flibBoard,random_number);
		if(times<2){
			flibBoard.push(random_number);
		}
	}
}

/**
 * Function to count item in array
 * @method countItem
 * @param {obj} element
 * @param {int} item
 * @return times item appear
 */
function countItem(element,item){
	var times = 0;
	$.each(element,function(key,value){
			if(value==item){
				times += 1;
			}
	});
	return times;
}

/**
 * Function to load table on central screen
 * @method loadTable
 * @param {int} items
 * @return cards on central table 
 */
function loadTable(items){
	var html = '';
	for (var i = parseInt(items)-1; i >= 0; i--) {
		html += '<div class="col s2 m2">';
		html += '<div class="card card-grid" onclick=flipCard(this) flip-index='+i+'>';
		html += '<div class="front">';
		html += '</div>';
		html += '<div class="back center-align">';
		html += '<span class="number"></span>';
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
		var index = parseInt($(element).attr('flip-index'));
		$(element).find('.number').html(flibBoard[index])
		$(element).flip(true);	
	}else{
		//$(element).flip(false);
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
		var time_dif = getTimeByDifficult();
		var timer_value = timer.getTimeValues();
		$('.timer_values').html(timer.getTimeValues().toString());
		if(timer_value.minutes==time_dif){
			timeStop();
			$('.card').removeAttr('onclick');
			$('input[name=difficulty]').removeAttr('disabled');
			$('#card_number').removeAttr('readonly');
			MaterialDialog.alert('You lose the game =( , start again');
		}
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

/**
 * Get time by difficult
 * @method getTimeByDifficult
 * @return time return the time
 */
function getTimeByDifficult(){
	var card_number = $('#card_number').val();
	var difficulty = $('input[name=difficulty]:checked').val();
	var time = 0;
	if(difficulty=='easy'){
		time = (card_number * 18) / 60;
	}
	else if(difficulty=='medi'){
		time = (card_number * 12) / 60;
	}
	else if(difficulty=='hard'){
		time = (card_number * 6) / 60;
	}
	return time;
}
/*
* jQuery dropper plug-in
*
* Copyright 2009 Scott Trudeau
* 
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*/
(function($) {
	$.fn.quizzy = function(settings) {
    var config = {
			questions: [],
			results: []
		};
		if (settings) $.extend(config, settings);
		var resultLookup = [];
		for(var i in config.results) {
			var result = config.results[i];
			for(var j = result.min; j <= result.max; j++) {
				resultLookup[j] = i;
			}
		}
		
		this.each(function(i) {

			// template
			$(this).append('<ul>');
			var ul = $(this).find('ul');
			for(i in config.questions) {
				var question = config.questions[i];
				ul.append("<li>"+ question.q +"<input type='checkbox' /></li>");
			}			
			$(this).append("<p class='quizzy-result' style='display: none;'>");
			$(this).append("<a href='#' class='quizzy-show-result'>Show Result</a>");

			// Calculate result on each checkbox click; will show if "show results" has been flipped
			$(this).find("input[type='checkbox']").click(function(){
				setResult($(this).parent().parent());
			});

			// Show results
			$(this).find('.quizzy-show-result').click(function(){
				setResult($(this).parent().find('ul'));
				$('.quizzy-result').show();
				$(this).hide();
				return false;
			});

			return this;
		});
		
		var setResult = function(el) { 
			// Calculate results from given checkbox list
			var total = 0;
			$(el).find("input[type='checkbox']").each(function(){
				if($(this).attr('checked')) total = total + 1;
			});
			var result = config.results[ resultLookup[total] ];
			$('.quizzy-result').html("Result is "+ result.r);
		};

	};
})(jQuery);
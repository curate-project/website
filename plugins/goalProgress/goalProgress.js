/*
 *  Tinacious Design goalProgress jQuery plugin
 *  Plugin URL: https://github.com/tinacious/goalProgress
 *
 *  Christina Holly (Tinacious Design)
 *  http://tinaciousdesign.com
 *
 */
!function ($) {
	$.fn.extend({
		goalProgress: function (options) {
			var defaults = {
				goalAmount: 100,
				currentAmount: 50,
				speed: 1000,
				textBefore: '',
				textAfter: '',
				milestoneNumber: 70,
				milestoneClass: 'almost-full',
				callback: function () { }
			}

			var options = $.extend(defaults, options);
			return this.each(function () {
				var obj = $(this);

				// Collect and sanitize user input
				var goalAmountParsed = parseFloat(defaults.goalAmount);
				var currentAmountParsed = parseFloat(defaults.currentAmount);

				// Calculate size of the progress bar
				var percentage = (currentAmountParsed / goalAmountParsed) * 100.0;

				var milestoneNumberClass = (percentage > defaults.milestoneNumber) ? ' ' + defaults.milestoneClass : ''

				// Generate the HTML
				var goalElement = `<span class="funds-goal">of ${defaults.textBefore}${goalAmountParsed.toLocaleString()}</span>`;
				var progressUnmet = `<div class="progressBarUnmet"></div>`;
				var progressBar = '<div class="progressBar">' + defaults.textBefore + currentAmountParsed.toLocaleString() + defaults.textAfter + '</div>';

				var progressBarWrapped = `<div class="goalProgress${milestoneNumberClass}">${progressBar}${goalElement}${progressUnmet}</div>`;

				// Append to the target
				obj.append(progressBarWrapped);

				// Ready
				var rendered = obj.find('div.progressBar');

				// Remove Spaces
				rendered.each(function () {
					$(this).html($(this).text().replace(/\s/g, '&nbsp;'));
				});

				// Animate!
				rendered.animate({ width: percentage + '%' }, defaults.speed, defaults.callback);

				if (percentage === 0) {
					rendered.css({
						'padding-left' : '0px',
						'padding-right' : '0px',
						'margin-left' : '15px',
					});
				}

				if (typeof callback == 'function') {
					callback.call(this)
				}
			});
		}
	});
}(window.jQuery);
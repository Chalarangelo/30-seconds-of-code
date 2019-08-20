var util = require('util');

module.exports = Eta;

function Eta (count, options) {
	this.count = count;

	var optionsNumberFormatter = options && options.numberFormatter;
	this.numberFormatter = typeof optionsNumberFormatter == 'function' ? optionsNumberFormatter : formatNumber;
	
	if (options && options.autoStart || options === true) {
		this.start();
	}
}

Eta.prototype.start = function () {
	this.done = 0;
	this.startedAt = new Date();
};

Eta.prototype.iterate = function (anything) {
	this.done++;
	if (anything) {
		this.last = util.format.apply(this, arguments);
	}
};

Eta.prototype.format = function () {
	var layout = util.format.apply(this, arguments);
	
	var elapsed = (new Date() - this.startedAt)/1000;
	var rate = this.done/elapsed;
	var estimated = this.count/rate;
	var progress = this.done/this.count;
	var eta = estimated - elapsed;
	var etah = secondsToStr(eta);

	var fields = {
		elapsed: elapsed,
		rate: rate,
		estimated: estimated,
		progress: progress,
		eta: eta,
		etah: etah,
		last: this.last
	};

	return layout.replace(/{{\S+?}}/g, function (match) {
		var key = match.slice(2, match.length - 2);
		var value = fields[key] || '';
		return typeof value == 'number' ? value.toPrecision(4) : value;
	});
};

function secondsToStr (seconds) {
	return millisecondsToStr(seconds*1000);
}

// http://stackoverflow.com/a/8212878
function millisecondsToStr (milliseconds) {
	// TIP: to find current time in milliseconds, use:
	// var  current_time_milliseconds = new Date().getTime();

	function numberEnding (number) {
		return (number > 1) ? 's' : '';
	}

	var temp = Math.floor(milliseconds / 1000);
	var years = Math.floor(temp / 31536000);
	if (years) {
		return years + ' year' + numberEnding(years);
	}
	//TODO: Months! Maybe weeks? 
	var days = Math.floor((temp %= 31536000) / 86400);
	if (days) {
		return days + ' day' + numberEnding(days);
	}
	var hours = Math.floor((temp %= 86400) / 3600);
	if (hours) {
		return hours + ' hour' + numberEnding(hours);
	}
	var minutes = Math.floor((temp %= 3600) / 60);
	if (minutes) {
		return minutes + ' minute' + numberEnding(minutes);
	}
	var seconds = temp % 60;
	if (seconds) {
		return seconds + ' second' + numberEnding(seconds);
	}
	return 'less than a second'; //'just now' //or other string you like;
}

function formatNumber (it) {
	return it.toPrecision(4);
}

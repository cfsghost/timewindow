var TimeWindow = require('./lib/timewindow');

module.exports = {
	createTimeWindow: function(timespan, opts) {
		return new TimeWindow(timespan, opts);
	}
};

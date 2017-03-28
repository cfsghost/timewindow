var util = require('util');
var Transform = require('stream').Transform;

var TimeWindow = module.exports = function(timeSpan, options) {

	if (!(this instanceof TimeWindow))
		return new TimeWindow(options);

	this.buffer = [];
	this.timeSpan = timeSpan || 10;
	this.options = Object.assign({
		highWaterMark: 16
	}, options || {});

	Transform.call(this, {
		highWaterMark: this.options.highWaterMark,
		objectMode: true
	});
};

util.inherits(TimeWindow, Transform);

TimeWindow.prototype._transform = function(data, encoding, callback) {

	var state = this.buffer.reduce(function(obj, old) {

		// check whether expires or not
		if (data.ts - old.ts > this.timeSpan) {
			obj.removed.push(old);
		} else {
			obj.alive.push(old);
		}

		return obj;
	}.bind(this), {
		removed: [],
		alive: []
	});

	// Add new data to buffer
	this.buffer = state.alive;
	this.buffer.push(data);

	// Something should be removed
	if (state.removed.length > 0) {

		state.removed.shift();
		while(state.removed.length > 0) {
			this.push(state.removed);

			state.removed.shift();
		}
	}

	this.push(this.buffer);

	callback();
};

TimeWindow.prototype._flush = function(callback) {

	if (this.buffer.length > 0) {

		this.buffer.shift();
		while(this.buffer.length > 0) {
			this.push(this.buffer);

			this.buffer.shift();
		}
	}

	callback();
};

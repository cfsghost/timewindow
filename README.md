# timewindow
collect all records that fill within the time window

# Installation

Install module via NPM:
```shell
npm install timewindow
```

# Usage

You can just push data with specific format into it then waiting for events for output.

```javascript
var tw = require('timewindow');

// create time window with time span which is 3 seconds
var timeWindow = tw.createTimeWindow(3);

timeWindow.on('data', function(buffer) {
	console.log(buffer);
});

timeWindow.on('end', function() {
	console.log('Completed');
});

// push 10 records into stream
timeWindow.write({ ts: 0, v: 0 });
timeWindow.write({ ts: 1, v: 1 });
timeWindow.write({ ts: 2, v: 2 });
timeWindow.write({ ts: 3, v: 3 });
timeWindow.write({ ts: 4, v: 4 });
timeWindow.write({ ts: 5, v: 5 });
timeWindow.write({ ts: 6, v: 6 });
timeWindow.write({ ts: 7, v: 7 });
timeWindow.write({ ts: 8, v: 8 });
timeWindow.write({ ts: 9, v: 9 });
thmeWindow.end();
```

### results:

```
[ { ts: 0, v: 1 } ]
[ { ts: 0, v: 1 }, { ts: 1, v: 2 } ]
[ { ts: 0, v: 1 }, { ts: 1, v: 2 }, { ts: 2, v: 3 } ]
[ { ts: 1, v: 2 }, { ts: 2, v: 3 }, { ts: 3, v: 4 } ]
[ { ts: 2, v: 3 }, { ts: 3, v: 4 }, { ts: 4, v: 5 } ]
[ { ts: 3, v: 4 }, { ts: 4, v: 5 }, { ts: 5, v: 6 } ]
[ { ts: 4, v: 5 }, { ts: 5, v: 6 }, { ts: 6, v: 7 } ]
[ { ts: 5, v: 6 }, { ts: 6, v: 7 }, { ts: 7, v: 8 } ]
[ { ts: 6, v: 7 }, { ts: 7, v: 8 }, { ts: 8, v: 9 } ]
[ { ts: 7, v: 8 }, { ts: 8, v: 9 }, { ts: 9, v: 10 } ]
[ { ts: 8, v: 9 }, { ts: 9, v: 10 } ]
[ { ts: 9, v: 10 } ]
Completed
```

# Stream Support

TimeWindow is designed to be a object-mode transform stream.

```javascript
var tw = require('timewindow');

// create time window with time span which is 3 seconds
var timeWindow = tw.createTimeWindow(3);

inputStream.pipe(timeWindow).pipe(outputStream);
```

License
---
Licensed under the MIT License

Authors
---
Copyright(c) 2017 Fred Chien <<cfsghost@gmail.com>>

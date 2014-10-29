//Gets current date and sets the 'Gregorian' field of index.html, then $e.update()
//available in console as $e.load()
$ns.load = function () {
	var curDate = new Date ();
	var dateArea = document.getElementById ('$const.date');
	dateArea.value = curDate.getDate() + '.' + (curDate.getMonth() + 1) + '.' + curDate.getFullYear() + ' ' +
	curDate.getHours() + ':' + curDate.getMinutes() + ':' + curDate.getSeconds();

	$e.update ();
};

$ns.update = function () {
	//Grabs array of all textareas on index.html
	var textAreas = document.body.getElementsByTagName('textarea');
	//Grabs array of all drop downs on index.html
	var selects = document.body.getElementsByTagName ('select');
	var classes, ids, value;
	var i, j, key;

	//$processor.test ();

	// INITIALIZE CONSTANTS
	if (textAreas) {
		for (i = 0; i < textAreas.length; i ++) {
			ids = textAreas[i].getAttribute('id');
			try {
				//Weird pattern to evaluate the id attribute of the text areas with their values
				//Used to set constants from the form fields
				eval('' + ids + ' = "' + textAreas[i].value + '"');
			} catch (exception) {
			}
		}
	}
	//Parses 'Gregorian' date field and splits into date components, sets date object & properties
	if ($const.date) {
		var tokens = $const.date.split (' ');

		tokens [0] = tokens [0].split ('.');
		tokens [1] = tokens [1].split (':');

		date = {
			day: parseFloat (tokens [0][0]),
			month: parseFloat (tokens [0][1]),
			year: parseFloat (tokens [0][2]),
			hours: parseFloat (tokens [1][0]),
			minutes: parseFloat (tokens [1][1]),
			seconds: parseFloat (tokens [1][2])
		};
		$const.date = date;
	}


	//Initializes constants in body and kepler
	$processor.init ();

	// fill input bodies
	if (selects) {
		for (i = 0; i < selects.length; i++) {
			classes = selects[i].getAttribute ('class');
			ids = selects[i].getAttribute('id');
			if (classes) {
				try {
					var selector = eval('(' + classes + ')');
					if (!selects[i].innerHTML) {
						var selections = [];
						for (key in selector) {
							if (selector.hasOwnProperty(key) && selector[key].key == key && key != 'earth') {
								selections.push('<option label=' + key + '>' + key + '</option>');
							}
						}
						selects[i].innerHTML = selections;
					}
					eval(ids + ' = ' + classes + '.' + selects[i].value);
				} catch (exception) {
				}
			}
		}
	}
	// debugger;
	$processor.calc(date, $const.body);


	//COMMENTED REGIONS DON'T APPEAR TO DO ANYTHING

	// var info = document.getElementById('info');

	// if (info) {
	// 	info.innerHTML =
	// 		'julian = ' + date.julian + ', ' +
	// 		'delta = ' + date.delta + '<br/>' +
	// 		'terrstrial = ' + date.terrestrial + '<br/>' +
	// 		'universal = ' + date.universal + ' - ' + (
	// 			date.universalDate.day + '.' +
	// 			date.universalDate.month + '.' +
	// 			date.universalDate.year + ' ' +
	// 			date.universalDate.hours + ':' +
	// 			date.universalDate.minutes + ':' +
	// 			date.universalDate.seconds + '.' +
	// 			date.universalDate.milliseconds
	// 		) + '' +
	// 		''
	// 	;
	// }

	// var ephemeris = document.getElementById('ephemeris');

	// if (ephemeris) {
	// 	ephemeris.innerHTML =
	// 		'<td>earth</td>' +
	// 		''
	// 	;
	// }

	// MAKE CALCULATIONS AND FILL TEXTAREAS WITH OUTPUT
	if (textAreas) {
		for (i = 0; i < textAreas.length; i ++) {
			classes = (textAreas[i].getAttribute ('class') || '').split(' ');
			for (j = 0; j < classes.length; j ++) {
				try {
					value = eval('(' + classes [j] + ')');
					if (value || value === 0) {
						textAreas[i].value = value.join ? value.join ('\n') : value;
						break;
					}
				} catch (exception) {
				}
			}
		}
	}
};

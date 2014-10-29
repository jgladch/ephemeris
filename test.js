$ns.test = function(){
  //WHAT ABOUT LATLONG?

  //Initialize Date
  $const.date = '14.11.1987 01:50:26';

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

  $processor.init();

  var result = {};

  var bodies = ['sun', 'mercury', 'venus', 'moon', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'chiron', 'sirius'];

  for (var i = 0; i < bodies.length; i++) {
    $const.body = $moshier.body[bodies[i]];
    $processor.calc(date, $const.body);
    result[bodies[i]] = $const.body.position.apparentLongitudeString;
  }

  console.log(result);

};
$(document).ready( function() {

  var forecastHidden = true;
  var $forecastCity = $('.forecast__city');
  var $forecastTemp = $('.forecast__current');

  $('#form__submit').on('click', function(event) {
    event.preventDefault();
    var submitted = $('#form__input').val();

    // AJAX Call
    $.ajax(query(submitted))
    .done(function(weather) {
        var weatherObject = weather.query.results.channel;
        var city = weatherObject.title.substring(17); // Substring to take out 'Yahoo'
        var temp = weatherObject.item.condition.temp;

      if (forecastHidden === true) {
        $forecastCity.text(city);
        $forecastTemp.text(temp + " F");
        $('.forecast').children().removeClass('hidden');
        forecastHidden = false;
      } else {
        $forecastCity.fadeOut(function() {
          $forecastCity.text(city);
          $forecastCity.fadeIn();
        });
        $forecastTemp.fadeOut(function() {
          $forecastTemp.text(temp + " F");
          $forecastTemp.fadeIn();
        });
      }
    });

  });
});

function query(location) {
  // When user inputs using "City, State" - replaces comma with HTML character code

  if (location.indexOf(',') !== -1) {
    location = location.replace(',', '%2C');
  }

  return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + location + "%22)&format=json";
}

'use strict';

/**
 * @ngdoc function
 * @name futudashApp.controller:WeatherCtrl
 * @description
 * # WeatherCtrl
 * Let the rain wash away your dashboard
 */
angular.module('futudashApp')
  .controller('WeatherCtrl', function ($scope,$interval,Weather) {
    

/*
    //resize canvas
    var con = document.getElementById("temperature-wrap"),
        canvas = document.getElementById("temperature"),
        aspect = canvas.height/canvas.width,    
        width = con.offsetWidth,
        height = con.offsetHeight;

    if(aspect < 1){
      canvas.width = width;
      canvas.height = Math.round(width * aspect);
    }
    else{
      canvas.height = height;
      canvas.width = Math.round(height * aspect);
    }
*/
	// Custom icons
	$scope.icons = {
		'01d': 'ion-ios7-sunny-outline',
		'02d': 'ion-ios7-partlysunny-outline',
		'03d': 'ion-ios7-cloudy-outline',
		'04d': 'ion-ios7-cloud-outline',
		'09d': 'ion-ios7-rainy-outline',
		'10d': 'ion-ios7-rainy-outline',
		'11d': 'ion-ios7-thunderstorm-outline',
		'13d': 'ion-ios7-snowy',
		'50d': 'ion-ios7-cloudy-outline',
		'01n': 'ion-ios7-moon-outline',
		'02n': 'ion-ios7-cloudy-night-outline',
		'03n': 'ion-ios7-cloudy-outline',
		'04n': 'ion-ios7-cloudy-outline',
		'09n': 'ion-ios7-rainy-outline',
		'10n': 'ion-ios7-rainy-outline',
		'13n': 'ion-ios7-thunderstorm-outline',
		'11n': 'ion-ios7-snowy',
		'50n': 'ion-ios7-cloudy-outline',
	}



	$scope.weather = {};


	var getWeather = function(animate){
	    // WEATHER
	    Weather.get().then(function(data){
	        $scope.weather = data;
	        $scope.weather.main.temp = Math.round( $scope.weather.main.temp * 10) / 10
	        startWeatherViz(animate);
	    },function(data){
	        console.log('No weather info for you')
	    })
	};

	var startWeatherViz = function(animate){
	    var weather_options = {
	        segmentShowStroke : true,
	        segmentStrokeColor : "#fff",
	        segmentStrokeWidth : 1,
	        percentageInnerCutout : 90, // This is 0 for Pie charts
	        animationSteps : 100,
	        animationEasing : "easeOutBounce",
	        animateRotate : animate,
	        animateScale : false,
	        responsive:true,
	        maintainAspectRatio:false
	    }


	    var temp = $scope.weather.main.temp;
	    var weather_data = temp>0 ? [
	    {
	        value: temp,
	        color:"rgba(255,255,255,1)",
	    },
	    {
	        value: 30-parseFloat(temp),
	        color: "transparent",
	    }
	    ] : [
	    {
	        value: 30+parseFloat(temp),
	        color: "#77D4CB",
	        highlight: "transparent"
	    },
	    {
	        value: -temp,
	        color:"rgba(255,255,255,1)"
	    }

	    ];

	    if(document.getElementById("temperature")){
	    	var temperature = document.getElementById("temperature").getContext("2d"),
	    	myDoughnutChart = new Chart(temperature).Doughnut(weather_data,weather_options);
		}	
	}


	// init weather and animate
	getWeather(true);

	// get weather in 10min interval, no more animation
	$interval(function() {
	    getWeather(false)
	}, 1000*60*10);



  });

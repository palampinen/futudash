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



	$scope.weather = {};


	var getWeather = function(animate){
	    // WEATHER
	    Weather.get().then(function(data){
	        $scope.weather = data;
	        $scope.weather.main.temp -= 273.15
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

	    var temperature = document.getElementById("temperature").getContext("2d"),
	    myDoughnutChart = new Chart(temperature).Doughnut(weather_data,weather_options);
	}


	// init weather and animate
	getWeather(true);

	// get weather in 10min interval, no more animation
	$interval(function() {
	    getWeather(false)
	}, 1000*60*10);



  });

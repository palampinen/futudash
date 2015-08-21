'use strict';

/**
 * @ngdoc function
 * @name futudashApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Know where you're at
 */
angular.module('futudashApp')
  .controller('TrendCtrl', function ($scope,$interval,CustomJSON,Settings) {

  	$scope.settings = Settings.get();

  	//google.load("visualization", "1", {packages:["corechart"]});
   // google.setOnLoadCallback(drawChart);

   /*
	var url = 'https://www.google.com/trends/fetchComponent?q=angularjs,backbone&cid=TIMESERIES_GRAPH_0&export=3';
  	CustomJSON.get(url,{})
	.then(function(data){
		var newData = data.split("\n").slice(1).join("\n");
		console.log(newData);
		var	json = angular.fromJson(newData);
		
	});   
	*/
/*
	function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales', 'Expenses'],
          ['2004',  1000,      400],
          ['2005',  1170,      460],
          ['2006',  660,       1120],
          ['2007',  1030,      540]
        ]);

        var options = {
          title: 'Company Performance',
          curveType: 'function',
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

        chart.draw(data, options);
      }
*/


//



  });

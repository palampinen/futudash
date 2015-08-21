'use strict';

/*
 * futudashApp settings
 * Settings could be saved in some DB and/or configured via some UI
 */
 angular.module('futudashApp')

 .factory('Settings', function() {

 	return {
 		get: function(){
 			return JSON.parse( localStorage.getItem('futudash')) || {
	 		name:'Tampere',
			logourl: 'http://static.flockler.com/assets/futurice/images/futurice-logo--white.svg',
	 		coords:{
	 			lat:61.49861660000001,
	 			lng:23.757011899999952
	 		},
	 		address: 'kuninkaankatu-21-tampere',
	 		finnkinoArea:1035,
	 		finnkinoName: 'Plevna',
	 		rss: 'http://futurice.com/blog/rss',
	 		color:{
	 			main:'#77D4CB',
	 			dark:'#6BBEB6',
	 			light:'#BBEAE5'
	 		},
	 		flows: [
			    {
			        name:  'tampere',				// flow url key
			        label: 'Tampere',				// not used atm
			        fill:  'rgba(255,255,255,0.3)'	// Bg Color of graph
			    },
			    {
			        name:  'tampere-offtopic-friday',	
			        label: 'Tampere Offtopic',
			        fill:  'rgba(0,0,0,0.15)'
			    }
			]
			}
 		},
 		set: function(data){
 				//save settings
 				localStorage.setItem('futudash',JSON.stringify(data))
 		}
 }

 });
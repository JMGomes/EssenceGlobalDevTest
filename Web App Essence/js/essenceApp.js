'use strict'

var app = angular.module('EssenceWebApp', ['ui.router']);


//routing information (not working in localhost for google chrome)
app.config(function($stateProvider, $urlRouterProvider)
{
	$stateProvider
		.state('solution', {
			name: 'solution',
			url: '/solution',
			templateUrl: 'html/solution.html'
		})
		.state('aboutme', {
			name: 'aboutme',
			url: '/aboutme',
			templateUrl: 'html/aboutme.html'
		})
		$urlRouterProvider.otherwise('solution');
});
'use strict';

var issueTrackerApp = angular.module('issueTrackerApp',
		[
			'ngRoute'
		])
		.config([
			'$routeProvider',
			function ($routeProvider) {
				$routeProvider
						.when('/login', {
							templateUrl: 'templates/login.html',
							controller: 'HomeCtrl'
						})
						.when('/register', {
							templateUrl: 'templates/register.html',
							controller: 'HomeCtrl'
						})
						.when('/logout', {
							templateUrl: 'templates/logout.html'
						})
						.when('/dashboard', {
							templateUrl: 'templates/dashboard.html',
							controller: 'HomeCtrl'
						})
						.when('/', {
							controller: 'CommonCtrl',
							templateUrl: 'templates/dashboard.html'
						})
						.when('/projects', {
							templateUrl: 'templates/projects.html',
							controller: 'ProjectsCtrl'
						})
						.when('/projects/:id', {
							templateUrl: 'templates/project-details.html',
							controller: 'ProjectDetailCtrl'
						})
						.when('/add', {
							templateUrl: 'templates/add-project.html',
							controller: 'ProjectsCtrl'
						})
						.otherwise({redirectTo: '/'});
			}])
		.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');

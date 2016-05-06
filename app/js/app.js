'use strict';

var issueTrackerApp = angular.module('issueTrackerApp',
		[
			'ngRoute',
			'ui.bootstrap.pagination'
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
							templateUrl: 'templates/logout.html',
                            data: {
                                requireLogin: true
                            }
						})
						.when('/home', {
							templateUrl: 'templates/home.html',
							controller: 'HomeCtrl',
                            data: {
                                requireLogin: true
                            }
						})
						.when('/', {
							controller: 'CommonCtrl',
							templateUrl: '/'
						})
						.when('/projects', {
							templateUrl: 'templates/projects.html',
							controller: 'ProjectsCtrl',
                            data: {
                                requireLogin: true
                            }
						})
						.when('/projects/:id', {
							templateUrl: 'templates/project-view.html',
							controller: 'ProjectViewCtrl',
                            data: {
                                requireLogin: true
                            }
						})
						.when('/add', {
							templateUrl: 'templates/add-project.html',
							controller: 'ProjectsCtrl',
                            data: {
                                requireLogin: true
                            }
						})
						.when('/projects/:id/edit',{
							templateUrl: 'templates/project-edit.html',
							controller: 'ProjectsCtrl',
							data: {
								requireLogin: true
							}
						})
						.when('/projects/:id/add-issue', {
							templateUrl: 'templates/add-issue.html',
							controller: 'IssuesCtrl',
							data: {
								requireLogin: true
							}
						})
						.when('/profile', {
							templateUrl: 'templates/profile-details.html',
							controller: 'UserCtrl',
							data: {
								requireLogin: true
							}
						})
						.otherwise({redirectTo: '/'});
			}])
		.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
		.constant('pageSize', 10)
        .run(function($location, $rootScope, authorization) {
            $rootScope.$on('$routeChangeStart', function(event, next) {
                if (next.data) {
                    if (!authorization.isLoggedUser() && next.data.requireLogin) {
                        $location.path('/');
                    }
                }
            });
        });
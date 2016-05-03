'use strict';

issueTrackerApp.controller('ProjectViewCtrl',
    [
        '$scope',
        '$location',
        'projectsService',
        'notify',
        'authorization',
        '$routeParams',
        function($scope,$location,projectsService,notify,authorization,$routeParams){

            var getProjectById = function getProjectById(id) {
                projectsService.getProjectById(id)
                    .then(function (response) {
                        $scope.project = response.data;
                        console.log(response.data);
                        $scope.priorities = response.data.priorities;
                        if(sessionStorage.userName === response.data.Lead.Username) {
                            $scope.isLeader = sessionStorage.userName;
                        }
                        }, function (err) {
                            notify.showError("Request " + "'Get project by ID'" + " failed", err.statusText);
                        }
                    );
            };

            $scope.userAuth = authorization;

            if (isNaN($routeParams.id)) {
                $location.path('/projects');
            } else {
                getProjectById($routeParams.id)
            }
        }
    ]);
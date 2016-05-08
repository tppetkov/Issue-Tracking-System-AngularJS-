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
                        //console.log(response.data);
                        $scope.priorities = response.data.priorities;
                        }, function (err) {
                            notify.showError("Request failed", err.statusText);
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
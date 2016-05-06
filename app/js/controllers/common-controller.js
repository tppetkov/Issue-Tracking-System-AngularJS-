'use strict';

issueTrackerApp.controller('CommonCtrl', [
        '$scope',
        '$location',
        'projectsService',
        'notify',
        'authorization',
        function ($scope, $location, projectsService, notify, authorization) {

            $scope.userAuth=authorization;

            $scope.showContainer = function(tab){
                if(tab == 'projects'){
                    $scope.myProjects = true;
                    $scope.myIssues = false
                } else {
                    $scope.myProjects = false;
                    $scope.myIssues = true
                }
            };
        }
    ]);
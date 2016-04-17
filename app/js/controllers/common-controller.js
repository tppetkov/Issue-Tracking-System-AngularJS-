'use strict';

issueTrackerApp.controller('CommonCtrl', [
        '$scope',
        '$location',
        'projectsService',
        'notify',
        'authorization',
        function ($scope, $location, projectsService, notify, authorization) {

            $scope.currentUser = {
                Username: sessionStorage.userName,
                Id :  sessionStorage.userId,
                isAdmin :  sessionStorage.isAdmin
            };
        }
    ]);
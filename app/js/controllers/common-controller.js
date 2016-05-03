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

            $scope.showContainer = function(tab){
                if(tab == 'projects'){
                    $scope.myProjects = true;
                    $scope.myIssues = false
                } else {
                    $scope.myProjects = false;
                    $scope.myIssues = true
                }
            };
            var filter = function filter(users, val) {
                var filtered = [];
                angular.forEach(users, function (item) {
                    if (item.Username.toLowerCase().indexOf(val) == 0) filtered.push(item);
                });
                return filtered;
            };

            $scope.getAllUsers = function(val){
                authorization.getAllUsers()
                    .then(function (allUsers) {
                            $scope.allUsers = filter(allUsers, val);
                            console.log($scope.allUsers)
                        }, function (err) {
                            notify.showError("Request failed", err.statusText);
                        }
                    );
            };
        }
    ]);
'use strict';

issueTrackerApp.controller('UserCtrl',
    [
        '$scope',
        'projectsService',
        'notify',
        'authentication',
        'authorization',
        function ($scope, projectsService, notify, authentication, authorization) {

            $scope.getAllUsers = function getAllUsers(){
                authorization.getAllUsers()
                    .then(function (allUsers) {
                            $scope.allUsers = allUsers;
                        }, function (err) {
                            var serverError = err.data.error_description;
                            notify.showError("Request failed", serverError);
                        }
                    );
            };

            $scope.makeAdmin = function makeAdmin(id) {
                authorization.makeAdmin(id)
                    .then(function (data) {
                            notify.showInfo("User was made as admin!", data);
                        }, function (err) {
                            notify.showError("Request failed", err);
                        }
                    );
            };

            $scope.changePassword = function changePassword(user){
                authorization.changePassword(user)
                    .then(function (data) {
                            notify.showInfo("Password changed!", data);
                        }, function (err) {
                            notify.showError("Request failed", err);
                        }
                    );
            }
        }
    ]);
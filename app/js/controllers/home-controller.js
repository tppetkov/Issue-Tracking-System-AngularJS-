'use strict';

issueTrackerApp.controller('HomeCtrl', [
    '$scope',
    '$location',
    'authentication',
    'authorization',
    'notify',
    function ($scope, $location, authentication,authorization, notify) {
        var getCurrentUserInfo = function () {
            authorization.getCurrentUser()
                .then(function (currentUser) {
                        sessionStorage['userName'] = currentUser.Username;
                        sessionStorage['userId'] = currentUser.Id;
                        sessionStorage['isAdmin'] = currentUser.isAdmin;
                        $scope.currentUser = currentUser;
                        $scope.username = currentUser.username;
                        $scope.isSomeoneLoggedIn = true;
                    },
                    function (err) {
                        notify.showError("Request failed!", err.statusText);
                    }
                );
        };

        $scope.login = function (user) {
            authentication.loginUser(user)
                .then(function (loggedInUser) {
                    notify.showInfo("Login successful");
                    sessionStorage['token'] = loggedInUser.access_token;
                    getCurrentUserInfo();
                    $location.path('/dashboard');
                }, function (err) {
                    notify.showError("Login failed!", err.statusText);
                });
        };

        $scope.register = function (user) {
            authentication.registerUser(user)
                .then(function (loggedInUser) {
                    notify.showInfo("Login successful!");
                    sessionStorage['token'] = loggedInUser.access_token;
                    getCurrentUserInfo();
                    $location.path('/dashboard');
                }, function (err) {
                    notify.showError("Login failed!", err.statusText);
                });
        };

        $scope.logout = function () {
            authentication.logout()
                .then(function() {
                    notify.showInfo("Logout successful!");
                    sessionStorage.clear();
                    $location.path('#/');
            }, function(err) {
                notify.showError("You have to login first!");
            });
        }
    }
]);
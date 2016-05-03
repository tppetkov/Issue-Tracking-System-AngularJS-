'use strict';

issueTrackerApp.controller('IssuesCtrl',
    [
        '$scope',
        '$location',
        'issuesService',
        'notify',
        'authorization',
        '$routeParams',
        function($scope,$location,issuesService,notify,authorization,$routeParams){

            $scope.userAuth = authorization;
            $scope.currentPage = 1;
            $scope.issueId=$routeParams.id;
            $scope.projectsRequestParams = {
                startPage: 1,
                pageSize: 1
            };
            console.log($scope.userAuth.getAllUsers().data);
            issuesService.getMyIssues($scope.currentPage)
                .then(function (issues) {
                        $scope.myIssues = issues.data.Issues;
                    }, function (err) {
                        var serverError = err.statusText;
                        notify.showError("Request failed", serverError);
                    }
                );

            issuesService.getIssuesByProjectId($scope.issueId)
                .then(function (issues){
                    $scope.issuesById=issues.data;
                        console.log(issues);
                    }, function (err) {
                        var serverError = err.statusText;
                        notify.showError("Request failed", serverError);
                    }
                );

            $scope.addIssue = function(issue){
                issuesService.addIssue(issue)
                    .then(function () {
                        notify.showInfo("Issue added successful!");
                        $location.path('/projects/$scope.issueId');
                    }, function (err) {
                        notify.showError("Add issue failed", err.statusText);
                    });
            };

            $scope.show = function () {
                $scope.showIssues = !$scope.showIssues;
            };
        }
    ]);
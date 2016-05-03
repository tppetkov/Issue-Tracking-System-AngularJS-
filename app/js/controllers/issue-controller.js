'use strict';

issueTrackerApp.controller('IssuesCtrl',
    [
        '$scope',
        '$location',
        'issuesService',
        'notify',
        'authorization',
        '$routeParams',
        'projectsService',
        function($scope,$location,issuesService,notify,authorization,$routeParams,projectsService){

            $scope.userAuth = authorization;
            $scope.currentPage = 1;
            $scope.issueId=$routeParams.id;
            $scope.projectsRequestParams = {
                startPage: 1,
                pageSize: 1
            };

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
                    }, function (err) {
                        var serverError = err.statusText;
                        notify.showError("Request failed", serverError);
                    }
                );

            $scope.addIssue = function(issue){
                issuesService.addIssue(issue)
                    .then(function () {
                        notify.showInfo("Issue added successful!");
                    }, function (err) {
                        notify.showError("Add issue failed", err.statusText);
                    });
            };

            projectsService.getProjectById($scope.issueId)
                .then(function success(data) {
                    console.log(data.data.Priorities);
                    $scope.projectPriorities = data.data.Priorities;
                });

            $scope.show = function () {
                $scope.showIssues = !$scope.showIssues;
            };
        }
    ]);
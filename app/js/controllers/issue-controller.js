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
                    $scope.issuesByProjectId=issues.data;
                    }, function (err) {
                        var serverError = err.statusText;
                       // notify.showError("Request failed", serverError);
                    }
                );

            issuesService.getIssueById($scope.issueId)
                .then(function (issue){
                    $scope.issueById=issue.data;
                    console.log($scope.issueById.Author.Id);
                    console.log($scope.userAuth.getUserId())
                    }, function (err) {
                    var serverError = err.statusText;
                    notify.showError("Request failed", serverError);
                    }
                );

            $scope.addIssue = function addIssue(issueToAdd) {
                var issueToSend = {
                    Title: issueToAdd.Title,
                    Description: issueToAdd.Description,
                    DueDate: issueToAdd.DueDate,
                    ProjectId: $routeParams.id,
                    AssigneeId: issueToAdd.AssigneeId,
                    PriorityId: issueToAdd.PriorityId
                };
                issuesService.addIssue(issueToSend)
                    .then(function success() {
                        notify.showInfo("Issue successful added!");
                    }, function error(err) {
                        notify.showError("Add failed!", err.statusText);
                    })
            };

            projectsService.getProjectById($scope.issueId)
                .then(function success(data) {
                    $scope.projectPriorities = data.data.Priorities;
                });
        }
    ]);
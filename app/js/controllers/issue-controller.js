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
        'commentsService',
        function($scope,$location,issuesService,notify,authorization,$routeParams,projectsService,commentsService){

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
                       notify.showError("Request failed", err.statusText);
                    }
                );

            issuesService.getIssuesByProjectId($scope.issueId)
                .then(function (issues){
                    $scope.issuesByProjectId=issues.data;
                    }, function (err) {
                        var serverError = err.statusText;
                       // notify.showError("Request failed", err.statusText);
                    }
                );

            issuesService.getIssueById($scope.issueId)
                .then(function (issue){
                    $scope.issueById=issue.data;
                    }, function (err) {
                    var serverError = err.statusText;
                    //notify.showError("Request failed", err.statusText);
                    }
                );

            $scope.addIssue = function addIssue(issue) {
                var issueToAdd= {
                    Title: issue.Title,
                    Description: issue.Description,
                    DueDate: issue.DueDate,
                    ProjectId: $routeParams.id,
                    AssigneeId: issue.AssigneeId,
                    PriorityId: issue.PriorityId
                };
                issuesService.addIssue(issueToAdd)
                    .then(function success() {
                        notify.showInfo("Issue successful added!");
                    }, function error(err) {
                        notify.showError("Add failed!", err.statusText);
                    })
            };
            //TODO:Refactor edit Issue to catch project id
            $scope.editIssue = function editIssue(issue,issueID) {
                var issueToEdit = {
                    Title: issue.Title,
                    Description: issue.Description,
                    DueDate: issue.DueDate,
                    ProjectId: $routeParams.id,
                    AssigneeId: issue.AssigneeId,
                    PriorityId: issue.PriorityId
                };
                issuesService.editIssue(issueToEdit,$scope.issueId)
                    .then(function success() {
                        notify.showInfo("Issue successful edited!");
                    }, function error(err) {
                        notify.showError("Edit failed!", err.statusText);
                    })
            };

            commentsService.getIssueComments($routeParams.id)
                .then(function success(data) {
                    $scope.Comments = data;
                    console.log(data);
                }, function error(err) {
                    notify.showError('Request failed', err.statusText);
                });


            projectsService.getProjectById($scope.issueId)
                .then(function success(data) {
                    $scope.projectPriorities = data.data.Priorities;
                });

            var getAllUsers = authorization.getAllUsers()
                .then(function (allUsers) {
                        $scope.allUsers = allUsers;
                    }, function (err) {
                        var serverError = err.data.error_description;
                        notify.showError("Request failed", err.statusText);
                    }
                );
        }
    ]);
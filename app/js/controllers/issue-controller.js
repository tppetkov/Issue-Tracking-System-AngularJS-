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

            $scope.currentPage = 1;
            $scope.projectsRequestParams = {
                startPage: 1,
                pageSize: 1
            };

            issuesService.getMyIssues($scope.currentPage)
                .then(function (issues) {
                        $scope.myIssues = issues.data.Issues;
                    console.log($scope.myIssues);
                    }, function (err) {
                        var serverError = err.statusText;
                        notify.showError("Request failed", serverError);
                    }
                );

            issuesService.getIssueById(id)
        }
    ]);
'use strict';

issueTrackerApp.controller('ProjectsCtrl',
    [
        '$scope',
        '$location',
        'projectsService',
        'notify',
        '$routeParams',
        'authorization',
        function($scope,$location,projectsService,notify,$routeParams,authorization){

            $scope.currentPage = 1;
            $scope.projectsRequestParams = {
                startPage: 1,
                pageSize: 1
            };

            var convertData = function (project){
                project.labels = toObject(project.labels);
                project.priorities = toObject(project.priorities);

                function toObject(inputArray) {
                    var outputArrayAsJson = [];
                   // console.log(inputArray);
                    for (var i = 0; i < inputArray.length; ++i)
                        outputArrayAsJson.push({'Name': inputArray[i]});
                    return outputArrayAsJson;
                }
                return project;
            };

            $scope.addProject = function (project) {
                project = convertData(project);
                projectsService.addProject(project)
                    .then(function () {
                        notify.showInfo("Project added successful!");
                        $location.path('/projects');
                    }, function (err) {
                        notify.showError("Add project failed", err.statusText);
                    });
            };

            $scope.editProject = function (project) {
                project = convertData(project);
                projectsService.editProject(project,$routeParams.id)
                    .then(function () {
                        notify.showInfo("Project edited successful!");
                        $location.path('/projects');
                    }, function (err) {
                        notify.showError("Edit project failed", err.statusText);
                    });
            };

            projectsService.getAllProjects($scope.currentPage)
                .then(function (allProjects) {
                        $scope.allProjects = allProjects.data.Projects;
                        $scope.allPages  = allProjects.data.TotalPages;
                    },
                    function (err) {
                        var serverError = err.data.error_description;
                        notify.showError("Request failed", err.statusText);
                    }
                );

            projectsService.getMyProjects(sessionStorage['userId'],$scope.currentPage)
                .then(function (myProjects) {
                    $scope.myProjects = myProjects.data.Projects;
                    $scope.allPages  = myProjects.data.TotalPages;
                },
                function (err) {
                    notify.showError("Request failed", err.statusText);
                }
            );

            var getAllUsers = authorization.getAllUsers()
                .then(function (allUsers) {
                        $scope.allUsers = allUsers;
                    }, function (err) {
                        notify.showError("Request failed", err.statusText);
                    }
                );

            $scope.userAuth = authorization;
        }
    ]);



'use strict';

issueTrackerApp.factory('projectsService',
    [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL){
            function getAllProjects(){
                var deferred = $q.defer();
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'projects',
                    headers: {
                        Authorization: "Bearer "+sessionStorage["token"]
                    }
                };

                $http(request)
                    .then(function(response){
                        deferred.resolve(response);
                    },function(err){
                        deferred.reject(err);
                    });
                return deferred.promise;
            }

            //TODO getMyProject()

            function getProjectById(id){
                var deferred = $q.defer();
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'Projects/'+ id,
                    headers: {
                        Authorization: "Bearer "+sessionStorage["token"]
                    }
                };

                $http(request)
                    .then(function(response){
                        deferred.resolve(response);
                    },function(err){
                        deferred.reject(err);
                    });
                return deferred.promise;
            }

            function addProject(project){
                var deferred = $q.defer();

                var request = {
                    method: 'POST',
                    url: BASE_URL + 'projects',
                    data : {
                        'Name' : project.Name,
                        'Description' : project.Description,
                        'ProjectKey' : project.ProjectKey,
                        'labels' : project.labels,
                        'priorities' : project.priorities,
                        'LeadId' : project.LeadId
                    },
                    headers: {
                        Authorization: "Bearer "+sessionStorage["token"]
                    }
                };

                $http(request)
                    .then(function(response){
                        deferred.resolve(response);
                    },function(err){
                        deferred.reject(err);
                    });
                return deferred.promise;
            }

            function editProject(project){
                var deferred = $q.defer();
                var request = {
                    method: 'PUT',
                    url: BASE_URL + 'projects/'+ project.Id,
                    data : {
                        'Name' : project.Name,
                        'Description' : project.Description,
                        'labels' : project.labels,
                        'priorities' : project.priorities,
                        'LeadId' : project.LeadId
                    },
                    headers: {
                        Authorization: "Bearer "+sessionStorage["token"]
                    }
                };

                $http(request)
                    .then(function(response){
                        deferred.resolve(response);
                    },function(err){
                        deferred.reject(err);
                    });
                return deferred.promise;
            }

            return {
                getAllProjects : getAllProjects,
                getProjectById : getProjectById,
                addProject : addProject,
                editProject: editProject
            }
        }
    ]);
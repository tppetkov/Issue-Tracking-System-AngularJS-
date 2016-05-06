'use strict';

issueTrackerApp.factory('projectsService',
    [
        '$http',
        '$q',
        'BASE_URL',
        'pageSize',
        function($http, $q, BASE_URL,pageSize){
            var currentUrl = BASE_URL + 'projects';
            function getAllProjects(currentPage,filter){
                var url = currentUrl + '?pageSize=' + pageSize + "&pageNumber=" + currentPage + "&filter=";
                if(filter){
                    url = url + filter;
                }
                var deferred = $q.defer();
                var request = {
                    method: 'GET',
                    url: url,
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

            function getMyProjects(lead,currentPage){
                var url = currentUrl + '?filter=Lead.Id="'+ lead+'"'+
                    '&pageSize=' + pageSize +
                    "&pageNumber=" + currentPage;
                var deferred = $q.defer();
                var request = {
                    method: 'GET',
                    url: url,
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

            function editProject(project,id){
                var deferred = $q.defer();
                var request = {
                    method: 'PUT',
                    url: BASE_URL + 'projects/'+ id,
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
                getMyProjects: getMyProjects,
                getProjectById : getProjectById,
                addProject : addProject,
                editProject: editProject
            }
        }
    ]);
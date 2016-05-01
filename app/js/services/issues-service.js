'use strict';

issueTrackerApp.factory('issuesService',
    [
        '$http',
        '$q',
        'BASE_URL',
        'pageSize',
        function ($http, $q, BASE_URL, pageSize) {
            var currentUrl=BASE_URL + 'Issues';

            function getIssuesByProjectId(id) {
                var deferred = $q.defer();
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'Projects/' + id + '/Issues',
                    headers: {
                        Authorization: "Bearer " + sessionStorage["token"]
                    }
                };
                $http(request)
                    .then(function (response) {
                        deferred.resolve(response);
                    }, function (err) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            }

            function addIssue(issue) {
                var deferred = $q.defer();
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'issues/',
                    headers: {
                        Authorization: "Bearer " + sessionStorage["token"]
                    },
                    data: issue
                };
                $http(request)
                    .then(function (response) {
                        deferred.resolve(response);
                    }, function (err) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            }

            function editIssue(issue, id) {
                var deferred = $q.defer();
                var request = {
                    method: 'PUT',
                    url: BASE_URL + 'issues/' + id,
                    headers: {
                        Authorization: "Bearer " + sessionStorage["token"]
                    },
                    data: issue
                };

                $http(request)
                    .then(function (response) {
                        deferred.resolve(response);
                    }, function (err) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            }


            function getIssueById(id) {
                var deferred = $q.defer();
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'issues/' + id,
                    headers: {
                        Authorization: "Bearer " + sessionStorage["token"]
                    }
                };
                $http(request)
                    .then(function (response) {
                        deferred.resolve(response);
                    }, function (err) {
                        deferred.reject(err);
                    });
                return deferred.promise;
            }

            function getMyIssues(currentPage){
                var url = currentUrl + '/me?orderBy=Project.Name desc, IssueKey&pageSize=' +
                    pageSize + '&pageNumber=' + currentPage;
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

            return {
                getIssuesByProjectId: getIssuesByProjectId,
                addIssue: addIssue,
                editIssue:editIssue,
                getIssueById: getIssueById,
                getMyIssues: getMyIssues
            }
        }
    ]);
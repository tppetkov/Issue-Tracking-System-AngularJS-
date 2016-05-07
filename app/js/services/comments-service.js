'use strict';

issueTrackerApp.factory('commentsService',
    [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function getIssueComments(id) {
                var deferred = $q.defer();
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'issues/' + id + '/comments',
                    headers: {
                        Authorization: "Bearer " + sessionStorage["token"]
                    }
                };
                $http(request)
                    .then(function success(response) {
                        deferred.resolve(response.data);
                    }, function error(err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            }

            function addCommentToIssue(issueId, comment) {
                var deferred = $q.defer();
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'issues/' + issueId + '/comments',
                    headers: {
                        Authorization: "Bearer " + sessionStorage["token"]
                    },
                    data: {text: comment}
                };
                $http(request)
                    .then(function success(response) {
                        deferred.resolve(response.data);
                    }, function error(err) {
                        deferred.reject(err);
                    });

                return deferred.promise;
            }

            return {
                getIssueComments: getIssueComments,
                addCommentToIssue: addCommentToIssue
            }
        }
    ]);

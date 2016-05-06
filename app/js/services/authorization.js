issueTrackerApp.factory('authorization', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function getCurrentUser() {
                var deferred = $q.defer();
                var request = {
                    method: 'GET',
                    url: BASE_URL + 'Users/me',
                    headers: {
                        Authorization: "Bearer "+sessionStorage["token"]
                    }
                };
                $http(request)
                    .then(function (response) {
                        deferred.resolve(response.data);
                        var isAuthenticated=true;
                    }, function (err) {
                        deferred.reject(err);
                        var isAuthenticated=false;
                    });
                return deferred.promise;
            }

            function getAllUsers() {
                {
                    var deferred = $q.defer();
                    var request = {
                        method: 'GET',
                        url: BASE_URL + 'Users/',
                        headers: {
                            Authorization: "Bearer "+sessionStorage["token"]
                        }
                    };
                    $http(request)
                        .then(function (response) {
                            deferred.resolve(response.data);
                            var users = response.data;
                        }, function (err) {
                            deferred.reject(err)
                        });
                    return deferred.promise;
                }
            }

            function makeAdmin(id) {

                var deferred = $q.defer();
                var request = {
                    method: 'PUT',
                    url: BASE_URL + 'Users/makeadmin',
                    data : {
                        'UserId' : id
                    },
                    headers: {
                        Authorization: "Bearer "+sessionStorage["token"]
                    }
                };
                $http(request)
                    .then(function (response) {
                        console.log(response.data);
                        deferred.resolve(response.data)
                    }, function (err) {
                        deferred.reject(err)
                    });
                return deferred.promise;
            }

            function changePassword(user) {

                var deferred = $q.defer();
                var request = {
                    method: 'POST',
                    url: BASE_URL + 'api/Account/ChangePassword',
                    data : user,
                    headers: {
                        Authorization: "Bearer "+sessionStorage["token"]
                    }
                };
                $http(request)
                    .then(function (response) {
                        deferred.resolve(response.data)
                    }, function (err) {
                        deferred.reject(err)
                    });
                return deferred.promise;
            }

            function isLoggedUser() {
                var sessionUser = sessionStorage['userName'];
                return !!sessionUser;
            }

            function userName() {
                var curentUserName = sessionStorage['userName'];
                return curentUserName;
            }

            function isUserAdmin() {
                var isUserAdmin=sessionStorage['isAdmin'];
                return isUserAdmin;
            }

            function getUserId() {
                var getUserId=sessionStorage['userId'];
                return getUserId;
            }

            return {
                getCurrentUser: getCurrentUser,
                getAllUsers: getAllUsers,
                makeAdmin: makeAdmin,
                changePassword: changePassword,
                isLoggedUser: isLoggedUser,
                userName: userName,
                isUserAdmin: isUserAdmin,
                getUserId: getUserId
            }
        }
    ]);
'use strict';

issueTrackerApp.factory('notify',
        function () {
            return {
                showInfo: function(msg) {
                    noty({
                        text: msg,
                        type: 'success',
                        layout: 'topCenter',
                        timeout: 1500}
                    );
                },
                showError: function(msg) {
                    noty({
                        text: msg + "</br>",
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 1500}
                    );
                }
            }
        }
    );
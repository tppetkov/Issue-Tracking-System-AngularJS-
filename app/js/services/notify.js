'use strict';

issueTrackerApp.factory('notify',
        function () {
            return {
                showInfo: function(msg) {
                    noty({
                        text: msg,
                        type: 'info',
                        layout: 'topCenter',
                        timeout: 500}
                    );
                },
                showError: function(msg) {
                    noty({
                        text: msg + "</br>",
                        type: 'error',
                        layout: 'topCenter',
                        timeout: 1000}
                    );
                }
            }
        }
    );
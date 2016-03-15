(function (angular, undefined) {

    angular.module('app', [
        'ngMessages'
    ]);

    angular.module('app').provider('ApiService', [
        function () {
            this.$get = [
                '$http',
                '$log',
                function ($http, $log) {
                    var request = function (httpPromise) {
                        return httpPromise.catch(function (error) {
                            $log.error(error);
                        });
                    };

                    return {
                        get : function (path, config) {
                            return request($http.get(path, config));
                        },

                        post : function (path, data, config) {
                            return request($http.post(path, data, config));
                        }
                    };
                }
            ]
        }
    ]);

    angular.module('app').controller('MainController', [
        'ApiService',
        function (ApiService) {
            this.complete = false;

            this.loadCountries = function () {
                ApiService
                    .get('/api/countries', null, { cache : true })
                    .then(function (response) {
                        if (response.data && angular.isArray(response.data)) {
                            this.countryList = response.data;
                        }
                    }.bind(this));
            };

            this.submit = function (form) {
                this.apiError = false;

                if (form.$valid === true) {
                    ApiService
                        .post('/api/users', this.data)
                        .then(function (response) {
                            this.complete = true;
                        }.bind(this))
                        .catch(function () {
                            this.apiError = true;
                        }.bind(this));
                }
            };

            this.loadCountries();
        }
    ]);

})(angular);

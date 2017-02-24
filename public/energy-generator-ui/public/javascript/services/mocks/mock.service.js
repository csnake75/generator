angular.module('EnergyGenerator.services')
    .service('MockService', function ($http, $location) {
        this.findAll = function (callback, errorCallback) {
            $http.get("http://" + $location.$$host + ":3000/mockdatas/")
                .then(function (response) {
                    callback(response.data)
                }, function (error) {
                    errorCallback(error)
                });
        };

        this.find = function (id, callback, errorCallback) {
            $http.get("http://" + $location.$$host + ":3000/mockdatas/" + id)
                .then(function (response) {
                    callback(response.data)
                }, function (error) {
                    errorCallback(error)
                });
        };

        this.delete = function (id, callback, errorCallback) {
            $http.delete("http://" + $location.$$host + ":3000/mockdatas/" + id)
                .then(function (response) {
                    callback(response.data)
                }, function (error) {
                    errorCallback(error)
                });
        };

        this.save = function (obj, callback, errorCallback) {
            $http.post("http://" + $location.$$host + ":3000/mockdatas/", obj)
                .then(function (response) {
                    callback(response.data)
                }, function (error) {
                    errorCallback(error)
                });
        };

        this.generate = function (url, callback, errorCallback) {
            $http.get(url)
                .then(function (response) {
                    callback(response.data)
                }, function (error) {
                    errorCallback(error)
                });
        };


        return this;
    })
;
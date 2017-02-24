'use strict';

angular.module('EnergyGenerator.controllers')
    .controller('MockItemCtrl', function ($scope, $routeParams, $location, MockService) {
        $scope.generatedData = [];
        $scope.gridOptions = {};
        $scope.error = {};

        if ($routeParams.id != "-1") {
            MockService.find($routeParams.id, function (res) {
                $scope.mock = res;
                $scope.mock.template = JSON.stringify($scope.mock.template, null, '\t');
                if ($scope.mock && $scope.mock._id != "-1") {
                    $scope.mock.url = "http://" + $location.$$host + ":" + $location.$$port + "/mockdatas/" + $scope.mock._id + "/generate";
                }
            })
        } else {
            $scope.mock = {};
        }

        $scope.save = function () {
            try {
                $scope.mock.template = JSON.parse($scope.mock.template);
                MockService.save($scope.mock, function (res) {
                    $scope.gridOptions.data = [];
                    $scope.resData = "";
                    $scope.mock._id = res._id;
                    if ($scope.mock && $scope.mock._id != "-1") {
                        $scope.mock.url = "http://" + $location.$$host + ":" + $location.$$port + "/mockdatas/" + $scope.mock._id + "/generate";
                    }
                })
            } catch (ex) {
                $scope.error = {};
                $scope.error.header = "JSON-PARSE-ERROR";
                $scope.error.data = "Das JSON ist nicht valide!";
                $scope.error.statusText = ex;
            }
        };

        $scope.generate = function () {

            $scope.gridOptions.data = [];
            $scope.resData = "";
            $scope.error = {};

            MockService.generate($scope.mock.url, function (res) {
                $scope.gridOptions.data = res;
                $scope.resData = JSON.stringify($scope.gridOptions.data, null, '\t');
            }, function (error) {
                $scope.error = error;
                $scope.error.header = "RANDOM ERROR";
            })
        };

        $scope.cancel = function () {
            $location.path('/mock/');
        }
    });
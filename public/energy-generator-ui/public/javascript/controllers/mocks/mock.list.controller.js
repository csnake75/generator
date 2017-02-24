'use strict';

angular.module('EnergyGenerator.controllers')
    .controller('MockListCtrl', function ($scope, $location, uiGridGroupingConstants, MockService) {
        $scope.mocks = [];
        $scope.gridOptions = {
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            }
        };

        $scope.gridOptions.columnDefs = [
            {
                name: 'project',
                displayName: 'Projekt',
                headerCellFilter: 'translate',
                enableHiding: false,
                grouping: { groupPriority: 1 }
            },
            {
                name: 'name',
                displayName: 'Name',
                headerCellFilter: 'translate',
                enableHiding: false
            },
            {
                name: 'user',
                displayName: 'User',
                headerCellFilter: 'translate',
                enableHiding: false,
                grouping: { groupPriority: 2 }
            },
            {
                name: 'application',
                displayName: 'Anwendung',
                headerCellFilter: 'translate',
                enableHiding: true
            },
            {
                name: 'quantity',
                displayName: 'Anzahl der Datensätz',
                headerCellFilter: 'translate',
                enableHiding: true
            },
            {
                name: 'successProcentage',
                displayName: 'Errorwahrscheinlichkeit',
                headerCellFilter: 'translate',
                enableHiding: true
            },
            {
                name: 'successProcentage',
                displayName: 'Timeoutwahrscheinlichkeit',
                headerCellFilter: 'translate',
                enableHiding: true
            },
            {
                name: 'action', displayName: 'Aktion', headerCellFilter: 'translate',
                cellTemplate: 'views/mocks/mock.list.buttons.html',
                enableHiding: false,
                width: 75,
                enableCellEdit: false,
                enableColumnResizing: false,
                enableSorting: false,
                enableColumnMenu: false,
                enableColumnReordering: false
            }
        ];

        MockService.findAll(function (res) {
            $scope.mocks = res;
            $scope.gridOptions.data = $scope.mocks;
        });

        $scope.delete = function (id) {
            MockService.delete(id, function (res) {
                $scope.mocks = res;
                $scope.gridOptions.data = $scope.mocks;
            });
        };

        $scope.open = function (id) {
            $location.path('/mock/' + id);
        };

        $scope.new = function () {
            $location.path('/mock/-1');
        };
    });
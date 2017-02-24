angular.module('EnergyGenerator')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider
            .when('/mock', {
                templateUrl: 'views/mocks/mock.list.html',
                controller: 'MockListCtrl'
            })

            .when('/mock/:id', {
                templateUrl: 'views/mocks/mock.item.html',
                controller: 'MockItemCtrl'
            })

            .when('/code', {
                templateUrl: 'views/code.list.html',
                controller: 'CodeListCtrl'
            })

            .when('/code/:id', {
                templateUrl: 'views/code.item.html',
                controller: 'CodeItemCtrl'
            })

            .otherwise({redirectTo: '/'})
    }]);
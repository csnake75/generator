'use strict';

// Declare app level module which depends on ui, and components
angular.module('EnergyGenerator', ['frame-module', 'frame-directives', 'ui-directives', 'ki-directives',
    'ngRoute', 'EnergyGenerator.controllers', 'EnergyGenerator.filters', 'EnergyGenerator.directives',
    'EnergyGenerator.services', 'angularFileUpload', 'ui.bootstrap', 'ngDraggable', 'ngSocket', 'ui.ace',
    'pascalprecht.translate', 'ui.grid', 'ui.grid.moveColumns', 'ui.grid.saveState', 'ui.grid.resizeColumns', 'ui.grid.grouping',
    'ui.grid.expandable', 'ui.grid.selection', 'ui.grid.pinning', 'ui.grid.autoResize', 'ui.grid.edit', 'angularSpinner',
    'ngMaterial','kiLocale'
])
    .config(function($translateProvider, $translatePartialLoaderProvider, $httpProvider) {
        /** Initialize translation */
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.determinePreferredLanguage();
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'i18n/{lang}/{part}.json'
        });

        $translatePartialLoaderProvider.addPart('sandbox');

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

    })

    .run(['$rootScope', '$route', 'authUserService', 'languageService',
        function ($rootScope, $route, authUserService, languageService) {
            function handleLanguageChanged() {
                var supportedLangs = ['en_GB', 'de_DE'];
                languageService.setAppLanguage(supportedLangs);
            }

            $rootScope.$on("event:lang-changed", handleLanguageChanged);
        }]);
;

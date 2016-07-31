(function () {


    var app = angular.module("myapp", ["ui.router", "dw.components", "dw.dataservice"]);


    app.config(function ($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/home");


        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/home",
                template: "<home></home>"
            })
            .state("details", {
                url: "/details/{id:[0-9]{1,9}}",
                template: "<detail-view id='{{ id }}'></details-view>",
                controller: function ($stateParams, $scope) {
                    $scope.id = $stateParams.id;
                }
            });

    });


    angular.bootstrap(document, ["myapp"]);



})();
(function () {

    var app = angular.module("dw.components", ["ui.router", "angular-growl"]);

    app.component("header", {
        templateUrl: "templates/header.html"

    });


    app.component("myFooter", {
        templateUrl: "templates/footer.html"
    });


    app.component("home", {

        templateUrl: "templates/home.html",

        controller: [function () {


        }]

    });

    app.component("navbar", {

        templateUrl: "templates/navbar.html",

        controller: [function () {


        }]

    });

    app.component("detailView", {

        templateUrl: "templates/details.html",

        controller: ["data.service.get", "$state", "growl", function (data, $state, growl) {

            var that = this;

            this.review = {};
            this.wheel = {};

            this.review.title = "";
            this.review.description = "";
            this.review.rating = 0;

            this.review.reviews = [];

            // event handlers
            this.saveReview = function () {

                var args = { title: that.review.title, description: that.review.description, rating: that.review.rating };

                data.saveReview(args).then(function () {

                    return data.getServiceCenterDetailsByID(parseInt(that.id));

                }, function (errors) {

                    for (var i = 0; i < errors.length; i++) {
                        growl.error(errors[i]);
                    }

                    return null;

                })
                .then(function (response) {

                    if (response) {
                        response.reviews.push({ title: "Test", description: "", rating: 2, username: "Test", date: "12/21/2015" });
                        that.review = response;
                    }
                });
            }

            this.goBackToList = function () {

                $state.go("home");

            };

            this.$onInit = function () {

                data.getServiceCenterDetailsByID(parseInt(this.id)).then(function (response) {

                    that.wheel = response;

                });

            };

        }],

        bindings: {
            id: "@"
        }

    });


    app.component("homeCommunicator", {

        transclude: true,

        template: "<div ng-transclude></div>",

        controller: function () {

            var handlers = {

                searchHandler: []

            };

            this.search = function (value) {

                console.log("searching");

                handlers.searchHandler.forEach(function (handler) {
                    handler(value);
                });

            };

            this.onSearch = function (handler) {

                handlers.searchHandler.push(handler);

            };

        }

    });



    app.component("searchBar", {

        templateUrl: "templates/search-bar.html",

        require: {

            homeCtrl: "^homeCommunicator"

        },
        controller: ["appstate", "$scope", function (appstate, $scope) {

            var that = null;

            this.app = {};


            this.$onInit = function () {
                that = this;
                if (appstate.app && appstate.app.place) {
                    that.app = appstate.app;
                    that.homeCtrl.search(that.app);
                }
            };



            $scope.$watch(function () { return appstate.app; }, function (newValue) {


                that.homeCtrl.search(newValue);


            });

            this.search = function () {

                var args = { place: this.app.place, city: this.app.city, type: this.app.type };

                appstate.app = args;

            }



            this.app.place = "";
            this.app.city = "Hyderabad";
            this.app.type = "bike";




        }],
        bindings: {


        }

    });

    app.component("list", {

        templateUrl: "templates/list.html",

        require: {

            homeCtrl: "^homeCommunicator"

        },

        controller: ["data.service.get", "$state", function (data, $state) {

            var that = this;

            this.wheelsList = [];

            // Life Cycle

            this.$onInit = function () {

                this.homeCtrl.onSearch(function (value) {

                    data.getServiceCenterDetails(value).then(function (data) {

                        that.wheelsList = data;

                    });

                });
            }

            // Events
            this.goToDetailsPage = function (id) {

                $state.go("details", { id: id });

            }



        }],

        bindings: {

        }

    });

})();
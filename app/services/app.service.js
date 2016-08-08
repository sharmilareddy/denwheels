(function () {

    var app = angular.module("dw.dataservice", []);


    app.service("data.service.get", ["$http", "$q", ServiceCenterDetails]);

    function ServiceCenterDetails($http, $q) {

        return {

            getServiceCenterDetails: function (args) {

                return $q(function (resolve, reject) {

                    setTimeout(function () {

                        resolve([{
                            id: 1,
                            title: "Hello",
                            description: "Hello World",
                            imageUrl: "user_uploaded_images/1.jpg",
                            rating: 4.5,
                            offers: [{ description: "Washing 200 rupees" }]
                        }, {
                            id: 2,
                            title: "World",
                            description: "Hello World",
                            imageUrl: "user_uploaded_images/2.jpg",
                            rating: 4.5,
                            offers: []
                        }]);

                    });

                });

            },

            saveReview: function (args) {

                var error = [];

                if (!args.title) {
                    error.push("Review title must not be empty")
                }

                if (!args.description) {
                    error.push("Review description must not be empty");
                }

                if (!args.rating) {
                    error.push("Rating must not be empty");
                }

                return $q(function (resolve, reject) {

                    setTimeout(function () {

                        if (error.length === 0)
                            resolve("done");
                        else
                            reject(error);


                    }, 100);

                });

            },

            getServiceCenterDetailsByID: function (id) {

                return $q(function (resolve, reject) {


                    setTimeout(function () {

                        resolve({
                            title: "Green House",
                            description: "A sample description",
                            reviews: [{
                                title: "not bad",
                                description: "sample description",
                                rating: 4.5,
                                username: "Rajan",
                                date: "10/23/2016"
                            }, {
                                title: "very good services",
                                description: "sample description",
                                rating: 4.5,
                                username: "Ganesh",
                                date: "10/23/2016"
                            }]
                        });

                    }, 1000);

                });

            }

        };


    }


    // to manage the state of the application
    app.service("appstate", [function () {

        this.app = {};

        this.app.city = "";
        this.app.type = "";
        this.app.place = "";


    }]);


    return app;

})();
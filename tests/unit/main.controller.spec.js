describe('MainController unit tests', function () {
    var scope,
        httpBackend,
        controller;

    var countryList = ['United Kingdom', 'Italy', 'Portugal'];

    beforeEach(module('app'));
    beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
        httpBackend = $httpBackend;
        scope = $rootScope.$new();

        controller = $controller('MainController', { '$scope' : scope });

        httpBackend.when('GET', '/api/countries').respond(200, countryList);
    }));

    describe('when controller loads', function () {
        it('should load the country list', function () {
            scope.$digest();
            httpBackend.flush();

            expect(controller.countryList).toEqual(countryList);
        });
    });

    describe('when submitting the form', function () {
        beforeEach(function () {
            httpBackend.when('POST', '/api/users').respond(201);
        })

        it('should display a message after API call', function () {
            controller.submit({ '$valid' : true });

            scope.$digest();
            httpBackend.flush();

            expect(controller.complete).toBe(true);
        });

        it('should not submit the form if it is invalid', function () {
            controller.submit({ '$valid' : false });

            scope.$digest();
            httpBackend.flush();

            expect(controller.complete).toBe(false);
        });
    });
});

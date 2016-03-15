describe('App E2E tests', function () {
    beforeEach(function () {
        browser.get('/');
    });

    describe('When visiting the page', function () {
        it('page should have a title', function () {
            expect(browser.getTitle()).toEqual('Government Service');
        });
    });

    describe('When submitting an invalid form', function () {
        it('should validate required fields', function () {
            element(by.css('button[type=submit]')).click();

            expect(element(by.css('[ng-messages="vm.mainForm.name.$error"] [ng-message="required"]')).isDisplayed()).toBe(true);
            expect(element(by.css('[ng-messages="vm.mainForm.sex.$error"] [ng-message="required"]')).isDisplayed()).toBe(true);
            expect(element(by.css('[ng-messages="vm.mainForm.age.$error"] [ng-message="required"]')).isDisplayed()).toBe(true);
            expect(element(by.css('[ng-messages="vm.mainForm.country.$error"] [ng-message="required"]')).isDisplayed()).toBe(true);
        });
    });

    describe('When submitting a valid form', function () {
        var fakeUser = 'Test user name';
        beforeEach(function () {
            element(by.model('vm.data.name')).sendKeys(fakeUser);
            element.all(by.model('vm.data.sex')).get(0).click();
            element(by.model('vm.data.age')).sendKeys('45');
            element(by.model('vm.data.country')).sendKeys('United Kingdom');
        });

        it('should display a message when form is submitted', function () {
            element(by.css('button[type=submit]')).click();
            expect(element(by.css('[ng-if="vm.complete"]')).isDisplayed()).toBe(true);
        });

        it('should display the user\'s name on the message', function () {
            element(by.css('button[type=submit]')).click();
            expect(element(by.cssContainingText('[ng-if="vm.complete"] p', fakeUser)).isDisplayed()).toBe(true);
        });
    });
});

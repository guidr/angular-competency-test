var router = require('express').Router();
var config = require('config');
var request = require('request');

router.get('/api/countries', function (req, res, next) {
    request(config.get('countriesAPI.endpoint'), function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var countries = JSON.parse(body);

            return res.json(countries.map(function (country) {
                return country.name;
            }));
        }

        return next(error || 'Invalid status code: ' + response.statusCode);
    });
});

module.exports = router;

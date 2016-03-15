var router = require('express').Router();
var UserData = require('./../models/userdata');

router.post('/api/users', function (req, res, next) {
    var user = new UserData(req.body);

    user.save(function (error, data) {
        if (error) {
            return next(error);
        }

        return res.status(201).json(data);
    });
});

module.exports = router;

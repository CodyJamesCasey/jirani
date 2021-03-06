var fs          = require('fs'),
    path        = require('path'),
    async       = require('async'),
    passport    = require('passport');

var log     = require('../log');

exports.route = function(app) {
    app.get('/api/me', function(req, res) {
        if (!req.user) {
            res.status(401).send();
        } else {
            res.status(200).json({
                id:         req.user.id,
                name:       req.user.name,
                email:      req.user.email,
                pictureUrl: req.user.pictureUrl
            });
        }
    });

    app.get('/api/auth/venmo',
            passport.authenticate('venmo', {
                scope: [
                    'make_payments',
                    'access_profile',
                    'access_email',
                    'access_balance'
                ]
            }));

    app.get('/api/venmo/callback',
            passport.authenticate('venmo', {
                failureRedirect: '/login',
                successRedirect: '/'
            }));
};

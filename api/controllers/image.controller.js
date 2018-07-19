var mongoose = require('mongoose');
multer = require('multer');
fs = require('fs-extra');
util = require('util')

module.exports.uploadpicture = function(req, res) {

    console.log('uploading picture');
    console.log(JSON.stringify(req.body));
   
    var username = req.body.username;
    var name = req.body.name || null;
    var password = req.body.password;

    User.create({
        username: username,
        name: name,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }, function(err, user) {
        if (err) {
            console.log(err);
            res.status(400).json(err);

        } else {
            console.log('user created', user);
            res.status(201).json(user);
        }
    });

};

module.exports.login = function(req, res) {

    console.log('Logging in User', req.body);

    var username = req.body.username;
    var password = req.body.password;


    User.findOne({
        username: username
    }).exec(function(err, user) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            if (bcrypt.compareSync(password, user.password)) {
                console.log('User found ', user);
                var token = jwt.sign({
                        username: user.username
                    },
                    's3cr3t', {
                        expiresIn: 3600
                    }
                );
                res.status(201).json({
                    success: true,
                    token: token
                });
            } else {
                console.log('Unauthorized');
                res.status(401).json('Unauthorized');
            }

        }
    });
};

module.exports.authenticate = function(req, res, next) {

    console.log('Authenticating');
    var headerExists = req.headers.authorization;
    if (headerExists) {
        var token = req.headers.authorization.split(' ')[1]; // authorization bearer xxx
        jwt.verify(token, 's3cr3t', function(error, decoded) {
            if (error) {
                console.log(error);
                res.status(401).json('Unauthorized');
            } else {
                req.user = decoded.username;
                next();
            }
        });
    } else {
        res.status(403).json('No token provider');
    }

};
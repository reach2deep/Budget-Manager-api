var mongoose = require('mongoose');
var moment = require('moment');
var Account = mongoose.model('Account');


// GET ALL ACCOUNT
module.exports.accountGetAll = function (req, res) {
    console.log('Requested By :', req.user);
    console.log('GET the Account');
    console.log(req.query);

    var offset = 0;
    var count = 5;
    var maxCount = 10;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        offset = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json({
                "message": "Invalid query parameters"
            });
        return;
    }

    if (count > maxCount) {
        res
            .status(400)
            .json({
                "message": "Invalid count parameter"
            });
        return;
    }
    Account
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, accounts) {
            if (err) {
                console.log("Error retreiving data");
                res
                    .status(500)
                    .json(err);
            }
            console.log('Found accounts', accounts.length);
            res
                .json(accounts);
        });
};


// GET Account BY ID
module.exports.accountGetOne = function (req, res) {
    var accountId = req.params.accountId;
    console.log('GET the Account ID ' +accountId);

    Account
        .findById(accountId)
        .exec(function (err, account) {
            var response = {
                status: 200,
                message: account
            };
            if (err) {
                console.log("Error retreiving data");
                response.status = 500;
                response.message = err;
            } else if (!account) {
                response.status = 400;
                response.message = {
                    "message": "Item not found"
                };
            }

            res.status(response.status)
                .json(response.message);

        });
};

// TO ADD NEW Account
module.exports.accountAddNew = function (req, res) {
    console.log('POST new Account');
    console.log(req.body);

    Account
        .create({
            name: req.body.name,
            description: req.body.description,
            amount: parseFloat(req.body.amount),
            notes: req.body.notes,                  
            createdAt : moment.moment(),
            createdBy : req.username                       
        }, function (err, account) {
            var response = {
                status: 200,
                message: account
            };
            if (err) {
                console.log('Error creating new account');
                response.status = 400;
                response.message = err;
            } else {
                console.log('Account Created');
                response.status = 201;
                response.message = account;
            }
            res.status(response.status)
                .json(response.message);
        });

};


// TO UPDATE ACCOUNT
module.exports.accountUpdate = function (req, res) {

    var accountId = req.params.accountId;
    console.log('GET the account ID ' +accountId);

    Account
        .findById(accountId)
        .exec(function (err, account) {
            var response = {
                status: 200,
                message: account
            };
            if (err) {
                console.log("Error retreiving data");
                response.status = 500;
                response.message = err;
            } else if (!account) {
                response.status = 404;
                response.message = {
                    "message": "Item not found"
                };
            }
            if (response.status !== 200) {
                res.status(response.status)
                    .json(response.message);
            } else {                

                account.name= req.body.name,
                account.description= req.body.description,
                account.notes= req.body.notes,
                account.amount= parseFloat(req.body.amount),              
                account.modifiedAt = moment.moment(),
                account.modifiedBy = req.username,

                account.save(function (err, updatedIncome) {

                        if (err) {

                            response.status = 500;
                            response.message = err;
                        } else {

                            response.status = 204;
                            response.message = '';

                            res.status(204)
                                .json();

                        }
                    });
            }
        });
};


// TO DELETE ACCOUNT
module.exports.accountDelete = function (req, res) {
    var accountId = req.params.accountId;
    console.log('DELETE the account ID ' + accountId);

    Account
        .findByIdAndRemove(accountId)
        .exec(function (err, account) {
            var response = {
                status: 204,
                message: ''
            };
            if (err) {
                console.log("Error deleting data");
                response.status = 404;
                response.message = err;
            } else {
                console.log("deleted data");
                response.status = 400;
                response.message = '';
            }


            res.status(response.status)
                .json(response.message);

        });
};

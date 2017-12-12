var mongoose = require('mongoose');
var moment = require('moment');
var Income = mongoose.model('Income');


// GET ALL INCOMES
module.exports.incomeGetAll = function (req, res) {
    console.log('Requested By :', req.user);
    console.log('GET the Income');
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
    Income
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, incomes) {
            if (err) {
                console.log("Error retreiving data");
                res
                    .status(500)
                    .json(err);
            }
            console.log('Found incomes', incomes.length);
            res
                .json(incomes);
        });
};


// GET Income BY ID
module.exports.incomeGetOne = function (req, res) {
    var incomeId = req.params.incomeId;
    console.log('GET the Income ID ' +incomeId);

    Income
        .findById(incomeId)
        .exec(function (err, income) {
            var response = {
                status: 200,
                message: income
            };
            if (err) {
                console.log("Error retreiving data");
                response.status = 500;
                response.message = err;
            } else if (!income) {
                response.status = 400;
                response.message = {
                    "message": "Item not found"
                };
            }

            res.status(response.status)
                .json(response.message);

        });
};

// TO ADD NEW Income
module.exports.incomeAddNew = function (req, res) {
    console.log('POST new Income');
    console.log(req.body);

    Income
        .create({
            incomeDate: req.body.incomeDate,
            description: req.body.description,
            category: req.body.category,
            amount: parseFloat(req.body.amount),
            payee: req.body.payee,
            account: req.body.account,
            notes: req.body.notes,
            createdAt : moment.moment(),
            createdBy : req.username                       
        }, function (err, income) {
            var response = {
                status: 200,
                message: income
            };
            if (err) {
                console.log('Error creating new income');
                response.status = 400;
                response.message = err;
            } else {
                console.log('Income Created');
                response.status = 201;
                response.message = income;
            }
            res.status(response.status)
                .json(response.message);
        });

};


// TO UPDATE INCOME
module.exports.incomeUpdate = function (req, res) {

    var incomeId = req.params.incomeId;
    console.log('GET the income ID ' +incomeId);

    Income
        .findById(incomeId)
        .exec(function (err, income) {
            var response = {
                status: 200,
                message: income
            };
            if (err) {
                console.log("Error retreiving data");
                response.status = 500;
                response.message = err;
            } else if (!income) {
                response.status = 404;
                response.message = {
                    "message": "Item not found"
                };
            }
            if (response.status !== 200) {
                res.status(response.status)
                    .json(response.message);
            } else {

                income.incomeDate= req.body.incomeDate,
                income.description= req.body.description,
                income.category= req.body.category,
                income.amount= parseFloat(req.body.amount),
                income.payee= req.body.payee,
                income.account= req.body.account,
                income.notes= req.body.notes,
                income.modifiedAt = moment.moment(),
                income.modifiedBy = req.username,

                income.save(function (err, updatedIncome) {

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


// TO DELETE INCOME
module.exports.incomeDelete = function (req, res) {
    var incomeId = req.params.incomeId;
    console.log('DELETE the income ID ' + incomeId);

    Income
        .findByIdAndRemove(incomeId)
        .exec(function (err, income) {
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

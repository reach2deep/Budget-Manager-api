var mongoose = require('mongoose');
var moment = require('moment');
var Payee = mongoose.model('Payee');


// GET ALL PAYEE
module.exports.payeeGetAll = function (req, res) {
    console.log('Requested By :', req.user);
    console.log('GET the Payee');
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
    Payee
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, payees) {
            if (err) {
                console.log("Error retreiving data");
                res
                    .status(500)
                    .json(err);
            }
            console.log('Found payees', payees.length);
            res
                .json(payees);
        });
};


// GET Payee BY ID
module.exports.payeeGetOne = function (req, res) {
    var payeeId = req.params.payeeId;
    console.log('GET the Payee ID ' +payeeId);

    Payee
        .findById(payeeId)
        .exec(function (err, payee) {
            var response = {
                status: 200,
                message: payee
            };
            if (err) {
                console.log("Error retreiving data");
                response.status = 500;
                response.message = err;
            } else if (!payee) {
                response.status = 400;
                response.message = {
                    "message": "Item not found"
                };
            }

            res.status(response.status)
                .json(response.message);

        });
};

// TO ADD NEW Payee
module.exports.payeeAddNew = function (req, res) {
    console.log('POST new Payee');
    console.log(req.body);

    Payee
        .create({
            name: req.body.name,
            address: req.body.address,
            mobile: req.body.mobile,
            notes: req.body.notes,           
            createdAt : moment.moment(),
            createdBy : req.username                       
        }, function (err, payee) {
            var response = {
                status: 200,
                message: payee
            };
            if (err) {
                console.log('Error creating new payee');
                response.status = 400;
                response.message = err;
            } else {
                console.log('Payee Created');
                response.status = 201;
                response.message = payee;
            }
            res.status(response.status)
                .json(response.message);
        });

};


// TO UPDATE PAYEE
module.exports.payeeUpdate = function (req, res) {

    var payeeId = req.params.payeeId;
    console.log('GET the payee ID ' +payeeId);

    Payee
        .findById(payeeId)
        .exec(function (err, payee) {
            var response = {
                status: 200,
                message: payee
            };
            if (err) {
                console.log("Error retreiving data");
                response.status = 500;
                response.message = err;
            } else if (!payee) {
                response.status = 404;
                response.message = {
                    "message": "Item not found"
                };
            }
            if (response.status !== 200) {
                res.status(response.status)
                    .json(response.message);
            } else {                

                payee.name= req.body.name,
                payee.address= req.body.address,
                payee.mobile= req.body.mobile,
                payee.notes= req.body.notes,         
                payee.modifiedAt = moment.moment(),
                payee.modifiedBy = req.username,

                payee.save(function (err, updatedIncome) {

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


// TO DELETE PAYEE
module.exports.payeeDelete = function (req, res) {
    var payeeId = req.params.payeeId;
    console.log('DELETE the payee ID ' + payeeId);

    Payee
        .findByIdAndRemove(payeeId)
        .exec(function (err, payee) {
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

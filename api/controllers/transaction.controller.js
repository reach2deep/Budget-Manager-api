var mongoose = require('mongoose');
var moment = require('moment');
var Transaction = mongoose.model('Transaction');


// GET ALL Transaction
module.exports.transactionGetAll = function (req, res) {
    console.log('Requested By :', req.user);
    console.log('GET all transaction');
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
    Transaction
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, transactions) {
            if (err) {
                console.log("Error retreiving data");
                res
                    .status(500)
                    .json(err);
            }
            console.log('Found Transaction', transactions.length);
            res
                .json(transactions);
        });
};


// GET Transaction BY ID
module.exports.transactionGetOne = function (req, res) {
    var transactionId = req.params.transactionId;
    console.log('GET the transaction ID ' +transactionId);

    Transaction
        .findById(transactionId)
        .exec(function (err, transaction) {
            var response = {
                status: 200,
                message: transaction
            };
            if (err) {
                console.log("Error retreiving data");
                response.status = 500;
                response.message = err;
            } else if (!transaction) {
                response.status = 400;
                response.message = {
                    "message": "Item not found"
                };
            }

            res.status(response.status)
                .json(response.message);

        });
};

// TO ADD NEW transaction
module.exports.transactionAddNew = function (req, res) {
    console.log('POST new transaction');
    console.log(req.body);

    Transaction
        .create({
            transactionType: req.body.transactionType,
            transactionDate: req.body.transactionDate,
            category: req.body.category,
            subCategory: req.body.subCategory,
            account: req.body.account,
            payee: req.body.payee,
            amount: parseFloat(req.body.amount),                 
            notes: req.body.notes,
            createdAt : moment().format(),
            createdBy : req.username,
            modifiedAt : null,
            modifiedBy : null,
            approvedAt : null,
            approvedBy : null,
            status : 'New'                      
        }, function (err, transaction) {
            var response = {
                status: 200,
                message: transaction
            };
            if (err) {
                console.log('Error creating new transaction');
                response.status = 400;
                response.message = err;
            } else {
                console.log('transaction Created');
                response.status = 201;
                response.message = transaction;
            }
            res.status(response.status)
                .json(response.message);
        });

};


// TO UPDATE transaction
module.exports.transactionUpdate = function (req, res) {

    var transactionId = req.params.transactionId;
    console.log('GET the transaction ID ' +transactionId);

    Transaction
        .findById(transactionId)
        .exec(function (err, transaction) {
            var response = {
                status: 200,
                message: transaction
            };
            if (err) {
                console.log("Error retreiving data");
                response.status = 500;
                response.message = err;
            } else if (!transaction) {
                response.status = 404;
                response.message = {
                    "message": "Item not found"
                };
            }
            if (response.status !== 200) {
                res.status(response.status)
                    .json(response.message);
            } else {                
                transaction.transactionType= req.body.transactionType,
                transaction.transactionDate= req.body.transactionDate,
                transaction.category= req.body.category,
                transaction.subCategory= req.body.subCategory,
                transaction.transaction.account= req.body.account,
                transaction.payee= req.body.payee,
                transaction.amount= parseFloat(req.body.amount),                 
                transaction.notes= req.body.notes,
                transaction.modifiedAt = moment().format(),
                transaction.modifiedBy = req.username,
              
                transaction.save(function (err, updatedTransaction) {

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


// TO DELETE Transaction
module.exports.transactionDelete = function (req, res) {
    var transactionId = req.params.transactionId;
    console.log('DELETE the income ID ' + transactionId);

    Transaction
        .findByIdAndRemove(transactionId)
        .exec(function (err, transaction) {
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

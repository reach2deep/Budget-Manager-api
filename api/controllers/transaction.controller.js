var mongoose = require('mongoose');
var Transaction = mongoose.model('Transaction');

// GET ALL Transactions
module.exports.transactionGetAll = function(req, res) {
    console.log('Requested By :', req.user);
    console.log('GET the Transaction');
    console.log(req.query);
    console.log(req.query.skip);

    offset = 0;
    count = parseInt(req.query.skip);
    maxCount = parseInt(req.query.limit);
    transactionType = req.params.type;
    console.log('transactionType', this.transactionType);
    console.log('count', this.count);
    console.log('maxCount', this.maxCount);



    // if (req.query && req.query.offset) {
    //     offset = parseInt(req.query.offset, 10);
    // }

    // if (req.query && count) {
    //     offset = parseInt(req.query.skip, 10);
    // }

    // if (isNaN(offset) || isNaN(count)) {
    //     res
    //         .status(400)
    //         .json({
    //             "message": "Invalid query parameters"
    //         });
    //     return;
    // }

    // if (count > maxCount) {
    //     res
    //         .status(400)
    //         .json({
    //             "message": "Invalid count parameter"
    //         });
    //     return;
    // }
    Transaction
        .find()
        .where({ transactionType: transactionType })
        .skip(this.count)
        .limit(this.maxCount)
        .sort({ transactionDate: 'descending' })
        .exec(function(err, transactions) {
            if (err) {
                console.log("Error retreiving data");
                res
                    .status(500)
                    .json(err);
            }
            console.log('Found transactions', transactions.length);
            res
                .json(transactions);
        });
};


// GET Transaction BY ID
module.exports.transactionGetOne = function(req, res) {
    var transactionId = req.params.transactionId;
    console.log('GET the transaction ID ' + transactionId);

    Transaction
        .findById(transactionId)
        .exec(function(err, transaction) {
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

// TO ADD NEW Transaction
module.exports.transactionAddNew = function(req, res) {
    console.log('POST new Transaction');
    console.log(req.body);

    Transaction
        .create({
            transactionType: req.body.transactionType,
            transactionDate: req.body.transactionDate,
            category: req.body.category,
            categoryId: req.body.categoryid,
            amount: parseFloat(req.body.amount),
            account: req.body.account,
            accountId: req.body.accountId,
            payee: req.body.payee,
            payeeId: req.body.payeeid,
            notes: req.body.notes,
            createdAt: req.body.createdAt,
            createdBy: req.body.createdBy,
            iscleared: req.body.iscleared
        }, function(err, transaction) {
            var response = {
                status: 200,
                message: transaction
            };
            if (err) {
                console.log('Error creating new transaction');
                response.status = 400;
                response.message = err;
            } else {
                console.log('Transaction Created');
                response.status = 201;
                response.message = transaction;
                console.log('RES', JSON.stringify(response));
            }
            res.status(response.status)
                .json(response.message);


        });

};


// TO UPDATE Transaction
module.exports.transactionUpdate = function(req, res) {

    var transactionId = req.params.transactionId;
    console.log('GET the Transaction ID ' + transactionId);

    Transaction
        .findById(transactionId)
        .exec(function(err, transaction) {
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
                transaction.transactionType = req.body.transactionType,
                    //transaction.transactionDate= req.body.transactionDate,
                    transaction.category = req.body.category,
                    transaction.categoryId = req.body.categoryid,
                    transaction.amount = parseFloat(req.body.amount),
                    transaction.account = req.body.account,
                    transaction.accountId = req.body.accountId,
                    transaction.payee = req.body.payee,
                    transaction.payeeId = req.body.payeeid,
                    transaction.notes = req.body.notes,
                    transaction.modifiedAt = ''
                transaction.modifiedBy = ''

                transaction.save(function(err, updatedTransaction) {

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
module.exports.transactionDelete = function(req, res) {
    var transactionId = req.params.transactionId;
    console.log('DELETE the Transaction ID ' + transactionId);

    Transaction
        .findByIdAndRemove(transactionId)
        .exec(function(err, transaction) {
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
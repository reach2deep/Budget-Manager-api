var mongoose = require('mongoose');
var Expense = mongoose.model('Expense');

// GET ALL EXPENSES
module.exports.expenseGetAll = function (req, res) {
    console.log('Requested By :',req.user);
    console.log('GET the Expense');
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
    Expense
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, expenses) {
            if (err) {
                console.log("Error retreiving data");
                res
                    .status(500)
                    .json(err);
            }
            console.log('Found expenses', expenses.length);
            res
                .json(expenses);
        });
};


// GET EXPENSE BY ID
module.exports.expenseGetOne = function (req, res) {
    var expenseId = req.params.expenseId;
    console.log('GET the Expense ID ' + expenseId);

    Expense
        .findById(expenseId)
        .exec(function (err, expense) {
            var response = {
                status: 200,
                message: expense
            };
            if (err) {
                console.log("Error retreiving data");
                response.status = 500;
                response.message = err;
            } else if (!expense) {
                response.status = 400;
                response.message = {
                    "message": "Item not found"
                };
            }

            res.status(response.status)
                .json(response.message);

        });
};

// TO ADD NEW EXPENSE
module.exports.addNewExpense = function (req, res) {
    console.log('POST new Expense');
    console.log(req.body);

    // var imageItem = {
    //     description: req.body.description,
    //     contentType: req.file.mimetype,
    //     size: req.file.size,
    //     img: Buffer(encImg, 'base64')
    //  };

    Expense
        .create({
            expenseDate: req.body.expenseDate,
            category: req.body.category,
            amount: parseFloat(req.body.amount),
            account: req.body.account,
            payee: req.body.payee,
            notes: req.body.notes
        }, function (err, expense) {
            var response = {
                status: 200,
                message: expense
            };
            if (err) {
                console.log('Error creating new expense');
                response.status = 400;
                response.message = err;
            } else {
                console.log('Expense Created');
                response.status = 201;
                response.message = expense;
            }
            res.status(response.status)
                .json(response.message);
        });

};


// TO UPDATE EXPENSE
module.exports.updateExpense = function (req, res) {

    var expenseId = req.params.expenseId;
    console.log('GET the Expense ID ' + expenseId);

    Expense
        .findById(expenseId)
        .exec(function (err, expense) {
            var response = {
                status: 200,
                message: expense
            };
            if (err) {
                console.log("Error retreiving data");
                response.status = 500;
                response.message = err;
            } else if (!expense) {
                response.status = 404;
                response.message = {
                    "message": "Item not found"
                };
            }
            if (response.status !== 200) {
                res.status(response.status)
                    .json(response.message);
            } else {

                expense.expenseDate = req.body.expenseDate,
                    expense.category = req.body.category,
                    expense.amount = parseFloat(req.body.amount),
                    expense.account = req.body.account,
                    expense.payee = req.body.payee,
                    expense.notes = req.body.notes,

                expense.save(function (err, updatedExpense) {

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


// TO DELETE EXPENSE
module.exports.deleteExpense = function (req, res) {
    var expenseId = req.params.expenseId;
    console.log('DELETE the Expense ID ' + expenseId);

    Expense
        .findByIdAndRemove(expenseId)
        .exec(function (err, expense) {
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
                response.message ='';
            }
            

            res.status(response.status)
                .json(response.message);

        });
};


// GET EXPENSE BY CATERGORY
module.exports.expenseByCategory = function (req, res) {
    var categoryId = req.params.categoryId;
    console.log('GET the Expense by category ID ' + categoryId);

    var offset = 0;
    var count = 5;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        offset = parseInt(req.query.count, 10);
    }

    Expense
        .find({
            'category': categoryId
        })
        .skip(offset)
        .limit(count)
        .exec(function (err, expenses) {
            console.log('Found expenses by Category', expenses.length);
            res
                .json(expenses);
        });
};
var mongoose = require('mongoose');
var moment = require('moment');
var Account = mongoose.model('Account');
var moment = require('moment');

// GET ALL ACCOUNT
module.exports.accountGetAll = function (req, res) {
    console.log('Requested By :', req.user);
    console.log('GET the Account');
    console.log(req.query);

    
    const queryParams = req.query;
    console.log(req.query);

    const courseId = queryParams.courseId,
          filter = queryParams.filter || '',
          sortOrder = queryParams.sortOrder,
          pageNumber = parseInt(queryParams.pageNumber) || 0,
          pageSize = parseInt(queryParams.pageSize);

     var perPage = pageSize ;
     var page = pageNumber > 0 ? pageNumber : 0 ;

    
     start =  pageNumber * pageSize;
    

    Account
    .find()   
    .limit(perPage)
    .skip(perPage * page)
    .sort({name: 'asc'})
    .exec(function (err, transactions) {
        Account.count().exec(function (err, count) {
        res.status(200).json({           
            totalElements: count
            , totalPages: count / pageSize
            , start :pageNumber * pageSize
            ,end: Math.min((start + pageSize), count)
            , data: transactions
        })
      })
    })

 
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
            transactionDate: req.body.transactionDate,
            accountName: req.body.accountName,            
            amount: parseFloat(req.body.amount),            
            description: req.body.description,                  
            createdAt : moment().format(),
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

                account.transactionDate= req.body.transactionDate,
                account.accountName= req.body.accountName,
                account.amount= parseFloat(req.body.amount),              
                account.description= req.body.description,
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

var mongoose = require('mongoose');
var moment = require('moment');
var Category = mongoose.model('Category');


// GET ALL CATEGORY
module.exports.categoryGetAll = function (req, res) { 
    Category
        .find()        
        .exec(function (err, categories) {
            if (err) {
                console.log("Error retreiving data");
                res
                    .status(500)
                    .json(err);
            }
            console.log('Found categories', categories.length);
            res
                .json(categories);
        });
};


// GET Category BY ID
module.exports.categoryGetOne = function (req, res) {
    var categoryId = req.params.categoryId;
    console.log('GET the Category ID ' +categoryId);

    Category
        .findById(categoryId)
        .exec(function (err, category) {
            var response = {
                status: 200,
                message: category
            };
            if (err) {
                console.log("Error retreiving data");
                response.status = 500;
                response.message = err;
            } else if (!category) {
                response.status = 400;
                response.message = {
                    "message": "Item not found"
                };
            }

            res.status(response.status)
                .json(response.message);

        });
};

// TO ADD NEW Category
module.exports.categoryAddNew = function (req, res) {
    console.log('POST new Category');
    console.log(req.body);

    if(req.body.parent===undefined)
        req.body.parent= req.body.name;

    Category
        .create({
            name: req.body.name,
            parent: req.body.parent,
            type: req.body.type,
            createdAt :moment().format('YYYY-MM-DD HH:mm:ss.000').toString()+'Z',            
            createdBy : req.username                       
        }, function (err, category) {
            var response = {
                status: 200,
                message: category
            };
            if (err) {
                console.log('Error creating new category');
                response.status = 400;
                response.message = err;
            } else {
                console.log('Category Created');
                response.status = 201;
                response.message = category;
            }
            res.status(response.status)
                .json(response.message);
        });

};


// TO UPDATE CATEGORY
module.exports.categoryUpdate = function (req, res) {

    var categoryId = req.params.categoryId;
    console.log('GET the category ID ' +categoryId);

    Category
        .findById(categoryId)
        .exec(function (err, category) {
            var response = {
                status: 200,
                message: category
            };
            if (err) {
                console.log("Error retreiving data");
                response.status = 500;
                response.message = err;
            } else if (!category) {
                response.status = 404;
                response.message = {
                    "message": "Item not found"
                };
            }
            if (response.status !== 200) {
                res.status(response.status)
                    .json(response.message);
            } else {                

                category.name= req.body.name,
                category.parent= req.body.parent,  
                category.type= req.body.type,              
                category.modifiedAt = moment().format('YYYY-MM-DD HH:mm:ss.000').toString()+'Z',
                category.modifiedBy = req.username,

                category.save(function (err, updatedIncome) {

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


// TO DELETE CATEGORY
module.exports.categoryDelete = function (req, res) {
    var categoryId = req.params.categoryId;
    console.log('DELETE the category ID ' + categoryId);

    Category
        .findByIdAndRemove(categoryId)
        .exec(function (err, category) {
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
                response.status = 204;
                response.message = '';
            }
            
            res.status(response.status)
                .json(response.message);

        });
};

var mongoose = require('mongoose');
var moment = require('moment');
var Category = mongoose.model('Category');
var Payee = mongoose.model('Payee');


// GET ALL CATEGORY
module.exports.getAllMasterData = function (req, res) {
   var masterData={};
   var categoryData
   var payeeData 
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
            masterData.categories=categories;
        });

        Payee
        .find()
        .exec(function (err, payees) {
            if (err) {
                console.log("Error retreiving data");
                res
                    .status(500)
                    .json(err);
            }
            console.log('Found payees', payees.length);
            //payeeData = payees;
            masterData.payees= payees;
            res.status(200)
            .json(masterData);
        });

       //  masterData.category= categoryData;
       //  masterData.payees= payeeData;

    //    console.log(JSON.stringify(categoryData));
    //    console.log(JSON.stringify(payeeData));
    //    return res.json('TEST');
};
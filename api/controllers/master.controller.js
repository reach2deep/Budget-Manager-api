var mongoose = require('mongoose');
var moment = require('moment');
var async = require("async");
var Category = mongoose.model('Category');
var Payee = mongoose.model('Payee');


// GET ALL CATEGORY
module.exports.getAllMasterData = function (req, res) {

       var masterData={};
   var categoryData;
   var payeeData ;
    async.parallel({
        one: function(callback) {
            console.log('one');
                Category
        .find()
        .exec(function (err, categories) {
            if (err) {
                console.log("Error retreiving categories data");              
                    callback(err, null);
            }
            console.log('Found categories', categories.length);
            callback(null, categories);           
        });

            // setTimeout(function() {
            //     callback(null, 1);
            // }, 200);
        },
        two: function(callback) {
            console.log('two');
            Payee
            .find()
            .exec(function (err, payees) {
                if (err) {
                    console.log("Error retreiving payees data");              
                        callback(err, null);
                }
                console.log('Found payees', payees.length);
                callback(null, payees);           
            });
        }
    }, function(err, results) {
        if(err)
        {
                            res
                    .status(500)
                    .json(err);
        }
      //  console.log(results);
        masterData.categories=results.one;
        masterData.payees= results.two;
       // console.log(JSON.stringify(masterData));
        res.status(200)
                     .json(masterData);
        // results is now equals to: {one: 1, two: 2}
    });

//    var masterData={};
//    var categoryData
//    var payeeData 
//     Category
//         .find()
//         .exec(function (err, categories) {
//             if (err) {
//                 console.log("Error retreiving data");
//                 res
//                     .status(500)
//                     .json(err);
//             }
//             console.log('Found categories', categories.length);
//             masterData.categories=categories;
//         });

//         Payee
//         .find()
//         .exec(function (err, payees) {
//             if (err) {
//                 console.log("Error retreiving data");
//                 res
//                     .status(500)
//                     .json(err);
//             }
//             console.log('Found payees', payees.length);
//             //payeeData = payees;
//             masterData.payees= payees;
//             res.status(200)
//             .json(masterData);
//         });

       //  masterData.category= categoryData;
       //  masterData.payees= payeeData;

    //    console.log(JSON.stringify(categoryData));
    //    console.log(JSON.stringify(payeeData));
      // return res.json('TEST');
};
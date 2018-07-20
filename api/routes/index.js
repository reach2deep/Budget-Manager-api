var express = require('express');
var router = express.Router();


var ctrlCategory = require('../controllers/category.controller');
var ctrlUser = require('../controllers/user.controller');
var ctrlAccount = require('../controllers/account.controller');
var ctrlPayee = require('../controllers/payee.controller');
var ctrlTransaction = require('../controllers/transaction.controller');
var ctrlMaster = require('../controllers/master.controller');

//Authentication Routes
router
    .route('/user/register')
    .post(ctrlUser.register); // to create new user

router
    .route('/user/login')
    .post(ctrlUser.login); // to login

//Transaction Routes
router
    .route('/transaction/:type')
    .get(ctrlTransaction.transactionGetAll) // get all Transaction
    .post(ctrlTransaction.transactionAddNew); // to add new Transaction    
router
    .route('/transaction/:transactionId')
    .get(ctrlTransaction.transactionGetOne) // get Transaction by Id
    .put(ctrlTransaction.transactionUpdate) // to update Transaction
    .delete(ctrlTransaction.transactionDelete); // to delete Transaction
// router
//     .route('/category/:categoryId/expense')
//     .get(ctrlExpense.expenseByCategory); // get Transaction by category

// //Income Routes
// router
//     .route('/income')
//     .get(ctrlIncome.incomeGetAll) // get all income
//     .post(ctrlIncome.incomeAddNew); // to add new income    
// router
//     .route('/income/:incomeId')
//     .get(ctrlIncome.incomeGetOne) // get income by Id
//     .put(ctrlIncome.incomeUpdate) // to update income
//     .delete(ctrlIncome.incomeDelete); // to delete income

//Account Routes
router
    .route('/account')
    .get(ctrlAccount.accountGetAll) // get all income
    .post(ctrlAccount.accountAddNew); // to add new income    
router
    .route('/account/:accountId')
    .get(ctrlAccount.accountGetOne) // get income by Id
    .put(ctrlAccount.accountUpdate) // to update income
    .delete(ctrlAccount.accountDelete); // to delete income

//Category Routes
router
    .route('/category')
    .get(ctrlCategory.categoryGetAll) // get all income
    .post(ctrlCategory.categoryAddNew); // to add new income    
router
    .route('/category/:categoryId')
    .get(ctrlCategory.categoryGetOne) // get income by Id
    .put(ctrlCategory.categoryUpdate) // to update income
    .delete(ctrlCategory.categoryDelete); // to delete income

//Payee Routes
router
    .route('/payee')
    .get(ctrlPayee.payeeGetAll) // get all income
    .post(ctrlPayee.payeeAddNew); // to add new income    
router
    .route('/payee/:payeeId')
    .get(ctrlPayee.payeeGetOne) // get income by Id
    .put(ctrlPayee.payeeUpdate) // to update income
    .delete(ctrlPayee.payeeDelete); // to delete income

//Transaction Routes
router
    .route('/transaction')
    .get(ctrlTransaction.transactionGetAll)// get all expenses
    .post(ctrlTransaction.transactionAddNew); // to add new expense    
router
    .route('/transaction/:transactionId')
    .get(ctrlTransaction.transactionGetOne) // get expense by Id
    .put(ctrlTransaction.transactionUpdate) // to update expense
    .delete(ctrlTransaction.transactionDelete); // to delete expense

router.post('/upload-file', function(req, res, next) {
        var fstream;
        if (req.busboy) {
      
          req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            fstream = fs.createWriteStream(__dirname + '/../../public/my-files/' + filename);
            file.pipe(fstream);
            fstream.on('close', function(){
              console.log('file ' + filename + ' uploaded');
            });
          });
          req.busboy.on('finish', function(){
            console.log('finish, files uploaded ');
            res.json({ success : true});
          });
          req.pipe(req.busboy);
        }
      });
//Master Routes
router
.route('/masters')
.get(ctrlMaster.getAllMasterData) // get all masters


module.exports = router;
var mongoose = require('mongoose');

var expenseSchema = new mongoose.Schema({
      expenseDate: Date,
      category: String,
      amount: Number,
      account: String,
      payee: String,
      notes: String,
      receipt: [{ data: Buffer, contentType: String , size : String ,description : String}],
      createdAt: Date,
      createdBy: String,
      modifiedAt: Date,
      modifiedBy: String,
      approvedAt: Date,
      approvedBy: String
});

mongoose.model('Expense', expenseSchema);
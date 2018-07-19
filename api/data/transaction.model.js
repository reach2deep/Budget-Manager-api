var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({      
      transactionType: String,
      transactionDate: Date,
      category: String,
      subCategory: String,
      account: String,
      payee: String,
      amount: Number,      
      notes: String,
      receipt: [{ data: Buffer, contentType: String }],
      createdAt: Date,
      createdBy: String,
      modifiedAt: Date,
      modifiedBy: String,
      approvedAt: Date,
      approvedBy: String,
      status:String
});

mongoose.model('Transaction', transactionSchema);
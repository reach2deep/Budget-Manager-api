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
      receipts: {  name: String, uniqueName: String },
      createdAt: Date,
      createdBy: String,
      modifiedAt: Date,
      modifiedBy: String,
      approvedAt: Date,
      approvedBy: String,
      status:String
});

// transactionSchema.virtual('transactionDate')
//   .get(function() {
//     return this.transactionDate.toDateString();
//   });

mongoose.model('Transaction', transactionSchema);
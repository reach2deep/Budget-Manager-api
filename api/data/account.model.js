var mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({
      transactionDate: String,
      accountName: String,
      amount: Number,
      description: String,           
      createdAt: Date,
      createdBy: String,
      modifiedAt: Date,
      modifiedBy: String     
});

mongoose.model('Account', accountSchema);
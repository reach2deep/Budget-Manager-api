var mongoose = require('mongoose');

var incomeSchema = new mongoose.Schema({
      incomeDate: Date,
      description: String,
      category: String,
      amount: Number,
      account: String,
      payee: String,
      notes: String,
      receipt: [String],
      createdAt: Date,
      createdBy: String,
      modifiedAt: Date,
      modifiedBy: String,
      approvedAt: Date,
      approvedBy: String
});

mongoose.model('Income', incomeSchema);
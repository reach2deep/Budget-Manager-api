var mongoose = require('mongoose');

var payeeSchema = new mongoose.Schema({
      name: String,
      address: String,
      mobile: String,
      notes: String,     
      createdAt: Date,
      createdBy: String,
      modifiedAt: Date,
      modifiedBy: String     
});

mongoose.model('Payee', payeeSchema);
var mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({
      name: String,
      description: String,
      amount: Number,      
      createdAt: Date,
      createdBy: String,
      modifiedAt: Date,
      modifiedBy: String     
});

mongoose.model('Account', accountSchema);
var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
      name: String,
      parent: String, 
      type:String,    
      createdAt: Date,
      createdBy: String,
      modifiedAt: Date,
      modifiedBy: String     
});

mongoose.model('Category', categorySchema);
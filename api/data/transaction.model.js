var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
    transactionType: String,
    transactionDate: Date,
    category: String,
    categoryId: String,
    amount: Number,
    account: String,
    accountId: String,
    payee: String,
    payeeId: String,
    notes: String,
    photos: [{ data: Buffer, contentType: String }],
    createdAt: Date,
    createdBy: String,
    modifiedAt: Date,
    modifiedBy: String,
    approvedAt: Date,
    approvedBy: String,
    iscleared: String
});

mongoose.model('Transaction', transactionSchema);
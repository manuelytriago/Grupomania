const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const commentSchema = mongoose.Schema({
userId:{type: String, required: true},
comment:{type: String, required: true},
date:{type: Date, required: true},
imageUrl:{type: [String], required: false},
videUrl:{type: [String], required: false}
});
//commentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Comment', commentSchema);
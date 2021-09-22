const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const commentSchema = mongoose.Schema({
userId:{type: String, required: true},
comment:{type: String, required: true},
imageUrl:{type: String, required: true}
});
//commentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Comment', commentSchema);
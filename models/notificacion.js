const mongoose = require('mongoose');
const schema = mongoose.Schema;
const commentSch = require('/comment');
const Comment  = mongoose.model('Comment',CommentSch);

 const notificationSchema = schema({
   date: Date,
   conmment: { type: Schema.ObjectId, ref:'Comment'}
 });

 module.exports = mongoose.model('Notification',notificationSchema);

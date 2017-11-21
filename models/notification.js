const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Comment  = mongoose.model('Comment');

 const notificationSchema = schema({
   date: Date,
   comment: { type: Schema.ObjectId, ref:'Comment'}
 });

 module.exports = mongoose.model('Notification',notificationSchema);

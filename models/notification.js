const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Comment  = mongoose.model('Comment');
const User  = mongoose.model('User');

 const notificationSchema = schema({
   date: Date,
   comment: { type: schema.ObjectId, ref:'Comment'}
 });

 module.exports = mongoose.model('Notification',notificationSchema);

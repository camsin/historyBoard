const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Comment  = mongoose.model('Comment');
const User  = mongoose.model('User');

 const notificationSchema = schema({
   date: {type:Date, default: Date.now},
   comment: { type: schema.ObjectId, ref:'Comment'},
    seen: {type: Boolean, default:false}
 });

let Notification = mongoose.model('Notification',notificationSchema);
module.exports = {Notification};

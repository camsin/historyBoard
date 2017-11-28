const express = require('express');
const Notification = require('../../models/notification').Notification;
const Comment = require('../../models/comment');

function index(req, res, next) {
    res.render('notifications', {showSideNav: true, user: req.user});
}

function getNotificationsLimit(req, res, next) {

    Notification.find({seen: false}).sort({'date': -1}).populate({
        path: 'comment',
        populate: [{path: 'publication', model: 'Publication'}, {path: 'author', model: 'User'}]
    }).exec((err, notifications) => {

        if(err){
            return res.json(err);
        }

        let arrayNotifications = [];

        if(notifications.length > 0){
            if(notifications.length < 5){
                for (var i = 0; i < notifications.length; i++) {
                    console.log("NOTIFICATIONS", notifications[i].comment.publication);
                        if (notifications[i].comment.publication.author.equals(req.user._id)) {
                            arrayNotifications.push(notifications[i]);
                        }
                }
            }else{
                for (var i = 0; i < 5; i++) {
                    console.log("NOTIFICATIONS", notifications[i].comment.publication);
                    if (notifications[i].comment.publication.author.equals(req.user._id)) {
                        arrayNotifications.push(notifications[i]);
                    }
                }
            }
        }
            return res.json(arrayNotifications);
    });
}

function getAllNotifications(req, res, next) {
    Notification.find({}).sort({'date': -1}).populate({
        path: 'comment',
        populate: [{path: 'publication', model: 'Publication'}, {path: 'author', model: 'User'}]
    }).exec((err, notifications) => {
        if(err){
            return res.json(err);
        }

        let arrayNotifications = [];
        for (var i = 0; i < notifications.length; i++) {
            if (notifications[i].comment.publication.author.equals(req.user._id)) {
                arrayNotifications.push(notifications[i]);
            }
        }
        return res.json(notifications);
    });
}

function create(req, res, next) {
    let body = req.body;

    let notification = new Notification({
        comment: body.comment
    });

    Comment.findOne({"_id": body.comment}).populate('publication').populate('author').exec((err, comment) => {
        if(err){
            res.send(err);
        }else{
            if(!comment.publication.author.equals(comment.author._id)){
                notification.save((err, notification) => {
                    if(err) {
                        res.send(err);
                    }else{
                        res.send(notification);
                    }
                });
            }else{
                res.sendStatus(200);
            }
        }
    });
};

function updateNotification(req, res, next) {
    Notification.update({"_id": req.body.notification},
        {$set: {seen: true}}, function (err) {
            if (err) {
                res.json({error: true, message: err});
            } else {
                res.json({error: false, message: "Se guardo exitosamente"});
            }
        });
};

module.exports = {
    index,
    getNotificationsLimit,
    getAllNotifications,
    create,
    updateNotification
};

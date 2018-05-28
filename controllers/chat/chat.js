// const amqp = require('amqplib/callback_api');
// exports.chat = (req,res,next)=>{
//     return res.render('chat');
// }
// exports.getMessages = (req,res,next) => {
//     amqp.connect('amqp://sxvsjtcd:mOrhabcXKa3-tm7AxgOR19ZVtza3DDPO@emu.rmq.cloudamqp.com/sxvsjtcd', function(err, conn) {
//       conn.createChannel(function(err, ch) {
//         var q = 'hello';
//
//         ch.assertQueue(q, {durable: false});
//         // Note: on Node 6 Buffer.from(msg) should be used
//         ch.sendToQueue(q, new Buffer('Hello World!'));
//         console.log(" [x] Sent 'Hello World!'");
//         conn.close();
//       });
//     });
// }

const express = require('express');
const amqp = require('amqplib/callback_api');

function chat(req, res ,next){
    res.render('chat', {showSideNav: true, user: req.user});
};

function getMessages(req, res, next){
    amqp.connect('amqp://sxvsjtcd:mOrhabcXKa3-tm7AxgOR19ZVtza3DDPO@emu.rmq.cloudamqp.com/sxvsjtcd', function(err, conn) {
      conn.createChannel(function(err, ch) {
        var q = 'hello';

        ch.assertQueue(q, {durable: false});
        // Note: on Node 6 Buffer.from(msg) should be used
        ch.sendToQueue(q, new Buffer('Hello World!'));
        console.log(" [x] Sent 'Hello World!'");
        conn.close();
      });
    });
};

module.exports = {
    chat,
    getMessages
};
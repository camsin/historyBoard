const express = require('express');
const router = express.Router();
const chatController = require('./../controllers/chat/chat');
const isLoggedIn = require('./../auth/passport.js').isLoggedIn;
var amqp = require('amqplib/callback_api');

module.exports = function(io) {

    // const chat = io.of('/chat');


    router.get('/', isLoggedIn, function(req, res ,next){
        amqp.connect('amqp://localhost', function(err, conn) {
            conn.createChannel(function(err, ch) {
                var ex = 'logs';
                var msg = process.argv.slice(2).join(' ') || 'Hello World!';

                ch.assertExchange(ex, 'fanout', {durable: false});
                // io.on('connection',function(socket) {
                //     socket.on('mensajeToSend',(msg)=>{
                //         console.log("MENSAJE AL MOMENTO DE ENVIAR", msg);
                //     let new_msg = new Buffer(JSON.stringify(msg));
                //     ch.publish(ex, '',new_msg);
                //     console.log(" [x] Sent %s", msg);
                //     // ch.publish('history', ROUTING_KEY, new_msg);
                // });
                // });

                ch.assertQueue('', {exclusive: true}, function(err, q) {
                    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                    ch.bindQueue(q.queue, ex, '');

                    ch.consume(q.queue, function(msg) {
                        console.log(" [x] MENSAJE AL MOMENTO DE RECIBIR %s", msg.content.toString());
                        io.emit('mensaje', msg.content.toString());
                        // arrayMensajes.push(msg.content.toString());

                    }, {noAck: true});
                });



            });

            // setTimeout(function() { conn.close(); process.exit(0) }, 500);
        });
    res.render('chat', {showSideNav: true, user: req.user});
});

router.post('/m', isLoggedIn, function(req, res ,next) {
    console.log("REQ", req.body);
    amqp.connect('amqp://localhost', function (err, conn) {
        conn.createChannel(function (err, ch) {
            var ex = 'logs';
            // var msg = process.argv.slice(2).join(' ') || 'Hello World!';

            ch.assertExchange(ex, 'fanout', {durable: false});
            // io.on('connection',function(socket) {
            //     socket.on('mensajeToSend',(msg)=>{
            // console.log("MENSAJE AL MOMENTO DE ENVIAR", msg);
            let new_msg = new Buffer(JSON.stringify(req.body));
            ch.publish(ex, '', new_msg);
            console.log(" [x] Sent %s", new_msg);
            // ch.publish('history', ROUTING_KEY, new_msg);
            // });
            // });

            // ch.assertQueue('', {exclusive: true}, function(err, q) {
            //     console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            //     ch.bindQueue(q.queue, ex, '');
            //
            //     ch.consume(q.queue, function(msg) {
            //         console.log(" [x] MENSAJE AL MOMENTO DE RECIBIR %s", msg.content.toString());
            //         io.emit('mensaje', msg.content.toString());
            //
            //     }, {noAck: true});
            // });


        });

        // setTimeout(function() { conn.close(); process.exit(0) }, 500);
    });
});

router.get('/g', isLoggedIn, function(req, res, next){
    var arrayMensajes = [];
    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
            var ex = 'logs';
            var msg = process.argv.slice(2).join(' ') || 'Hello World!';

            ch.assertExchange(ex, 'fanout', {durable: false});
            // io.on('connection',function(socket) {
            //     socket.on('mensajeToSend',(msg)=>{
            //         console.log("MENSAJE AL MOMENTO DE ENVIAR", msg);
            //     let new_msg = new Buffer(JSON.stringify(msg));
            //     ch.publish(ex, '',new_msg);
            //     console.log(" [x] Sent %s", msg);
            //     // ch.publish('history', ROUTING_KEY, new_msg);
            // });
            // });

            ch.assertQueue('', {exclusive: true}, function(err, q) {
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
                ch.bindQueue(q.queue, ex, '');

                ch.consume(q.queue, function(msg) {
                    console.log(" [x] MENSAJE AL MOMENTO DE RECIBIR %s", msg.content.toString());
                    // io.emit('mensaje', msg.content.toString());
                    arrayMensajes.push(msg.content.toString());

                }, {noAck: true});
            });



        });

        // setTimeout(function() { conn.close(); process.exit(0) }, 500);
    });

    return res.json(arrayMensajes);

});

    return router;
};


// module.exports = router;

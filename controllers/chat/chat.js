const amqp = require('amqplib/callback_api');
exports.chat = (req,res,next)=>{
    return res.render('chat');
}
exports.getMessages = (req,res,next) => {
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
}

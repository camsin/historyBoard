var rabbitMQHandler = require('./rabbitMQ_messaging');

module.exports = messageHandler;

function messageHandler(io){
    console.log("HOLA");
    rabbitMQHandler(process.env.CLOUDAMQP_URL + "?heartbeat=60", function(err, options){
        console.log("ERR", err);
        console.log("OPTIONS", options);

      if(err){
        throw err;
      }

    options.onMessageReceived = onMessageReceived;

    // io.on( "connection", function( socket ) {
    // console.log( "A user connected" );
    // });

    io.on('connection', websocketConnect);

    function websocketConnect(socket){

        console.log('New connection');

        function socketDisconnect(e){
            console.log("ALV");
            console.log('Disconnect ', e);
        }

        function socketMessage(text){
            console.log("TEXT", text);
            var message =  {text: text, date: new Date()};
            io.emit('message', message)
            // options.emitMessage(message);
        }

        socket.on('disconnect', socketDisconnect);
        socket.on('message', socketMessage);
    }
        io.emit('disconnect');


        function onMessageReceived(message){
        console.log("MESSAGE", message);
        io.emit('message', message)
    }

    });
}
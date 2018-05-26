var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var socket = require('socket.io');
var amqp = require('amqplib/callback_api');

// var messageHandler = require('./message_handler');

process.env.CLOUDAMQP_URL = 'amqp://dtnjyulk:yJ27rs4eQUW1ek6URIP35iR6MDgpgSvT@wasp.rmq.cloudamqp.com/dtnjyulk';

var app = express();

var io = socket();
app.io = io;

var login = require('./routes/index');
var ux = require('./routes/ux');
var publications = require('./routes/publications')(io);
var users = require('./routes/users');
var notifications = require('./routes/notifications');
var forum = require('./routes/forum');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// required for passport
app.use(session({ secret: 'mexicohistoryboard',resave:false,
    saveUninitialized: false
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', login);
app.use('/ux', ux);
app.use('/publications', publications);
app.use('/users', users);
app.use('/notifications', notifications);
app.use('/forum', forum);

//Handle messaging
// messageHandler(io);

var amqpConn = null;
function start() {
    console.log("ENTRE AL START");
    amqp.connect(process.env.CLOUDAMQP_URL + "?heartbeat=60", function(err, conn) {
        console.log("POPOOOOOO");
        if (err) {
            console.error("[AMQP]", err.message);
            return setTimeout(start, 1000);
        }
        conn.on("error", function(err) {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });
        conn.on("close", function() {
            console.error("[AMQP] reconnecting");
            return setTimeout(start, 1000);
        });
        console.log("[AMQP] connected");
        amqpConn = conn;
        // io.on('connection', whenConnected);
        whenConnected();
    });
}

function whenConnected() {
    startPublisher();
    startWorker();
}

var pubChannel = null;
var offlinePubQueue = [];
function startPublisher() {
    amqpConn.createConfirmChannel(function(err, ch) {
        if (closeOnErr(err)) return;
        ch.on("error", function(err) {
            console.error("[AMQP] channel error", err.message);
        });
        ch.on("close", function() {
            console.log("[AMQP] channel closed");
        });

        pubChannel = ch;
        while (true) {
            var m = offlinePubQueue.shift();
            if (!m) break;
            publish(m[0], m[1], m[2]);
        }
    });
}

function publish(exchange, routingKey, content) {
    try {
        pubChannel.publish(exchange, routingKey, content, { persistent: true },
            function(err, ok) {
                if (err) {
                    console.error("[AMQP] publish", err);
                    offlinePubQueue.push([exchange, routingKey, content]);
                    pubChannel.connection.close();
                }
                if(ok){
                    console.log("HIZE EL PUBLISH");
                }
            });
    } catch (e) {
        console.error("[AMQP] publish", e.message);
        offlinePubQueue.push([exchange, routingKey, content]);
    }
}
// A worker that acks messages only if processed succesfully
function startWorker() {
    amqpConn.createChannel(function(err, ch) {
        if (closeOnErr(err)) return;
        ch.on("error", function(err) {
            console.error("[AMQP] channel error", err.message);
        });

        ch.on("close", function() {
            console.log("[AMQP] channel closed");
        });

        ch.prefetch(10);
        ch.assertQueue("jobs", { durable: true }, function(err, _ok) {
            if (closeOnErr(err)) return;
            ch.consume("jobs", processMsg, { noAck: false });
            console.log("Worker is started");
        });

        function processMsg(msg) {
            work(msg, function(ok) {
                try {
                    if (ok)
                        ch.ack(msg);
                    else
                        ch.reject(msg, true);
                } catch (e) {
                    closeOnErr(e);
                }
            });
        }
    });
}


function work(msg, cb) {
    var messages = [];
    messages.push(msg.content.toString());
    io.emit('message', msg.content.toString());
    console.log("Got msg ", msg.content.toString());
    cb(true);
}

function closeOnErr(err) {
    if (!err) return false;
    console.error("[AMQP] error", err);
    amqpConn.close();
    return true;
}


// io.on('connection', start);

io.on( "connection", function( socket ) {
    console.log( "A user connected" );
});

start();

app.post('/newMessage', function(req, res){
    console.log("ENTRE AL POPO");
    var message =  {text: req.body.newMessage, date: new Date()};
    publish("", "jobs", new Buffer(JSON.stringify(message)));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('err404');
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;

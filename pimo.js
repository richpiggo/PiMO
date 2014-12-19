/*__/\\\\\\\\\\\\\__________/\\\\____________/\\\\_______/\\\\\______        
 _\/\\\/////////\\\_______\/\\\\\\________/\\\\\\_____/\\\///\\\____       
  _\/\\\_______\/\\\__/\\\_\/\\\//\\\____/\\\//\\\___/\\\/__\///\\\__      
   _\/\\\\\\\\\\\\\/__\///__\/\\\\///\\\/\\\/_\/\\\__/\\\______\//\\\_     
    _\/\\\/////////_____/\\\_\/\\\__\///\\\/___\/\\\_\/\\\_______\/\\\_    
     _\/\\\_____________\/\\\_\/\\\____\///_____\/\\\_\//\\\______/\\\__   
      _\/\\\_____________\/\\\_\/\\\_____________\/\\\__\///\\\__/\\\____  
       _\/\\\_____________\/\\\_\/\\\_____________\/\\\____\///\\\\\/_____ 
        _\///______________\///__\///______________\///_______\/////_______*/


/** imports ==========================================================*/

	var express = require("express");
	var app = express();
	var http = require("http").Server(app);
	var io = require("socket.io")(http);
	var path = require("path");
	var favicon = require("serve-favicon");
	var logger = require("morgan");
	var cookieParser = require("cookie-parser");
	var bodyParser = require("body-parser");
	var debug = require("debug")("PiMO");



/** setup ================================================*/

	app.use( favicon(__dirname + "/public/launcher-icon-4x.png") );
	app.use( logger("dev") );
	app.use( bodyParser.json() );
	app.use( bodyParser.urlencoded() );
	app.use( cookieParser() );
	app.use( express.static(path.join(__dirname, "public")) );
	app.set( "views", path.join(__dirname, "views") );
	app.set( "view engine", "jade" );


/** routes, bloody routes ==========================================================*/
	
	app.get( "/", function (req, res) {
		res.render("remote");
	});
	app.get( "/pimo", function (req, res) {
		res.render("pimo");
	});



/** sockets ==========================================================*/

	io.on( "connection", function (socket) {
		console.log( "a user connected" );
		
		// chat message
		socket.on( "chat message", function (from, msg) {
			var message = "message from "+from+": "+msg;
			console.log(message);
			io.emit( "chat message", message );
		});
		
		// button press
		socket.on( "button press", function (buttonId) {
			console.log( "someone pressed button " + buttonId );
		});
		
		socket.on( "disconnect", function () {
			console.log( "user disconnected" );
		});
	});



/** error handlers ==================================================*/

	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
		var err = new Error("Not Found");
		err.status = 404;
		next(err);
	});

	// development error handler, will print stacktrace
	if (app.get("env") === "development") {
		app.use(function (err, req, res, next) {
			res.status(err.status || 500);
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.write( err.message + "\n" + err );
		});
	}

	// production error handler no stacktraces leaked to user
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.write( err.message + "\n" + err );
	});



/** get going! =============================================*/

	var port = 1337;

	http.listen( port, function () {
		console.log( "Who wants to play video games?\nport "+port );
	});
/**
* PiMO client
*/
var PiMoRemote = function () {
	var that = this;

	// open socket
	this.socket = io();

	// dom refs
	this.dom = {
		button1: document.getElementById("button1"),
		button2: document.getElementById("button2"),
		button3: document.getElementById("button3"),
		messages: document.getElementById("messages"),
		msg: document.getElementById("msg"),
		msgbtn: document.getElementById("msgbtn"),
	};

	// incoming chat message
	this.socket.on("chat message", function (msg) {
		var node = document.createElement("LI");
		var textnode = document.createTextNode(msg);
		node.appendChild(textnode);
		that.dom.messages.appendChild(node);
	});

	// listeners
	this.dom.msgbtn.onclick = function () {
		that.socket.emit( "chat message", that.dom.msg.value );
		that.dom.msg.value = "";
		return false;
	};
	this.dom.button1.onclick = function () {
		that.socket.emit( "button press", 1 );
		return false;
	};

};

var PiMo = new PiMoRemote();
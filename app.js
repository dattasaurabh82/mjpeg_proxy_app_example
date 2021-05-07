var MjpegProxy = require('node-mjpeg-proxy');
var express = require('express');
var app = express();

var os = require('os');
var networkInterfaces = os.networkInterfaces();
var arr = networkInterfaces['eth0'];	
var LOCAL_IP = arr[0].address
//console.log(ip);

var PROXY_PORT = 7889;
var MJPEG_STREAM_LINK = "http://192.168.1.122:81/cam.mjpeg";

app.listen(PROXY_PORT, () => {
	console.log('MJPEG PROXY at http://' + LOCAL_IP + ':' + PROXY_PORT + '/cam.mjpeg');
});

var proxy1 = new MjpegProxy(MJPEG_STREAM_LINK);

// Bind proxy to the webserver
app.get('/cam.mjpeg', proxy1.proxyRequest);

// Events
proxy1.on('streamstart', function(data){
	console.log("Actual Sctream - " + data);		// [Console output] streamstart - [MjpegProxy] Started streaming http://192.168.1.123:7889/stream, users:
});

proxy1.on('streamstop', function(data){
	console.log("streamstop - " + data);	// [Console output] streamstop - [MjpegProxy] 0 Users, Stopping stream http://192.168.1.123:7889/stream
});

proxy1.on('error', function(data){
	console.log("msg: " + data.msg);		// [Console output] msg: Error: connect ECONNREFUSED 192.168.1.123:7889
	console.log("url: " + data.url);		// [Console output] url: - http://192.168.1.123:7889/stream
});	

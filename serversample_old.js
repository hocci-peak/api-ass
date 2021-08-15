var http = require('http');
var fs = require("fs");
//create a server object:
http.createServer(function (req, res) {
    
    if(req.url === "/apple"){
		res.write('Hello World!'); //write a response to the client
        res.end(); //end the response
	}else if(req.url === "/orange"){
		sendFileContent(res, "third.html", "text/html");
	}else if(req.url === "/ccc"){
		sendFileContent(res, "index.html", "text/html");
	}else if(req.url === "/aaa"){
		sendFileContent(res, "login.html", "text/html");
	}else if(req.url === "/bbb"){
		sendFileContent(res, "second.html", "text/html");
	}
	else if(/^\/[a-zA-Z0-9\/]*.css$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "text/css");
	}else if(/^\/[a-zA-Z0-9\/]*-*[a-zA-Z0-9]+-*[a-zA-Z0-9]+.jpg$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "image/jpg");
    }else if(/^\/[a-zA-Z0-9\/]*-*[a-zA-Z0-9]+-*[a-zA-Z0-9]+.png$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "image/png");
    }else if(/^\/[a-zA-Z0-9\/]*.js$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "application/javascript");
    }else if(/^\/[a-zA-Z0-9\/]*.ico$/.test(req.url.toString())){
		sendFileContent(res, req.url.toString().substring(1), "image/ico");
    }
}).listen(60000); //the server object listens on port 8080


function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}
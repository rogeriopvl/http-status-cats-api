fs = require('fs')
req    = require('request')
server = require('node-router').getServer()

server.get("/", function(request, response){
    fs.readFile(__dirname + '/index.html', function(err, data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data, 'utf-8');
        response.end();
    }
    );
})

server.get(new RegExp("^/(.*)(?:.jpg)?$"), function(request, response, match) {
    var output = match.indexOf('.jpg') >= 0 ? '/imgs/'+match : '/imgs/'+match+'.jpg';

    fs.readFile(__dirname+output, function (err, data) {
        response.writeHead(200, {'Content-Type': 'image/jpeg' })
        response.end(data)
    });
})

server.listen(process.env.PORT || 8080, '0.0.0.0')

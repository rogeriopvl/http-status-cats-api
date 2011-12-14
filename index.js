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
        if (err) {
            response.writeHead(404);
            response.end('Ups, we don\'t have image for that status code yet.');
        }
        else {
            response.writeHead(200, {'Content-Type': 'image/jpeg', 'Cache-Control': 'max-age=3600, public' });
            response.end(data);
        }
    });
})

server.listen(process.env.PORT || 8080, '0.0.0.0');

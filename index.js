var server = require('node-router').getServer()

server.get(/.*/, function(request, response){
    response.writeHead(301, { Location: 'http://http.cat' + request.url})
    response.end();
})

server.listen(process.env.PORT || 8080, '0.0.0.0');

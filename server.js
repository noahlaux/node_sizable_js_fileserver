var http = require('http'),
    url = require("url"),
    util = require('util'),
    _    = require("underscore"),
    mu   = require('mu2');

mu.root = __dirname + '/templates';

http.createServer(function (req, res) {
    var query   = url.parse(req.url, true).query,
        size    = query.size ? query.size : 200,
        string  = _.map( _.range( 0 , size ), function(){ 
            return "lorem ipsum ";
        }).join("");
        
    var stream = mu.compileAndRender('standard.mustache', {
        string: string
    });
        
    res.writeHead( 200, {
        'Content-Type': 'application/javascript'
    });
   
    mu.clearCache();
      
    util.pump(stream, res);

}).listen(process.env.PORT);
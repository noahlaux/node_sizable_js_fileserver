/**
 * Creates javascript files of various size
 * 
 * @example http://[YOUR URL]/?size=20000
 * 
 * @author Noah Laux (noahlaux@gmail.com)
 *
 */ 
var http = require('http'),
    url = require("url"),
    util = require('util'),
    _    = require("underscore"),
    mu   = require('mu2');

mu.root = __dirname + '/templates';

http.createServer( function ( req, res ) {
    
    var query   = url.parse( req.url, true ).query,
        size    = query.size ? query.size : 200,
        string  = _.map( _.range( 0 , size ), function(){ 
            return "lorem ipsum ";
        }).join("");
    
    mu.clearCache();
    
    var stream = mu.compileAndRender('standard.mustache', {
        string: string
    });
        
    res.writeHead( 200, {
        'Content-Type': 'application/javascript'
    });
      
    util.pump(stream, res);

}).listen( process.env.PORT );
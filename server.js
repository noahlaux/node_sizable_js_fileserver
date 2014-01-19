/**
 * Creates javascript files of various size
 *
 * @example http://[YOUR URL]/?size=20000
 *
 * @author Noah Laux (noahlaux@gmail.com)
 *
 * @require mu2
 *
 */
var http    = require('http'),
    url     = require("url"),
    util    = require('util'),
    mu      = require('mu2');

mu.root = __dirname + '/templates';

http.createServer( function ( req, res ) {

    var query   = url.parse( req.url, true ).query,
        types   = {
            'js': {
                type: 'js',
                mimeType: 'application/javascript'
            },
            'css': {
                type: 'css',
                mimeType: 'text/css'
            }
        },
        size    = parseInt( query.size, 10 ) || 200,
        type    = types[ query.type ] ? types[ query.type ].type : 'js',
        data    = new Array( size ).join('.').split('.').map(function ( key, i ) {
            return {
                raw: i
            };
        });

    mu.clearCache();

    var stream = mu.compileAndRender( type + '.mustache', {
        "data": data
    });

    res.writeHead( 200, {
        'Content-Type': type.mimeType
    });

    util.pump(stream, res);

}).listen( process.env.PORT );
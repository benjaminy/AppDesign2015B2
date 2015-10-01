var fs = require( 'fs' );
var http = require( 'http' );

function server_fun( req, res )
{
    console.log( req.url );
    var filename = "./" + req.url;
    try {
        var contents = fs.readFileSync( filename ).toString();
        res.writeHead( 200 );
        res.end( contents );
    }
    catch( exp ) {
        console.log( exp );
        res.writeHead( 404 );
        res.end( "Cannot find file: "+filename );
    }
}

var server = http.createServer( server_fun );

server.listen( 8080 );

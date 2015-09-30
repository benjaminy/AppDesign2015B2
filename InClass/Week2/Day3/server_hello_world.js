var http = require( 'http' );

function server_fun( req, res )
{
    // console.log( req );
    console.log( req.url );
    res.writeHead( 200 );
    res.end( "Hello world" );
}

var server = http.createServer( server_fun );

server.listen( 8080 );

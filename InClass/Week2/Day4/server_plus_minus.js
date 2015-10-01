var fs = require( 'fs' );
var http = require( 'http' );

var number = 0;

function server_fun( req, res )
{
    console.log( req.url );
    // ...
    var filename = "./" + req.url;
    try {
        var contents = fs.readFileSync( filename ).toString();
        res.writeHead( 200 );
        res.end( contents );
    }
    catch( exp ) {
        // console.log( "huh?", req.url.indexOf( "second_form?" ) );
        if( req.url.indexOf( "plus?" ) >= 0 )
        {
            number++;
            res.writeHead( 200 );
            res.end( "<html><body>"+number+"<form action='plus' method='get'><input type='submit' value='PLUS'></form><form action='minus' method='get'><input type='submit' value='MINUS'></form></body></html>" );
        }
        else if( req.url.indexOf( "minus?" ) >= 0 )
        {
            number--;
            res.writeHead( 200 );
            res.end( "<html><body>"+number+"<form action='plus' method='get'><input type='submit' value='PLUS'></form><form action='minus' method='get'><input type='submit' value='MINUS'></form></body></html>" );
        }
        else
        {
            // console.log( exp );
            res.writeHead( 404 );
            res.end( "Cannot find file: "+filename );
        }
    }
}

var server = http.createServer( server_fun );

server.listen( 8080 );

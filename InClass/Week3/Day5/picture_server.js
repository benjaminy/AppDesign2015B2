var fs   = require( 'fs' );
var http = require( 'http' );
var url_utils = require( './url_utils.js' );

var GRID_HEIGHT = 100, GRID_WIDTH = 200;

var pixels = [];

function serveFile( req, res )
{
    if( req.url === "/" || req.url === "/index.htm" )
    {
        req.url = "/index.html";
    }
    var filename = "./" + req.url;
    try {
        var contents = fs.readFileSync( filename ).toString();
        res.writeHead( 200 );
        res.end( contents );
        return true;
    }
    catch( exp ) {
        return false;
    }
}

function serveDynamic( req, res )
{
    var kvs = url_utils.getFormValuesFromURL( req.url );
    if( req.url.indexOf( "set_pixel?" ) >= 0 )
    {
        var i = parseInt( kvs.i );
        var j = parseInt( kvs.j );
        pixels[ i ][ j ] = kvs.c;
        res.writeHead( 200 );
        res.end( "" );
        console.log( "Set pixel ("+i+","+j+") to "+kvs.c );
    }
    else if( req.url.indexOf( "get_pixels" ) >= 0 )
    {
        res.writeHead( 200 );
        res.end( JSON.stringify( pixels ) );
    }
    else
    {
        res.writeHead( 404 );
        res.end( "Unknown URL: "+req.url );
    }
}

function serverFun( req, res )
{
    console.log( "The URL: '", req.url, "'" );
    var file_worked = serveFile( req, res );
    if( file_worked )
        return;

    serveDynamic( req, res );
}

function init()
{
    for( var i = 0; i < GRID_HEIGHT; i++ )
    {
        var row = [];
        pixels.push( row );
        for( var j = 0; j < GRID_WIDTH; j++ )
        {
            row.push( "white" );
        }
    }

    var server = http.createServer( serverFun );

    server.listen( 8080 );
}

init();

var fs    = require( 'fs' );
var http  = require( 'http' );
var utils = require( './url_utils.js' );

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
    var kvs = utils.getFormValuesFromURL( req.url );
    if( false )
    {
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
    var cookies = utils.parseCookies( req.headers );

    var session_id = '';
    if( 'session_id' in cookies )
    {
        session_id = cookies.session_id;
    }
    else
    {
        session_id = "" + utils.randomInt( 1, 10000 );
    }
    res.setHeader( "Set-Cookie",
                   [ "session_id=" + session_id,
                     "another_cookie=another_value" ] );
    var file_worked = serveFile( req, res );
    if( file_worked )
        return;

    serveDynamic( req, res );
}

function init()
{
    var server = http.createServer( serverFun );

    server.listen( 8080 );
}

init();

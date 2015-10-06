var fs = require( 'fs' );
var http = require( 'http' );
var sql = require( 'sqlite3' ).verbose();

function getFormValuesFromURL( url )
{
    var kvs = {};
    var parts = url.split( "?" );
    var key_value_pairs = parts[1].split( "&" );
    for( var i = 0; i < key_value_pairs.length; i++ )
    {
        var key_value = key_value_pairs[i].split( "=" );
        kvs[ key_value[0] ] = key_value[1];
    }
    return kvs
}

function addStudent( req, res )
{
    var kvs = getFormValuesFromURL( req.url );
    var db = new sql.Database( 'registrar.sqlite' );
    var name = kvs[ 'name' ];
    var sandwich = kvs[ 'sandwich' ];
    db.run( "INSERT INTO Students(Name, SandwichPreference) VALUES ( ?, ? )", name, sandwich,
            function( err ) {
                if( err === null )
                {
                    res.writeHead( 200 );
                    res.end( "Added student" );
                }
                else
                {
                    console.log( err );
                    res.writeHead( 200 );
                    res.end( "FAILED" );
                }
            } );
}

function serve_file( req, res )
{
    var filename = "./" + req.url;
    try {
        var contents = fs.readFileSync( filename ).toString();
        res.writeHead( 200 );
        res.end( contents );
        return true;
    }
    catch {
        return false;
    }
}

function serve_dynamic( req, res )
{
    if( req.url.indexOf( "add_student?" ) >= 0 )
    {
        addStudent( req, res );
    }
    else
    {
        // console.log( exp );
        res.writeHead( 404 );
        res.end( "Cannot find file: "+filename );
    }
}

function server_fun( req, res )
{
    console.log( "The URL: '", req.url, "'" );
    if( req.url === "/" || req.url === "/index.htm" )
    {
        req.url = "/index.html";
    }
    var file_worked = serve_file( req, res );
    if( file_worked )
        return;

    serve_dynamic( req, res );
}

var server = http.createServer( server_fun );

server.listen( 8080 );

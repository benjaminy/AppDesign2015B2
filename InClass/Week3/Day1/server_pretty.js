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
        if( req.url.indexOf( "get_performer_info?" ) >= 0 )
        {
            var kvs = getFormValuesFromURL( req.url );
            var db = new sql.Database( 'telluride.sqlite' );
            console.log( kvs['perf_id'] );
            db.all( "SELECT * FROM Performers WHERE Name = ?",
                    kvs['perf_id'],
            // db.all( "SELECT * FROM Performers",
                    function( err, rows ) {
                        if( err )
                        {
                            res.writeHead( 200 );
                            res.end( "ERROR: " + err );
                        }
                        else
                        {
                            res.writeHead( 200 );
                            var response_text = "<html><body>"+rows.length+"<table><tbody>";
                            for( var i = 0; i < rows.length; i++ )
                            {
                                response_text += "<tr><td>" + rows[i].Name +
                                    "</td><td>"+rows[i].GroupSize+"</td></tr>";
                            }
                            response_text += "</tbody></table></body></html>";
                            res.end( response_text );
                        }
                    } );
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

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
    // console.log( kvs );
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
        // console.log( "huh?", req.url.indexOf( "second_form?" ) );
        if( req.url.indexOf( "add_student?" ) >= 0 )
        {
            var kvs = getFormValuesFromURL( req.url );
            var db = new sql.Database( 'first_db.sqlite' );
            var values = "('";
            values += kvs['student_name'] + "',";
            values += kvs['student_id'] + ",";
            values += kvs['birth_year'] + ",";
            values += kvs['birth_month'] + ",";
            values += kvs['birth_day'] + ")";
            console.log( values );
            db.run( "INSERT INTO Students (Name, ID, BirthYear, BirthMonth, BirthDay) VALUES "+values,
                    function( err ) {
                        res.writeHead( 200 );
                        res.end( "You added a student!!!!! " + err );
                    } );
        }
        else if( req.url.indexOf( "first_form?" ) >= 0 )
        {
            var kvs = getFormValuesFromURL( req.url );
            var db = new sql.Database( 'first_db.sqlite' );

            db.all( "SELECT * FROM Students",
                function( err, rows ) {
                    res.writeHead( 200 );
                    resp_text = "";
                    for( var i = 0; i < rows.length; i++ )
                    {
                        resp_text += rows[i].Name;
                    }
                    res.end( "You submitted the first form!!!!! " + resp_text );
                    console.log( row );
                } );
        }
        else if( req.url.indexOf( "second_form?" ) >= 0 )
        {
            var kvs = getFormValuesFromURL( req.url );
            res.writeHead( 200 );
            res.end( "You submitted the second form!!!!!" );
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

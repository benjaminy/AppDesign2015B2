var fs   = require( 'fs' );
var http = require( 'http' );
var sql  = require( 'sqlite3' );

function getFormValuesFromURL( url )
{
    var kvs = {};
    var parts = url.split( "?" );
    if( parts.length === 2 )
    {
        var key_value_pairs = parts[1].split( "&" );
        for( var i = 0; i < key_value_pairs.length; i++ )
        {
            var key_value = key_value_pairs[i].split( "=" );
            kvs[ key_value[0] ] = key_value[1];
        }
    }
    return kvs
}

function addSomething( req, res, db, table_name, col_name, value )
{
    db.run( "INSERT INTO "+table_name+"("+col_name+") VALUES ( ? )", value,
            function( err ) {
                if( err === null )
                {
                    res.writeHead( 200 );
                    res.end( "Added something to table: "+table_name );
                }
                else
                {
                    console.log( err );
                    res.writeHead( 200 );
                    res.end( "FAILED" );
                }
            } );
}

function addStudent( req, res, kvs, db )
{
    var name = kvs[ 'name' ];
    var sandwich = kvs[ 'sandwich' ];
    /* DROPPING THE SANDWICH ON THE FLOOR!!!!! */
    addSomething( req, res, db, "Students", "Name", name );
}

function addTeacher( req, res, kvs, db )
{
    var name = kvs[ 'name' ];
    addSomething( req, res, db, "Teachers", "Name", name );
}

function addClass( req, res, kvs, db )
{
    var name = kvs[ 'name' ];
    addSomething( req, res, db, "Courses", "Name", name );
}

function addEnrollment( req, res, kvs, db )
{
    var sid_str = kvs[ 'sid' ];
    var cid_str = kvs[ 'cid' ];
    try {
        var sid = parseInt( sid_str );
        var cid = parseInt( cid_str );
    }
    catch( exp ) {
        // ...
        return;
    }
    db.run( "INSERT INTO Enrollments( student, class ) VALUES ( ?, ? )", sid, cid,
            function( err ) {
                if( err === null )
                {
                    res.writeHead( 200 );
                    res.end( "Added something to table: Enrillments" );
                }
                else
                {
                    console.log( err );
                    res.writeHead( 200 );
                    res.end( "FAILED" );
                }
            } );
}

function serveFile( req, res )
{
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

function addEnrollmentForm( res, req, db )
{
    var response_text = "<html><body><form> ...";


    var response_text += " ...</form></body></html>";
}

function serveDynamic( req, res )
{
    var kvs = getFormValuesFromURL( req.url );
    var db = new sql.Database( 'registrar.sqlite' );
    if( req.url.indexOf( "add_student?" ) >= 0 )
    {
        addStudent( req, res, kvs, db );
    }
    else if( req.url.indexOf( "add_teacher?" ) >= 0 )
    {
        addTeacher( req, res, kvs, db );
    }
    else if( req.url.indexOf( "add_class?" ) >= 0 )
    {
        addClass( req, res, kvs, db );
    }
    else if( req.url.indexOf( "add_enrollment?" ) >= 0 )
    {
        addEnrollment( req, res, kvs, db );
    }
    else if( req.url.indexOf( "add_enrollment_form" ) >= 0 )
    {
        addEnrollmentForm( req, res, db );
    }
    else if( req.url.indexOf( "add_teaching_assignment?" ) >= 0 )
    {
        addTeachingAssignment( req, res, kvs, db );
    }
    else
    {
        // console.log( exp );
        res.writeHead( 404 );
        res.end( "Unknown URL: "+req.url );
    }
}

function server_fun( req, res )
{
    console.log( "The URL: '", req.url, "'" );
    if( req.url === "/" || req.url === "/index.htm" )
    {
        req.url = "/index.html";
    }
    var file_worked = serveFile( req, res );
    if( file_worked )
        return;

    serveDynamic( req, res );
}

var server = http.createServer( server_fun );

server.listen( 8080 );

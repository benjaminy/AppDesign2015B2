var http = require( 'http' );
var fs   = require( 'fs' );

function download( url, dest, callback )
{
    console.log( "Start downloading!!" );
    var file = fs.createWriteStream( dest );

    var request = http.get( url, function( response ) {
        // console.log( "response??? ", response );
        console.log( "response??? " );
        file.on( 'finish', function() {
            console.log( "Finished writing!" );
        } );
        response.pipe( file );
    } );

    // Not temporally after the "get" is done!!!!!!!!

    request.on( 'error', function( err ) {
        console.log( "Error!!!", err );
    } );

    console.log( "Sent request" );
}

// download( "http://cs.coloradocollege.edu/index.html", "cs.html", null );
download( "http://cs.coloradocolege.edu/index.html", "cs.html", null );

console.log( "Done?" );

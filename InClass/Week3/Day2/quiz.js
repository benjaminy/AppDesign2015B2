// Corrections:
// 1. toString should be toString()  (This one was an unintentional typo)
// 2. fs library might not be installed
// 3. filenames or j parameters could be bad
// 4. Reading file could fail
// 5. Line endings might be wrong
// 6. File index could be bad

// Original version:
// var fs = require( "fs" );
// function get_ith_line_of_jth_file( filenames, i, j )
// {
//     return fs.readFileSync( filenames[j] ).toString.split( "\n" )[ i ];
// }

// With corrections:
function die( msg )
{
    console.log( msg );
    process.exit( 1 );
}

try {
    var fs = require( "fs" );
}
catch( exp ) {
    die( "No fs library installed" );
}

/*
 * Param filenames: Array of strings
 * Param i: integer
 * Param j: integer, >=0 < filenames.length
 */
function get_ith_line_of_jth_file( filenames, i, j )
{
    try {
        var filename = filenames[j];
    }
    catch( exp ) {
        die( "Problem with filenames or j parameters" );
    }
    try {
        var contents_buffer = fs.readFileSync( filename );
    }
    catch( exp ) {
        die( "Problem reading file" );
    }
    var contents = contents_buffer.toString().split( "\n" );
    try {
        return contents[ i ];
    }
    catch( exp ) {
        die( "Indexing into file lines failed" );
    }
}


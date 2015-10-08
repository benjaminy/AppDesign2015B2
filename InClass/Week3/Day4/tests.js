var url_utils = require( './url_utils.js' );

console.log( url_utils );

var example1 = url_utils.getFormValuesFromURL( "/xyz?a=b" );
if( example1.a !== "b" )
    console.log( "Test Failed" );
else
    console.log( "Test Passed" );

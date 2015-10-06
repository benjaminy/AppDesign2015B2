var urlencode = require( 'urlencode' );

var s1 = "12%3A30";
var s2 = urlencode.decode( s1 );
var s3 = s1.split( '%3A' );

console.log( s1, s2, s3 );

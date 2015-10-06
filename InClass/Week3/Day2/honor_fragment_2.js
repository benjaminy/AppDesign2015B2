var t1 = "11:54 AM"
var t2 = "12:54 PM"
var t3 = "1:54 PM"
var t4 = "11:54 AM11:54 AM"

var pattern = /(\d+)\:(\d+)(.*)/;
// var pattern = /((\d+)+)\:(\d+)(.*)/;
// var pattern = /(\d+)\:(\d+)(.*)/g;

var m1 = t1.match( pattern );
var m2 = t2.match( pattern );
var m3 = t3.match( pattern );
var m4 = t4.match( pattern );

console.log( m1 );
console.log( m2 );
console.log( m3 );
console.log( m4 );

var hours1 = m1[ 1 ];
var mins1  = m1[ 2 ];
var ampm1  = m1[ 3 ];

var nhours1 = parseInt( m1[ 1 ] );
var nmins1  = parseInt( m1[ 2 ] );
var bam_not_pm1 = m1[ 3 ].indexOf( "AM" ) > -1;

var time1 = nhours1 * 60 + nmins1;
if( ( nhours !== 12 ) && !bam_not_pm1 )
{
    time1 += ( 60 * 12 );
}
if( ( nhours === 12 ) && bam_not_pm1 )
{
    time1 -= ( 60 * 12 );
}

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

function parseCookies( headers )
{
    var cookies = {};
    var hc = headers.cookie;
    console.log( 'cookies ', hc )
    hc && hc.split( ';' ).forEach(
        function( cookie )
        {
            var parts = cookie.split( '=' );
            cookies[ parts.shift().trim() ] =
                decodeURI( parts.join( '=' ) );
        } );

    return cookies;
}

/* return a random int in the range [ low, high ) */
function randomInt( low, high ) {
    return Math.floor(Math.random() * (high - low) + low );
}

exports.getFormValuesFromURL = getFormValuesFromURL;
exports.parseCookies         = parseCookies;
exports.randomInt            = randomInt;

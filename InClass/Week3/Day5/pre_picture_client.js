var color_picker = document.getElementById( 'color_picker' );
var the_grid     = document.getElementById( 'grid' );

var GRID_WIDTH = 200, GRID_HEIGHT = 100;

function pageLoaded()
{
    the_grid.most_recent_version = -1;
    for( var i = 0; i < GRID_HEIGHT; i++ )
    {
        var row_elem = document.createElement( 'tr' );
        for( var j = 0; j < GRID_WIDTH; j++ )
        {
            var cell_elem = document.createElement( 'td' );
            cell_elem.i_idx = i;
            cell_elem.j_idx = j;
            cell_elem.addEventListener( "mouseenter", mousePixel );
            row_elem.appendChild( cell_elem );
        }
        the_grid.appendChild( row_elem );
    }
    window.setTimeout( pollServer, 500, -1 );
}

function mousePixel( evt )
{
    if( evt.buttons > 0 )
    {
        // console.log( "mousePixel "+color_picker.value );
        var elem = evt.target;
        var color = color_picker.value
        elem.style.backgroundColor = color;
        var xhr = new XMLHttpRequest();
        xhr.open( "get", "set_pixel?i="+elem.i_idx+"&j="+elem.i_idx+"&c="+color, true );
        xhr.send();
    }
}

function pollServer( most_recent_version )
{
    var xhr = new XMLHttpRequest();
    xhr.open( "get", "get_pixels?v="+most_recent_version, true );
    xhr.addEventListener( "load", receivedPixels );
    xhr.send();
}

function receivedPixels( evt )
{
    var xhr = evt.target;
    pixel_data = json.parse( xhr.responseText );
    if( pixel_data.complete )
    {
        var d = pixel_data.pixels;
        for( var i = 0; i < GRID_HEIGHT; i++ )
        {
            var row_elem = the_grid.childNodes[ i ];
            for( var j = 0; j < GRID_WIDTH; j++ )
            {
                var cell_elem = row_elem.childNodes[ j ];
                cell_elem.style.backgroundColor = d[i][j];
            }
        }
    }
    else
    {
        var d = pixel_data.pixels;
        for( var p = 0; p < d.length; p++ )
        {
            the_grid.childNodes[ d[p].i ].childNodes[ d[p].j ].backgroundColor = d[p].c;
        }
    }
    window.setTimeout( pollServer, 500, pixel_data.version );
}

var color_picker = document.getElementById( 'color_picker' );
var the_grid     = document.getElementById( 'grid' );

var GRID_WIDTH  = 200;
var GRID_HEIGHT = 100;

function pageLoaded()
{
    for( var i = 0; i < GRID_HEIGHT; i++ )
    {
        var row_elem = document.createElement( 'tr' );
        for( var j = 0; j < GRID_WIDTH; j++ )
        {
            var cell_elem = document.createElement( 'td' );
            cell_elem.i = i;
            cell_elem.j = j;
            cell_elem.id = "i"+i+"j"+j;
            cell_elem.addEventListener( 'mouseenter', mousePixel );
            // cell_elem.mouseenter = mousePixel;
            row_elem.appendChild( cell_elem );
        }
        the_grid.appendChild( row_elem );
    }
    window.setTimeout( pollServer, 100, -1 );
}

function mousePixel( evt )
{
    if( evt.buttons > 0 )
    {
        var cell = evt.target;
        var color = color_picker.value;
        console.log( "mousePixel "+color );
        cell.style.backgroundColor = color;
        var xhr = new XMLHttpRequest();
        var url = "set_pixel?i=" + cell.i + "&j=" + cell.j + "&c=" + color.substring( 1 );
        xhr.open( "get", url, true );
        xhr.send();
    }
}

function pollServer( most_recent_version )
{
    var xhr = new XMLHttpRequest();
    xhr.open( "get", "get_pixels?v="+most_recent_version, true );
    xhr.addEventListener( "load", pixelResponse );
    xhr.send();
}

function pixelResponse( evt )
{
    var xhr = evt.target;
    // console.log( xhr.responseText );
    var pixel_data = JSON.parse( xhr.responseText );
    // console.log( pixel_data );
    if( pixel_data.complete )
    {
        var pixels = pixel_data.pixels;
        for( var i = 0; i < GRID_HEIGHT; i++ )
        {
            for( var j = 0; j < GRID_WIDTH; j++ )
            {
                var cell = document.getElementById( "i"+i+"j"+j );
                cell.style.backgroundColor = pixels[i][j];
            }
        }
    }
    else
    {
        var changes = pixel_data.changes;
        for( var p = 0; p < changes.length; p++ )
        {
            var change = changes[ p ]
            console.log( change );
            var cell = document.getElementById( "i"+change.i+"j"+change.j );
            cell.style.backgroundColor = p.c;
        }
    }
    window.setTimeout( pollServer, 100, pixel_data.version );
}

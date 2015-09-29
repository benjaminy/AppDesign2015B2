var dogs = [ 'dog01.jpeg', 'dog02.jpeg', 'dog03.jpeg', 'dog04.jpeg', 'dog05.jpg', 'dog06.jpg' ];
var content_elem = document.getElementById( 'content' );
var ROWS = 3;
var COLS = 4;

function getRandomInt( min, max )
{
    return Math.floor( Math.random() * ( max - min ) ) + min;
}

function pageLoaded()
{
    var secrets = [];
    for( var i = 0; i < dogs.length; i++ )
    {
        secrets.push( dogs[i] );
        secrets.push( dogs[i] );
    }
    content_elem.first_card = null;
    content_elem.match_count = 0;
    content_elem.paused = false;
    for( var r = 0; r < ROWS; r++ )
    {
        var row_elem = document.createElement( 'tr' );
        for( var c = 0; c < COLS; c++ )
        {
            var cell_elem = document.createElement( 'td' );
            var img_elem = document.createElement( 'img' );
            var random_idx = getRandomInt( 0, secrets.length );
            img_elem.showing_back = true;
            img_elem.secret = secrets.splice( random_idx, 1 )[ 0 ];
            img_elem.onclick = clickCard;
            img_elem.src = "Images/back.png";
            img_elem.style.width = "50px";
            cell_elem.appendChild( img_elem );
            row_elem.appendChild( cell_elem );
        }
        content_elem.appendChild( row_elem );
    }
}

function clickCard( evt )
{
    var img_elem = evt.target;
    var tbody_elem = img_elem.parentNode.parentNode.parentNode;
    if( tbody_elem.paused || !img_elem.showing_back )
    {
        /*  */
    }
    /* first click case */
    else if( tbody_elem.first_card === null )
    {
        img_elem.src = "Images/" + img_elem.secret;
        tbody_elem.first_card = img_elem;
        img_elem.showing_back = false;
    }
    /* second click case */
    else
    {
        /* Correct match */
        // console.log( tbody_elem.first_card.secret, "Images/" + img_elem.secret );
        if( tbody_elem.first_card.secret == img_elem.secret )
        {
            img_elem.src = "Images/" + img_elem.secret;
            img_elem.showing_back = false;
            tbody_elem.match_count++;
            if( tbody_elem.match_count > 5 )
            {
                alert( "Winning!" );
            }
            tbody_elem.first_card = null;
        }
        /* Incorrect match */
        else
        {
            img_elem.src = "Images/" + img_elem.secret;
            tbody_elem.paused = true;
            window.setTimeout( flipBack, 1000, img_elem, tbody_elem );
        }
    }
}

function flipBack( img_elem, tbody_elem )
{
    img_elem.src = "Images/back.png";
    tbody_elem.first_card.src = "Images/back.png";
    tbody_elem.first_card.showing_back = true;
    tbody_elem.first_card = null;
    tbody_elem.paused = false;
}

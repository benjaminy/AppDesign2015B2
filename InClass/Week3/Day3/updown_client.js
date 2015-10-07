function upDown( up_not_down )
{
    var xhr = new XMLHttpRequest();
    xhr.addEventListener( "load", onUpDownResponse );
    xhr.open( "get", "up_down?x="+up_not_down, true );
    xhr.send();
}

function onUpDownResponse( evt )
{
    var xhr = evt.target;
    console.log( "Response text: ", xhr.responseText );
}

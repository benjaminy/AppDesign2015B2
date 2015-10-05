var sql = require( 'sqlite3' );

var db = new sql.Database( 'telluride.sqlite' );

db.all( 'SELECT Performers.Name as PerfName, * '+
        'FROM Performances '+
            'JOIN Performers ON Performers.ID = Performances.PID '+
            'JOIN Stages ON Stages.ID = Performances.SID',
    function( err, rows ) {
        if( err !== null )
        {
            console.log( err );
            return;
        }
        for( var i = 0; i < rows.length; i++ )
        {
            if( rows[i].Capacity < rows[i].GroupSize )
            {
                console.log( rows[i].PerfName + " is too big for " + rows[i].Name );
            }
        }
        // console.log( rows );
        // console.log( rows.length );
    } );

var sql = require( 'sqlite3' );

var db = new sql.Database( 'telluride.sqlite' );

db.all( 'SELECT Performers.Name as PerfName, * '+
        'FROM Performances '+
            'JOIN Performers ON Performers.ID = Performances.PID '+
            'JOIN Stages ON Stages.ID = Performances.SID '+
        'WHERE Capacity < GroupSize',
    function( err, rows ) {
        if( err !== null )
        {
            console.log( err );
            return;
        }
        for( var i = 0; i < rows.length; i++ )
        {
            console.log( rows[i].PerfName + " is too big for " + rows[i].Name );
        }
        // console.log( rows );
        // console.log( rows.length );
    } );

db.all( 'SELECT Performers.Name as PerfName, * '+
        'FROM Performances '+
            'JOIN Performers ON Performers.ID = Performances.PID ',
    function( err, rows ) {
        if( err !== null )
        {
            console.log( err );
            return;
        }
        console.log( rows );
        var performances_per = {};
        for( var i = 0; i < rows.length; i++ )
        {
            if( rows[i].PID in performances_per )
            {
                performances_per[ rows[i].PID ]++;
            }
            else
            {
                performances_per[ rows[i].PID ] = 1;
            }
        }
        console.log( performances_per );
    } );

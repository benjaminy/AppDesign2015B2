var sql = require( 'sqlite3' );

var db = new sql.Database( 'telluride.sqlite' );

db.all( 'SELECT Performers.Name as PerfName, * '+
        'FROM Performances '+
            'JOIN Performers ON Performers.ID = Performances.PID '+
            'JOIN Stages ON Stages.ID = Performances.SID',
    function( err, rows ) {
        console.log( err );
        console.log( rows );
        console.log( rows.length );
    } );

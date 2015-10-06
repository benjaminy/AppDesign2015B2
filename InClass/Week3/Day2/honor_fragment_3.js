var sql = require( 'sqlite3' );

var db = new sql.Database( 'test2.sqlite' );

db.all( "SELECT * FROM TABLENAME", function( err, rows ) { console.log( err, rows ); } );

db.run( "INSERT INTO TABLENAME VALUES ( 'Goodbye' )",
        function( err ) {
            console.log( err );
        } );

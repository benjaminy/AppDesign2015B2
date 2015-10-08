var jsc = require( 'jsverify' );


var boolFnAppliedThrice =
  jsc.forall("bool -> bool", "bool", function (f, b) {
      return f(f(f(b))) === f(b);
  });

jsc.assert( boolFnAppliedThrice );


var sortIdempotent =
  jsc.forall("string -> nat", "array string", function (f, arr) {
    return _.isEqual(_.sortBy(_.sortBy(arr, f), f), _.sortBy(arr, f));
  });

jsc.assert(sortIdempotent);

var sortLengthEqual =
  jsc.forall("string -> nat", "array string", function (f, arr) {
    return _.isEqual(arr.length, _.sortBy(arr, f).length);
  });

jsc.assert(sortLength);


var sortLengthEqual =
  jsc.forall("string -> nat", "array string", function (f, arr) {
    return _.isNotEqual(arr, _.sortBy(arr, f));
  });

jsc.assert(sortLength);


var sortInOrder =
    jsc.forall("string -> nat", "array string", "nat", "nat", function (f, arr, idx1, idx2) {
        var sortedArr = _.sortBy(arr, f);
        if( idx1 < arr.length && idx2 < arr.length )
        {
            if( idx1 < idx2 ) {
                return sortedArr[idx1] <= sortedArr[idx2];
            }
            else {
                return sortedArr[idx1] >= sortedArr[idx2];
            }
        }
  });

jsc.assert(sortInOrder);


var sortSameElems =
    jsc.forall("string -> nat", "array string", "string", function (f, arr, val) {
        var sortedArr = _.sortBy(arr, f);
        if( val in arr )
        {
            return val in sortedArr;
        }
        else
        {
            return not( val in sortedArray );
        }
  });

jsc.assert(sortInOrder);

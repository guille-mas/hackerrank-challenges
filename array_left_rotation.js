;(()=>{
    "use strict";

    function rotateToLeft(arr,d){
        d = d >= arr.length ? d%arr.length : d;
        while(d>0){
            arr.push(arr.shift());
            d--;
        }
        console.log(arr.join(' '));
    }

    var a = [1,2];
    rotateToLeft(a,2);

})();
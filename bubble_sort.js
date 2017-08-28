/**
 * See https://www.hackerrank.com/challenges/ctci-bubble-sort
 */
let Solver = (()=>{
    "use strict";

    function solver (){}

    var swapsCounter = 0;
    var data = [];

    solver.prototype.solve = function(arr){
        swapsCounter = 0;
        data = arr || [];
        bubbleSort();
        console.log("Array is sorted in "+swapsCounter+" swaps.");
        console.log("First Element: "+data[0]);
        console.log("Last Element: "+data[data.length-1]);
    };

    var bubbleSort = function(){
        for (let i = 0; i < data.length; i++) {
            // Track number of elements swapped during a single array traversal
            let numberOfSwaps = 0;

            for (let j = 0; j < data.length - 1; j++) {
                // Swap adjacent elements if they are in decreasing order
                if (data[j] > data[j + 1]) {
                    swap(j, j + 1);
                    numberOfSwaps++;
                    swapsCounter++;
                }
            }

            // If no elements were swapped during a traversal, array is sorted
            if (numberOfSwaps == 0) {
                break;
            }
        }
    };

    var swap = function(idx1, idx2){
        let tmp = data[idx1];
        data[idx1] = data[idx2];
        data[idx2] = tmp;
    };

    return solver;
})();



//-----------------------TEST BELOW------------------------

(new Solver()).solve([3,2,1]);
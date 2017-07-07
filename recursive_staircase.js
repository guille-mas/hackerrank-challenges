/**
 * For this solution to be efficient, we need to memorize lower results to avoid computing them again
 * memo is an array where all results for every operand is stored for that purpose
 */
let solution = (()=>{
    "use strict";
    var memo = [];

    function findWaysToClimb(sHeight){
        if(sHeight > 2){

            if(typeof memo[sHeight] == 'undefined'){
                if(typeof memo[sHeight-1] == 'undefined'){
                    memo[sHeight-1] = findWaysToClimb(sHeight-1);
                }
                if(typeof memo[sHeight-2] == 'undefined'){
                    memo[sHeight-2] = findWaysToClimb(sHeight-2);
                }
                if(typeof memo[sHeight-3] == 'undefined'){
                    memo[sHeight-3] = findWaysToClimb(sHeight-3);
                }
                memo[sHeight] = memo[sHeight-1] + memo[sHeight-2] + memo[sHeight-3];
            }

            return memo[sHeight];

        }else if(sHeight > 1){

            if(typeof memo[sHeight] == 'undefined'){
                if(typeof memo[sHeight-1] == 'undefined'){
                    memo[sHeight-1] = findWaysToClimb(sHeight-1);
                }
                if(typeof memo[sHeight-2] == 'undefined'){
                    memo[sHeight-2] = findWaysToClimb(sHeight-2);
                }
                memo[sHeight] = memo[sHeight-1] + memo[sHeight-2];
            }

            return memo[sHeight];

        }else if(sHeight > 0){

            if(typeof memo[sHeight] == 'undefined'){
                if(typeof memo[sHeight-1] == 'undefined'){
                    memo[sHeight-1] = findWaysToClimb(sHeight-1);
                }
                memo[sHeight] = memo[sHeight-1];
            }

            return memo[sHeight];

        }else if(sHeight == 0){

            return 1;

        }else{

            return 0;

        }
    }

    function solve(sHeight){
        if(typeof memo[sHeight] == 'undefined'){
            memo[sHeight] = findWaysToClimb(sHeight);
        }
        return memo[sHeight];
    }

    return solve;
})();


console.log(solution(10));
console.log(solution(20));
console.log(solution(360));


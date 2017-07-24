let solve = (()=>{
    "use strict";

    function solve(money,coins,memo=[],memoKey=0) {
        if(memo[memoKey] !== undefined){
            // we want to avoid counting twice
            // two different diffs with the same
            // operands in distinct order
            // eg: money-4-1-1-2 and money-4-1-2-1
            // so we are only counting each unique set of operands once
            memo[memoKey] = false;
            return 0;
        } else if(money < 0) {
            return 0;
        }else if(money > 0) {
            memo[memoKey] = 0;
            for(let i=0; i < coins.length; i++) {
                let iMemoKey = memoKey + Math.pow(10, i);
                let diff = money - coins[i];
                if(diff >= 0){
                    memo[memoKey] += solve(diff, coins, memo, iMemoKey);
                }
            }
            return memo[memoKey];
        }else {
            memo[memoKey] = 1;
            return 1;
        }
    }

    return solve;
})();


/*
console.log(solve(10, '2 5 3 6'.split(' ').map(Number))); // should be 5
console.assert(solve(10, '2 5 3 6'.split(' ').map(Number)) == 5);

console.log(solve(4, '1 2 3'.split(' ').map(Number))); // should be 4
console.assert(solve(4, '1 2 3'.split(' ').map(Number)) == 4);
*/

// console.log(solve(91,'1 2 3 4 5 6 7 8 9 10 20'.split(' ').map(Number)));

// console.log(solve(250, Array.apply(null, {length: 50}).map(Function.call, Number).map((item)=> { return item+1 }) ));

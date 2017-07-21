let solve = (()=> {
    "use strict";

    let sortNumbers = (a, b) => {
        return b-a;
    };

    let appendOperand = (operands,coin) => {
        let newOperandsString = operands + '-' + Number(coin).toString();
        newOperandsString= newOperandsString.split('-');
        newOperandsString = newOperandsString.map(Number);
        newOperandsString = newOperandsString.sort(sortNumbers);
        newOperandsString = newOperandsString.join('-');
        return newOperandsString;
    };

    let recursiveSolution = (money, coins, operands, memo) => {
        if(typeof memo[operands] == 'undefined') {
            if(money === 0){
                memo[operands] = 1;
            }else if(money < 0){
                memo[operands] = 0;
            }else{
                let ways = 0;
                for(let i=0;i<coins.length;i++){
                    let result = recursiveSolution(money-coins[i] , coins, appendOperand(operands,coins[i]), memo);
                    if(result > 0){
                        ways += result;
                    }
                }

                memo[operands] = ways;
            }
        }else{
            if(money >= 0){
                if(typeof memo[operands] != 'undefined'){
                    return 0;
                }
            }
        }
        return memo[operands];
    };

    let solve = (money,coins) => {
        // memorize the amount of solutions per diff
        // the key is a string representation of the operations
        // eg '4-2-1-1'
        let memo = {};
        let result = recursiveSolution(money,coins,Number(money).toString(),memo);
        return result;
    }

    return solve;
})();


console.log(solve(10, '2 5 3 6'.split(' ').map(Number)));


let Solver = (()=>{
    "use strict";

    function Solver() {}

    Solver.prototype.recursiveSolution = function(money, memoKey) {
        if(typeof this.memo[memoKey] == 'undefined'){
            if(money == 0) {
                this.memo[memoKey] = 1;
            }else{
                this.memo[memoKey] = 0;
                for(let i=0; i<this.COINS_LEN;i++){
                    if(money-this.COINS[i] >= 0){
                        this.memo[memoKey] += this.recursiveSolution(money-this.COINS[i] , memoKey + Math.pow(10, i));
                    }
                }
            }
            return this.memo[memoKey];
        }else{
            // we want to avoid counting twice
            // two different diffs with the same
            // operands in distinct order
            // so we are only counting each unique set of operands once
            return 0;
        }
    };

    Solver.prototype.solve = function(money,coinsArr) {

        Object.defineProperty(this, 'money', {
            value: money,
            writable: false,
            configurable: false,
            enumerable: false
        });

        Object.defineProperty(this, 'COINS', {
            value: coinsArr,
            writable: false,
            configurable: false,
            enumerable: true
        });

        Object.defineProperty(this, 'COINS_LEN', {
            value: this.COINS.length,
            writable: false,
            configurable: false,
            enumerable: false
        });

        Object.defineProperty(this, 'memo', {
            value: [],
            writable: true,
            configurable: false,
            enumerable: false
        });

        return this.recursiveSolution(this.money,0);
    };


    return Solver;
})();


// console.log(solve(10, '2 5 3 6'.split(' ').map(Number))); // should be 5
// console.assert(solve(10, '2 5 3 6'.split(' ').map(Number)) == 5);

// console.log(solve(4, '1 2 3'.split(' ').map(Number))); // should be 4
// console.assert(solve(4, '1 2 3'.split(' ').map(Number)) == 4);
let s = new Solver();
console.log(s.solve(92,'1 2 3 4 5 6 7 8 9 10 20'.split(' ').map(Number)));


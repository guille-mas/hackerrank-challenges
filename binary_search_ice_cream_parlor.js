/**
 * See https://www.hackerrank.com/challenges/ctci-ice-cream-parlor
 * The binary search is not required to solve this challenge
 * A HashTable would be more efficient
 * But the challenge requires to use binary search to solve it
 * So, for the sake of training binary search, Let's do so.
 */
let Solution = (()=>{
    "use strict";
    function Solver(){
        this.sortedPrices;
        this.prices;
    }

    let sortIntegersInAscendingOrder = function(a, b){
        return a-b
    };


    Solver.prototype.binarySearch = function(amount){
        let left = 0;
        let right = this.sortedPrices.length - 1;

        while(left <= right){
            let mid = Math.floor(left + (right - left) / 2);
            if(this.sortedPrices[mid] === amount){
                return this.sortedPrices[mid];
            }else if(this.sortedPrices[mid] < amount){
                left = mid + 1;
            }else{
                right = mid - 1;
            }
        }
        return false;
    };


    Solver.prototype.solve = function(money,prices){
        this.prices = prices;
        this.sortedPrices = prices.slice().sort(sortIntegersInAscendingOrder);

        let increaseByOne = function(item){
            return item+1;
        };

        for(let i in prices) {
            let i1,i2, price1, price2;
            price1 = prices[i];
            let diff = money - price1;
            i1 = Number(i);

            if(diff > 0){
                price2 = this.binarySearch(diff);
                if(price2){
                    i2 = price1 == price2 ? prices.indexOf(price2,i1+1) : prices.indexOf(price2);
                    if(i2 > 0 && i1 != i2){
                        return [i1,i2].sort(sortIntegersInAscendingOrder).map(increaseByOne).join(' ');
                    }
                }
            }
        }
    };

    return Solver;
})();

let s = new Solution();

var input = require("fs")
    .readFileSync("./tests/binary_search_ice_cream_parlor_test_1.txt", "utf-8")
    .split("\n");

var results = require("fs")
    .readFileSync("./tests/binary_search_ice_cream_parlor_test_1_results.txt", "utf-8")
    .split("\n");

let i2 = 0;
for(let i=1; i<input.length; i+=3){
    let money = Number(input[i]);
    let pricesArr = input[i+2].split(' ').map(Number);
    let solution = s.solve(money,pricesArr);
    console.assert(solution == results[i2], solution+' != '+results[i2]);
    i2++;
}

console.log('All tests passed!');
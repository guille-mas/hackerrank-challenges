let MinHeap = (()=>{
    "use strict";

    var that;

    function MinHeap(){
        this.data = [];
        that = this;
    }

    /**
     * Add an element and print the medium item on a new line
     * @param item
     */
    MinHeap.prototype.add = function(item){
        // push element to next empty position
        this.data.push(item);
        // bubble up the element until finding its place
        bubbleUp(this.data.length-1);
    };

    /**
     * Remove and return the minimum element
    MinHeap.prototype.poll = function(){};
    */

    /**
     * Return the minimum element
    MinHeap.prototype.peek = function(){};
    */

    MinHeap.prototype.getMiddle = function(){
        if(this.data.length%2 === 0){
            var idx1 = this.data.length/2-1;
            var idx2 = this.data.length/2;
            return (( this.data[idx1] + this.data[idx2] ) / 2).toFixed(1);
        }else{
            return this.data[Number.parseInt(this.data.length/2)].toFixed(1);
        }
    };

    /**
     * Given two indexes, swap the elements on those positions
     * @param idx1
     * @param idx2
     */
    var swapItems = function(idx1, idx2){
        var tmp = that.data[idx1];
        that.data[idx1] = that.data[idx2];
        that.data[idx2] = tmp;
    };

    /**
     * Given an index, return the parent index
     * @param index
     */
    var getParentIdx = function(index){
        return Number.parseInt(Math.round((index-1)/2));
    };

    /**
     * Given an index, return the left child index
     * @param index
    var getLeftChildIdx = function(index){
        return Number.parseInt(2*index + 1);
    };
    */


    /**
     * Given an index, return the right child index
     * @param index
    var getRightChildIdx = function(index){
        return Number.parseInt(2*index + 2);
    };
    */

    /**
     * Given an index, bubble up the item on that position
     * til we find its place on the heap
     * @param idx
     */
    var bubbleUp = function(idx){
        let parentIdx = getParentIdx(idx);
        if(parentIdx < 0 || idx === 0){
            return;
        }else if(that.data[idx] < that.data[parentIdx]){
            swapItems(idx,parentIdx);
            bubbleUp(parentIdx);
        }
    };

    return MinHeap;
})();



// test
var h = new MinHeap();

h.add(12);
// [12]
console.assert(parseFloat(h.getMiddle()),12.0);
console.log(h.getMiddle(), parseFloat(h.getMiddle()));

h.add(4);
// [4,12]
console.assert(h.getMiddle(),8.0);
console.log(h.getMiddle(), parseFloat(h.getMiddle()));

h.add(5);
// [4,5,12]
console.assert(h.getMiddle(),5.0);
console.log(h.getMiddle(), parseFloat(h.getMiddle()));

h.add(3);
// [3,4,5,12]
console.assert(h.getMiddle(),4.5);
console.log(h.getMiddle(), parseFloat(h.getMiddle()));

h.add(8);
// [3,4,5,8,12]
console.assert(h.getMiddle(),5.0);
console.log(h.getMiddle(), parseFloat(h.getMiddle()));

h.add(7);
// [3,4,5,7,8,12]
console.assert(h.getMiddle(),6.0);
console.log(h.getMiddle(), parseFloat(h.getMiddle()));



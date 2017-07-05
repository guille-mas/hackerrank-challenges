let Solution = (()=>{
    "use strict";

    class AbstractHeap {
        
        constructor() {
            this.data = [];
        }

        item(idx){
            return this.data[idx];
        }

        add(item) {
            // push element to next empty position
            this.data.push(item);
            // bubble up the element until finding its place
            this._bubbleUp(this.count-1);
        }

        poll() {
            let removedItem;
            if(this.data.length <= 1){
                removedItem = this.data[0] || null;
                this.data = [];
            }else{
                // remove item from root;
                removedItem = this.data.shift();
                // replace root by last added item
                this.data.unshift(this.data.pop());
                // bubble the root down until finding its place
                this._bubbleDown(0);
            }

            return removedItem;
        }

        get peek() {
            return this.data[0];
        }

        isEmpty() {
            return this.data.length === 0;
        }

        get count() {
            return this.data.length;
        }

        /**
         * Given two indexes, swap the elements on those positions
         * @param idx1
         * @param idx2
         */
        _swapItems(idx1, idx2) {
            var tmp = this.data[idx1];
            this.data[idx1] = this.data[idx2];
            this.data[idx2] = tmp;
        }

        /**
         * Given an index, return the parent index
         * @testOk
         * @param index
         */
        _getParentIdx(index) {
            return Number.parseInt(Math.floor((index-1)/2));
        }

        /**
         * Given an index, return the left child index
         * @testOk
         * @param index
         */
        _getLeftChildIdx(index) {
            return Number.parseInt(Math.floor(2*index+1));
        }

        /**
         * Given an index, return the right child index
         * @testOk
         * @param index
         */
        _getRightChildIdx(index) {
            return Number.parseInt(Math.floor(2*index+2));
        }

        _hasLeftChild(idx) {
            return typeof this.item(this._getLeftChildIdx(idx)) == 'number';
        }

        _hasRightChild(idx) {
            return typeof this.item(this._getRightChildIdx(idx)) == 'number';
        }

        /**
         * Given an index, bubble up the item on that position
         * til we find its place on the heap
         * @param idx
         */
        _bubbleUp(idx) {
            let parentIdx = this._getParentIdx(idx);
            if(parentIdx >= 0
                && this._compareItems(this.item(idx) , this.item(parentIdx))) {
                this._swapItems(idx,parentIdx);
                this._bubbleUp(parentIdx);
            }
        }
    }


    class MinHeap extends AbstractHeap {
        _compareItems(item1, item2){
            return item1 < item2;
        }

        /**
         * Given an index, bubble down the item on that
         * position til we find its place on the heap
         * @param idx
         */
        _bubbleDown() {
            let index = 0;
            while(this._hasLeftChild(index)) {
                let smallerChildIndex = this._getLeftChildIdx(index);

                if( this._hasRightChild(index)
                        && this.item(this._getRightChildIdx(index)) < this.item(this._getLeftChildIdx(index))
                ) {
                    smallerChildIndex = this._getRightChildIdx(index);
                }

                if(this.item(index) < this.item(smallerChildIndex)) {
                    break;
                }
                else {
                    this._swapItems(index,smallerChildIndex);
                }
                index = smallerChildIndex;
            }
        }


    }




    class MaxHeap extends AbstractHeap {
        _compareItems(item1, item2){
            return item1 > item2;
        }

        /**
         * Given an index, bubble down the item on that
         * position til we find its place on the heap
         * @param idx
         */
        _bubbleDown() {
            let index = 0;
            while(this._hasLeftChild(index)) {
                let smallerChildIndex = this._getLeftChildIdx(index);

                if( this._hasRightChild(index)
                    && this.item(this._getRightChildIdx(index)) > this.item(this._getLeftChildIdx(index))
                ) {
                    smallerChildIndex = this._getRightChildIdx(index);
                }

                if(this.item(index) > this.item(smallerChildIndex)) {
                    break;
                }
                else {
                    this._swapItems(index,smallerChildIndex);
                }
                index = smallerChildIndex;
            }
        }
    }


    /**
     * Solution
     * @constructor
     */
    class Solution {
        constructor(){
            this.minHeap = new MinHeap();
            this.maxHeap = new MaxHeap();
        }

        getMiddle() {
            let middle;
            if(this.minHeap.count === this.maxHeap.count){
                let highestMin = this.maxHeap.peek;
                let lowestMax = this.minHeap.peek;
                middle = (highestMin+lowestMax) / 2;
            }else if(this.minHeap.count > this.maxHeap.count){
                middle = this.minHeap.peek;
            }else if(this.minHeap.count < this.maxHeap.count){
                middle = this.maxHeap.peek;
            }
            return middle.toFixed(1);
        }

        rebalanceHeaps() {
            if (this.minHeap.count < this.maxHeap.count) {
                this.minHeap.add(this.maxHeap.poll());
            } else {
                this.maxHeap.add(this.minHeap.poll());
            }
        }

        add(item) {
            if(this.minHeap.count === 0 || item < this.maxHeap.peek){
                this.maxHeap.add(item);
            }else{
                this.minHeap.add(item);
            }

            if(Math.abs(this.minHeap.count - this.maxHeap.count) > 1){
                this.rebalanceHeaps();
            }
        }

    }

    return Solution;
})();


/////////////// ignore above this line ////////////////////


let test0 = (() => {

    var input = require("fs")
            .readFileSync("./tests/heaps_find_the_running_median_test_1.txt", "utf-8")
            .split("\n");

    var results = require("fs")
            .readFileSync("./tests/heaps_find_the_running_median_test_1_results.txt", "utf-8")
            .split("\n");

    var s = new Solution();
    var n = input.shift();

    for(var a_i = 0; a_i < n; a_i++){
        s.add(Number(input[a_i]));

        try {
            console.assert(s.getMiddle() == results[a_i], 'at position '+a_i+': '+s.getMiddle() +' != '+ results[a_i]);
        }catch(e){
            console.log(e.message);
            console.log(s.getMiddle(), results[a_i]);
            break;
        }
    }
})();


let test1 = (() => {

    var input = require("fs")
        .readFileSync("./tests/heaps_find_the_running_median_test_1.txt", "utf-8")
        .split("\n");

    var results = require("fs")
        .readFileSync("./tests/heaps_find_the_running_median_test_1_results.txt", "utf-8")
        .split("\n");

    var s = new Solution();
    var n = input.shift();



    for(var a_i = 0; a_i < n; a_i++){
        s.maxHeap.add(Number(input[a_i]));
        s.minHeap.add(Number(input[a_i]));
    }

    // testing add()
    var tmp = s.minHeap.peek;
    for(var i = 1; i< s.minHeap.count; i++){
        if(s.minHeap.data[i] < tmp){
            throw new Error(s.minHeap.data[i]+' < '+tmp);
        }
    }
    tmp = s.maxHeap.peek;
    for(var i = 1; i< s.maxHeap.count; i++){
        if(s.maxHeap.data[i] > tmp){
            throw new Error(s.maxHeap.data[i]+' > '+tmp);
        }
    }

    // testing poll() on minHeap
    s.minHeap.poll();
    s.minHeap.poll();
    s.minHeap.poll();
    s.minHeap.poll();
    s.minHeap.poll();
    s.minHeap.poll();
    s.minHeap.add(999999);
    s.minHeap.poll();
    s.minHeap.add(271);
    s.minHeap.poll();
    s.minHeap.poll();
    s.minHeap.poll();
    s.minHeap.poll();
    console.log(s.minHeap.peek);
    tmp = s.minHeap.peek;
    for(var i = 1; i< s.minHeap.count; i++){
        if(s.minHeap.data[i] < tmp){
            throw new Error(s.minHeap.data[i]+' < '+tmp);
        }
    }



    // testing poll() on maxHeap
    s.maxHeap.poll();
    s.maxHeap.poll();
    s.maxHeap.poll();
    s.maxHeap.poll();
    s.maxHeap.poll();
    s.maxHeap.poll();
    s.maxHeap.add(1);
    s.maxHeap.poll();
    s.maxHeap.add(99999);
    s.maxHeap.poll();
    s.maxHeap.poll();
    s.maxHeap.poll();
    s.maxHeap.poll();
    console.log(s.maxHeap.peek);
    tmp = s.maxHeap.peek;
    for(var i = 1; i< s.maxHeap.count; i++){
        if(s.maxHeap.item(i) > tmp){
            throw new Error(s.maxHeap.item(i)+' > '+tmp+' at i = '+i);
        }
    }

})();







let test2 = (() => {

    var s = new Solution();

    s.minHeap.add(50);
    console.log('add(50)');
    console.log([50]);
    console.log(s.minHeap.data);

    s.minHeap.add(10);
    console.log('add(10)');
    console.log([10,50]);
    console.log(s.minHeap.data);

    s.minHeap.add(15);
    console.log('add(15)');
    console.log([10,50,15]);
    console.log(s.minHeap.data);

    s.minHeap.add(8);
    console.log('add(8)');
    console.log([8,10,15,50]);
    console.log(s.minHeap.data);

    s.minHeap.add(25);
    console.log('add(25)');
    console.log([8,10,15,50,25]);
    console.log(s.minHeap.data);

    s.minHeap.add(10);
    console.log('add(10)');
    console.log([8,10,10,50,25,15]);
    console.log(s.minHeap.data);

    s.minHeap.add(11);
    console.log('add(11)');
    console.log([8,10,10,50,25,15,11]);
    console.log(s.minHeap.data);

    s.minHeap.poll();
    console.log('poll()');
    console.log([10,11,10,50,25,15]);
    console.log(s.minHeap.data);

    s.minHeap.poll();
    console.log('poll()');
    console.log([10,11,15,50,25]);
    console.log(s.minHeap.data);

    s.minHeap.poll();
    console.log('poll()');
    console.log([11,25,15,50]);
    console.log(s.minHeap.data);

    s.minHeap.poll();
    console.log('poll()');
    console.log([15,25,50]);
    console.log(s.minHeap.data);

    s.minHeap.poll();
    console.log('poll()');
    console.log([25,50]);
    console.log(s.minHeap.data);

    s.minHeap.poll();
    console.log('poll()');
    console.log([50]);
    console.log(s.minHeap.data);

    s.minHeap.poll();
    console.log('poll()');
    console.log([]);
    console.log(s.minHeap.data);
/*
    var tmp = s.maxHeap.peek;
    for(var i = 1; i< s.maxHeap.count; i++){
        if(s.maxHeap.item(i) > tmp){
            throw new Error(s.maxHeap.item(i)+' > '+tmp+' at i = '+i);
        }
    }
*/
})();

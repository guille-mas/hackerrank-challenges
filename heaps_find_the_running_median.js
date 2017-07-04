let Solution = (()=>{
    "use strict";

    class AbstractHeap {
        
        constructor() {
            this.data = [];
        }

        add(item) {
            // push element to next empty position
            this.data.push(item);
            // bubble up the element until finding its place
            this._bubbleUp(this.count()-1);
        }

        poll() {
            let removedItem = this.data.shift();
            this.data.unshift(this.data.pop());
            this._bubbleDown(0);
            return removedItem;
        }

        peek() {
            return this.data[0];
        }

        isEmpty() {
            return this.data.length === 0;
        }

        count() {
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
         * @param index
         */
        _getParentIdx(index) {
            return Number.parseInt(Math.round((index-1)/2));
        }

        /**
         * Given an index, return the left child index
         * @param index
         */
        _getLeftChildIdx(index) {
            return Number.parseInt(Math.round(2*index+1));
        }

        /**
         * Given an index, return the right child index
         * @param index
         */
        _getRightChildIdx(index) {
            return Number.parseInt(Math.round(2*index+2));
        }

        _hasLeftChild(idx) {
            return typeof this.data[this._getLeftChildIdx(idx)] == 'number';
        }

        _hasRightChild(idx) {
            return typeof this.data[this._getRightChildIdx(idx)] == 'number';
        }

        /**
         * Given an index, bubble up the item on that position
         * til we find its place on the heap
         * @param idx
         */
        _bubbleUp(idx) {
            let parentIdx = this._getParentIdx(idx);
            if(parentIdx >= 0
                && this._compareItems(this.data[idx] , this.data[parentIdx])) {
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
        _bubbleDown(idx) {
            if(this._hasLeftChild(idx)) {
                let currentItem = this.data[idx];
                let leftChild = this.data[this._getLeftChildIdx(idx)];

                if(this._hasRightChild(idx)) {
                    let rightChild = this.data[this._getRightChildIdx(idx)];
                    if(rightChild < leftChild) {
                        if(rightChild < currentItem) {
                            this._swapItems(idx,this._getRightChildIdx(idx));
                            return this._bubbleDown(this._getRightChildIdx(idx));
                        }
                    }
                }

                if(leftChild < currentItem) {
                    this._swapItems(idx,this._getLeftChildIdx(idx));
                    return this._bubbleDown(this._getLeftChildIdx(idx));
                }
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
        _bubbleDown(idx) {
            if(this._hasLeftChild(idx)) {
                let currentItem = this.data[idx];
                let leftChild = this.data[this._getLeftChildIdx(idx)];

                if(this._hasRightChild(idx)) {
                    let rightChild = this.data[this._getRightChildIdx(idx)];
                    if(rightChild > leftChild) {
                        if(rightChild > currentItem) {
                            this._swapItems(idx,this._getRightChildIdx(idx));
                            return this._bubbleDown(this._getRightChildIdx(idx));
                        }
                    }
                }

                if(leftChild > currentItem) {
                    this._swapItems(idx,this._getLeftChildIdx(idx));
                    return this._bubbleDown(this._getLeftChildIdx(idx));
                }
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

            if(this.minHeap.count() === this.maxHeap.count()){
                let highestMin = this.maxHeap.peek();
                let lowestMax = this.minHeap.peek();
                middle = (highestMin+lowestMax) / 2;
            }else if(this.minHeap.count() > this.maxHeap.count()){
                middle = this.minHeap.peek();
            }else if(this.minHeap.count() < this.maxHeap.count()){
                middle = this.maxHeap.peek();
            }
            return middle.toFixed(1);
        }

        rebalanceHeaps() {
            if (this.minHeap.count() < this.maxHeap.count()) {
                this.minHeap.add(this.maxHeap.poll());
            } else {
                this.maxHeap.add(this.minHeap.poll());
            }
        }

        add(item) {
            if(item >= this.minHeap.peek()){
                this.minHeap.add(item);
            }else{
                this.maxHeap.add(item);
            }

            if(Math.abs(this.minHeap.count() - this.maxHeap.count()) > 1){
                this.rebalanceHeaps();
            }
        }

    }

    return Solution;
})();


/////////////// ignore above this line ////////////////////

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
        s.add(Number(input[a_i]));


        var tmp = s.minHeap.data[0];
        for(var i = 1; i< s.minHeap.count(); i++){
            if(s.minHeap.data[i] < tmp){
                throw new Error(s.minHeap.data[i]+' < '+tmp);
            }
        }

        tmp = s.maxHeap.data[0];
        for(var i = 1; i< s.maxHeap.count(); i++){
            if(s.maxHeap.data[i] > tmp){
                throw new Error(s.minHeap.data[i]+' > '+tmp);
            }
        }


        try {
            console.assert(s.getMiddle() == results[a_i], 'at position '+a_i+': '+s.getMiddle() +' != '+ results[a_i]);
        }catch(e){
            console.log(e.message);
            console.log(s.getMiddle(), results[a_i]);
            break;
        }
    }
})();

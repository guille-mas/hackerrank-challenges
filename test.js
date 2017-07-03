process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

function main() {
    let myTrie = new Trie();
    var n = parseInt(readLine());
    console.log('start');
    for(var a0 = 0; a0 < n; a0++){
        var op_temp = readLine().split(' ');
        var op = op_temp[0];
        var contact = op_temp[1];
        console.log(op,contact);
        if(op == 'add'){
            myTrie.addWord(contact);
        }else {
            console.log(myTrie.countWordsWithPrefix(contact));
        }
    }

    console.log('end');

}


let Trie = (()=>{
    "use strict";

    /**
     * Trie "class" implementation
     */
    function Trie(char) {
        this.childs = {};
        this.data = char;
        this.suffixCounter = 0;
    };


    /**
     * Add a word to the trie
     * @param word
     */
    Trie.prototype.addWord = function(word) {
        if(!word.length) {
            return 0;
        }else if(!this.data.length) {
            if(typeof this.childs[word.charAt(0)] == 'undefined') {
                this.childs[word.charAt(0)] = new Trie(word.charAt(0));
            }
            this.childs[word.charAt(0)].addWord(word);
            this.suffixCounter += 1;
            return this.suffixCounter;
        } else {
            this.data = word.charAt(0);
            if(word.length == 1) {
                // this is the end of a word
                this.suffixCounter += 1;
            }else {
                // here we are adding a word that is longer than the current position
                if(typeof this.childs[word.charAt(1)] == 'undefined') {
                    this.childs[word.charAt(1)] = new Trie(word.charAt(1));
                }
                this.childs[word.charAt(1)].addWord(word.substr(1));
                this.suffixCounter += 1;
            }

            return this.suffixCounter;
        }
    };


    /**
     * Return an array of words for a given prefix
     * @param word
     */
    Trie.prototype.countWordsWithPrefix = function(word) {
        if(!this.data.length){
            return typeof this.childs[word.charAt(0)] == 'undefined'? 0 : this.childs[word.charAt(0)].countWordsWithPrefix(word);
        }else if(word == this.data) {
            return this.suffixCounter;
        } else if(typeof this.childs[word.charAt(1)] != 'undefined') {
            return this.childs[word.charAt(1)].countWordsWithPrefix(word.substr(1));
        }else{
            return 0;
        }
    };

    return Trie;
})();



/**
 * HackerRank Challenge "Tries:Contacts"
 * see https://www.hackerrank.com/challenges/ctci-contacts?h_r=next-challenge&h_v=zen
 */
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
            if(typeof this.childs[word[0]] == 'undefined') {
                this.childs[word[0]] = new Trie(word[0]);
            }
            this.childs[word[0]].addWord(word);
            this.suffixCounter += 1;
            return this.suffixCounter;
        } else {
            this.data = word[0];
            if(word.length == 1) {
                // this is the end of a word
                this.suffixCounter += 1;
            }else {
                // here we are adding a word that is longer than the current position
                if(typeof this.childs[word[1]] == 'undefined') {
                    this.childs[word[1]] = new Trie(word[1]);
                }
                this.childs[word[1]].addWord(word.substr(1));
                this.suffixCounter += 1;
            }

            return this.suffixCounter;
        }
    };


    /**
     * Count the number of words prefixed by a given string
     * The count does also includes the given string if it
     * exists in the trie
     * @param word
     */
    Trie.prototype.countWordsWithPrefix = function(word) {
        if(!this.data.length){
            return typeof this.childs[word[0]] == 'undefined'? 0 : this.childs[word[0]].countWordsWithPrefix(word);
        }else if(word == this.data) {
            return this.suffixCounter;
        } else if(typeof this.childs[word[1]] != 'undefined') {
            return this.childs[word[1]].countWordsWithPrefix(word.substr(1));
        }else{
            return 0;
        }
    };
    
    return Trie;
})();


function test1(){
    "use strict";
    process.stdout.write("Test 1 running...\n");

    let t = new Trie('');

    //add hack
    t.addWord('hack');
    //add hackerrank
    t.addWord('hackerrank');
    //find hac

    console.assert(t.countWordsWithPrefix('hac') === 2, 'count words "hac" should be 2 '+' not ' + t.countWordsWithPrefix('hac'));
    //find hak
    console.assert(t.countWordsWithPrefix('hak') === 0, 'count words "hak" should be 0 '+' not ' + t.countWordsWithPrefix('hak'));
    console.assert(t.countWordsWithPrefix('f') === 0, 'count words "f" should be 0 '+' not ' + t.countWordsWithPrefix('f'));
    // t.addWord('hack');
    t.addWord('hacer');
    t.addWord('haz');
    t.addWord('hhhhh');
    // t.addWord('hack');
    t.addWord('ha');

    console.assert(t.countWordsWithPrefix('a') === 0, 'count words "a" should be 0 '+' not ' + t.countWordsWithPrefix('a'));
    console.assert(t.countWordsWithPrefix('h') === 6, 'count words "h" should be 6 '+' not ' + t.countWordsWithPrefix('h'));
    console.assert(t.countWordsWithPrefix('hac') === 3, 'count words "hac" should be 3 '+' not ' + t.countWordsWithPrefix('hac'));
    console.assert(t.countWordsWithPrefix('ha') === 5, 'count words "ha" should be 5 '+' not ' + t.countWordsWithPrefix('ha'));
    console.assert(t.countWordsWithPrefix('hak') === 0, 'count words "hak" should be 0 '+' not ' + t.countWordsWithPrefix('hak'));
}



function test2(){
    let t = new Trie('');
    process.stdout.write("Test 2 running...\n");
    "use strict";
    t.addWord('hacerese');
    t.addWord('hace');
    t.addWord('hacer');
    console.assert(t.countWordsWithPrefix('a') === 0, 'count words "a" should be 0'+' not ' + t.countWordsWithPrefix('a'));
    console.assert(t.countWordsWithPrefix('h') === 3, 'count words "h" should be 3'+' not ' + t.countWordsWithPrefix('h'));
    console.assert(t.countWordsWithPrefix('hacer') === 2, 'count words "hacer" should be 2'+' not ' + t.countWordsWithPrefix('hacer'));
    console.assert(t.countWordsWithPrefix('hacere') === 1, 'count words "hacere" should be 1'+' not ' + t.countWordsWithPrefix('hacere'));
}


function test3(){
    "use strict";
    process.stdout.write("Test 3 running...\n");

    let t = new Trie('');
    t.addWord('g');
    t.addWord('guillermo');
    t.addWord('guille');
    t.addWord('arbol');

    var fresult = t.countWordsWithPrefix('u');
    console.assert(fresult === 0, 'count words "u" should be 0'+' not ' + fresult);

    fresult = t.countWordsWithPrefix('gui');
    console.assert(fresult === 2, 'count words "gui" should be 2'+' not ' + fresult);

    fresult = t.countWordsWithPrefix('g');
    console.assert(fresult === 3, 'count words "g" should be 3'+' not ' + fresult);

    fresult = t.countWordsWithPrefix('arboles');
    console.assert(fresult === 0, 'count words "arboles" should be 0'+' not ' + fresult);

}

// BIG TEST BEGINS
process.stdout.write("\n");
function testBig() {
    process.stdout.write("Test BIG running...\n");
    let myTrie = new Trie('');

    var fs = require('fs');
    var resultsArray = fs.readFileSync('./tests/tries_contacts_app_test_1_results.txt').toString().split("\n");

    var testsArray = fs.readFileSync('./tests/tries_contacts_app_test_1.txt').toString().split("\n");

    var n;
    var op_temp;
    var op;
    var contact;
    var testsArrayIdx = 0;

    for(let lineIdx in testsArray){
        var line = testsArray[lineIdx];
        if(lineIdx == 0){
            n = parseInt(line);
        }else{
            op_temp = line.split(' ');
            op = op_temp[0];
            contact = op_temp[1];
            if(op == 'add'){
                myTrie.addWord(contact);
            }else if(op == 'find'){
                // continue;
                var count = myTrie.countWordsWithPrefix(contact);
                console.assert( count == resultsArray[testsArrayIdx], [count,resultsArray[testsArrayIdx],lineIdx]);
                lineIdx++;
                testsArrayIdx++;
            }
        }
    }
}



test1();
test2();
test3();
testBig();


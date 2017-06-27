/**
 * HackerRank Challenge "Tries:Contacts"
 * see https://www.hackerrank.com/challenges/ctci-contacts?h_r=next-challenge&h_v=zen
 */
let myTrie = (()=>{
    "use strict";

    /**
     * Trie "class" implementation
     */
    function Trie(char) {
        this.childs = {};
        this.data = typeof char == 'string' ? char : null;
        this.suffixCounter = 0;
    };


    /**
     * Add a word to the trie
     * @param word
     */
    Trie.prototype.addWord = function(word) {
        if(!word.length) {
            return 0;
        }else if(this.data === '') {
            if(typeof this.childs[word[0]] == 'undefined') {
                this.childs[word[0]] = new Trie(word[0]);
            }
            this.childs[word[0]].addWord(word);
            this.suffixCounter += 1;
            return this.suffixCounter;
        } else {

            this.data = word[0];

            if(word.length === 1) {
                // this is the end of a word
                this.suffixCounter += 1;
            }else if(typeof word[1] != 'undefined') {
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
     * Return an array of words for a given prefix
     * @param word
     */
    Trie.prototype.countWordsWithPrefix = function(word) {
        if(this.data === ''){
            if( typeof this.childs[word[0]] != 'undefined'){
                return this.childs[word[0]].countWordsWithPrefix(word);
            }else{
                return 0;
            }
        }else if(word.length === 1 && word === this.data) {
            return this.suffixCounter;
        } else if(word.length && typeof this.childs[word[1]] != 'undefined') {
            return this.childs[word[1]].countWordsWithPrefix(word.substr(1));
        }else{
            return 0;
        }
    };
    
    return new Trie('');
})();


function test1(t){
    "use strict";

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



function test2(t){
    "use strict";
    t.addWord('hacerese');
    t.addWord('hace');
    t.addWord('hacer');
    console.assert(t.countWordsWithPrefix('a') === 0, 'count words "a" should be 0'+' not ' + t.countWordsWithPrefix('a'));
    console.assert(t.countWordsWithPrefix('h') === 3, 'count words "h" should be 3'+' not ' + t.countWordsWithPrefix('h'));
    console.assert(t.countWordsWithPrefix('hacer') === 2, 'count words "hacer" should be 2'+' not ' + t.countWordsWithPrefix('hacer'));
    console.assert(t.countWordsWithPrefix('hacere') === 1, 'count words "hacere" should be 1'+' not ' + t.countWordsWithPrefix('hacere'));
}


function test3(t){
    "use strict";
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


test1(myTrie);
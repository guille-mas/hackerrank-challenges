let myTrie = (()=>{
    "use strict";

    /**
     * Trie "class" implementation
     */
    function Trie(char) {
        var char = char || null;
        this.childs = {};
        this.data = char;
        this.endOfWord = false;
        this.suffixCounter = 0;
    };


    /**
     * Add a word to the trie
     * @param word
     */
    Trie.prototype.addWord = function(word) {
        if(!word.length){
            // this.suffixCounter = this.endOfWord ? 1 : 0;
            return 0;
        }else if(word.length === 1) {
            this.data = word;
            if(!this.endOfWord){
                this.endOfWord = true;
                this.suffixCounter++;
            }
            return this.suffixCounter;
        } else {
            let firstChar = word[0];
            let nextChar = word[1];
            let suffix = word.substr(1);

            if(this.data == null){
                this.data = firstChar;
                this.childs[nextChar] = new Trie(nextChar);
            }else{
                if(typeof this.childs[nextChar] == 'undefined') {
                    this.childs[nextChar] = new Trie(nextChar);
                }
            }

            this.suffixCounter = this.childs[nextChar].addWord(suffix) + ( this.endOfWord ? 1 : 0);
            return this.suffixCounter;
        }
    };


    /**
     * Return an array of words for a given prefix
     * @param word
     */
    Trie.prototype.countWordsWithPrefix = function(word) {
        if(!word.length){
            return 0;
        }else{
            if(word[0] != this.data){
                return 0;
            }else if(word.length === 1){
                return this.suffixCounter;
            }else{
                if(typeof this.childs[word[1]] != 'undefined'){
                    return this.childs[word[1]].countWordsWithPrefix(word.substr(1));
                }else{
                    return 0;
                }
            }
        }
    };
    
    var t = new Trie('');

    return t;
})();


function test(t){
    "use strict";

    //add hack
    t.addWord('hack');
    //add hackerrank
    t.addWord('hackerrank');
    //find hac
    console.log(t.countWordsWithPrefix('hac'));         // 2
    //find hak
    console.log(t.countWordsWithPrefix('hak'));         // 0
    console.log(t.countWordsWithPrefix('f'));           // 0
    t.addWord('hack');
    t.addWord('hacer');
    t.addWord('haz');
    t.addWord('hhhhh');
    t.addWord('hack');
    console.log(t.countWordsWithPrefix('a'));           // 0
    console.log(t.countWordsWithPrefix('h'));           // 5
    console.log(t.countWordsWithPrefix('hac'));         // 3
    console.log(t.countWordsWithPrefix('ha'));          // 4
    console.log(t.countWordsWithPrefix('hak'));         // 0
}



function test2(t){
    "use strict";
    t.addWord('hacer');
    t.addWord('hace');
    t.addWord('hacerese');
    console.log(t.countWordsWithPrefix('a'));        // 0
    console.log(t.countWordsWithPrefix('h'));        // 3
    console.log(t.countWordsWithPrefix('hacer'));    // 2
    console.log(t.countWordsWithPrefix('hacere'));   // 1

}

test(myTrie);
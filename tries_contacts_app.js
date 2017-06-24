;(()=>{
    "use strict";

    function Trie(char) {
        var char = char || null;
        this.childs = {};
        this.data = char;
        this.endOfWord = false;
    };

    /**
     * Add a word to the trie
     * @param word
     */
    Trie.prototype.addWord = function(word) {
        if(word.length === 1) {
            this.data = word;
            this.endOfWord = true;
        } else {
            let firstChar = word[0];        // always a char
            let nextChar = word[1];         // always a char
            let suffix = word.substr(1);

            if(this.data == null){
                this.data = firstChar;
                this.childs[nextChar] = new Trie(nextChar);
                this.childs[nextChar].addWord(suffix);
            }else{
                if(typeof this.childs[nextChar] == 'undefined') {
                    this.childs[nextChar] = new Trie(nextChar);
                }
                this.childs[nextChar].addWord(suffix);
            }
        }
    };


    /**
     * Return an array of words for a given prefix
     * @param word
     */
    Trie.prototype.countWordsWithPrefix = function(word) {
        let prefixCount = this.endOfWord ? 1 : 0;
        let suffix = word.substr(1);
        if(word.length && word[0] != this.data){
            return 0;
        }else if(word.length > 1){
            let nextChar = word[1];
            if(typeof this.childs[nextChar] != 'undefined'){
                return prefixCount + this.childs[nextChar].countWordsWithPrefix(suffix);
            }else{
                return prefixCount;
            }
        }else{
            let childLetters = Object.getOwnPropertyNames(this.childs);
            for(let i=0; i<childLetters.length; i++){
                prefixCount += this.childs[childLetters[i]].countWordsWithPrefix(suffix);
            }
            return prefixCount;
        }
    };


    var t = new Trie('');
    console.log(t.countWordsWithPrefix('f'));
    /*
        t.addWord('hack');
        t.addWord('hacer');
        t.addWord('haz');
        t.addWord('hhhhh');
        t.addWord('hack');
        console.log(t.countWordsWithPrefix('a'));           // 0
        console.log(t.countWordsWithPrefix('h'));           // 4
        console.log(t.countWordsWithPrefix('hac'));         // 2
        console.log(t.countWordsWithPrefix('ha'));          // 3
        console.log(t.countWordsWithPrefix('hak'));         // 0
        */
})();

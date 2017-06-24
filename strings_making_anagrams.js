(()=>{
    "use strict";

    /**
     * given two strings
     * return the number of
     * characters that must be
     * deleted to make both strings
     * anagrams
     */
    function calculateDeletions(a,b) {
        let aCharsMap = a.split('').reduce(function(carrier,char){
            carrier[char] = typeof carrier[char] == 'number' ? carrier[char]+1 : 1;
            return carrier;
        },{});

        let bCharsMap = b.split('').reduce(function(carrier,char){
            carrier[char] = typeof carrier[char] == 'number' ? carrier[char]+1 : 1;
            return carrier;
        },{});

        let aChars = Object.keys(aCharsMap);
        let bChars = Object.keys(bCharsMap);

        let aCharsDiff = aChars.filter((char) => {
            return bChars.indexOf(char) < 0;
        });

        let bCharsDiff = bChars.filter((char) => {
            return aChars.indexOf(char) < 0;
        });

        let numberOfCharsToDelete = aCharsDiff.reduce((counter,char) => {
            return counter + aCharsMap[char];
        },0) + bCharsDiff.reduce((counter,char) => {
            return counter + bCharsMap[char];
        },0);

        let coincidentChars = aChars.filter((item)=>{
            return bChars.indexOf(item) >= 0;
         }).concat(
            bChars.filter((item)=>{
                return aChars.indexOf(item) >= 0;
            })
        );

        // remove duplicates
        coincidentChars = Array.from(new Set(coincidentChars));

        numberOfCharsToDelete += coincidentChars.reduce((counter,char)=>{
            return counter + Math.abs( aCharsMap[char] - bCharsMap[char] );
        },0);

        return numberOfCharsToDelete;
    }

    let a = 'iiee';
    let b = '';

    var result = calculateDeletions(a,b);
    console.log(result);
})();

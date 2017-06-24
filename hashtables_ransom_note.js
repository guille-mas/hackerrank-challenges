;(()=>{
    "use strict";

    /**
     * https://www.hackerrank.com/challenges/ctci-ransom-note
     * @param magazine
     * @param ransom
     */
    function canBuildRansomNote(magazine,ransom){
        let canBeBuild;
        magazine = magazine.filter((item) => item.length > 0);
        ransom = ransom.filter((item) => item.length > 0);
        if(ransom.length > magazine.length){
            canBeBuild = 'No';
        }
        if(!canBeBuild){
            magazine = magazine.reduce((carrier,item) => {
                carrier[item] = typeof carrier[item] != 'number' ? 1 : carrier[item]+1;
                return carrier;
            },{});
            let i=0;
            while(!canBeBuild && i<ransom.length) {
                if(typeof magazine[ransom[i]] != 'number' || magazine[ransom[i]] === 0){
                    canBeBuild = 'No';
                } else {
                    magazine[ransom[i]]--;
                }
                i++;
            }
        }
        console.log(canBeBuild || 'Yes');
    }

    canBuildRansomNote(magazine,note);
})();

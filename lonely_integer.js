function findLonelyInt(a) {
    return a.reduce((carrier,item)=>{
        carrier ^= item;
        return carrier;
    },null);
}

let a = [1,1,2];

console.log(findLonelyInt(a));
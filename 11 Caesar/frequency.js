

const fs = require('fs')

let data;
try {
    data = fs.readFileSync("PIN.txt", "utf-8") //PIN <><><> DG
} catch (error) {
    console.error("Input file does not exist");
    return;
}
data = data.toLowerCase()

const len = data.length
let charCount = {}
let count = 0;
for (let i = 0; i < len; i++){
    let char = data[i]   
    if (/[а-яё]/.test(char)) {
        if (charCount[char])
            charCount[char]++;
        else
            charCount[char] = 1
        count++
    }

}
console.log(charCount)
obj = {}
let keys = Object.keys(charCount).sort();
console.log(keys)
for(i = 0; i < 33; i++) {
    obj[keys[i]] = charCount[keys[i]] / count
}


let arr = [];
for(let key in obj)
    arr.push([key, obj[key]]);

arr.sort((a,b) => b[1] - a[1])

for(let i = 0; i < arr.length; i++)
    console.log('"'+arr[i][0]+'"' + ':' + arr[i][1]+',');


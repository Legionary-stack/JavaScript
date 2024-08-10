const fs = require('fs')
const { get } = require('http')

obj = fs.readFileSync("ru.txt",'utf8')
const freq = JSON.parse(obj)

const alphabetRU = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя"
const alphabetENG = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

function CaesarEncode(s,shift, alphabet) {
    const letters_count = alphabet.length/2
    const len = s.length
    let new_s = ""
    for(i = 0; i < len; i++) {
        if (/^[A-zА-яёЁ]$/.test(s[i])) {
            const temp = alphabet[letters_count] > s[i] ? 0 : letters_count
            const index = alphabet.indexOf(s[i])
            new_s += alphabet[(index + shift + letters_count) % letters_count + temp]
        }
        else
            new_s += s[i]
    }  
    return new_s
}

function findTrueCeaser(s, alphabet) {
    const len = alphabet.length/2
    let mn = Number.MAX_SAFE_INTEGER
    let shift = -0;
    let trueCeasar = ""
    for(let i = 1; i <= len; i++) {
        const Ceasar = CaesarEncode(s,i,alphabet)
        //console.log(i)
        const new_Ceasar = Ceasar.toLowerCase()
        let get_frequency = frequency(new_Ceasar, len)
        //console.log(get_frequency)
        if (mn > get_frequency) {
            mn = get_frequency
            shift = i
            trueCeasar = Ceasar
        }
    }
    console.log("shift is:", len-shift)
    return trueCeasar;
}

function frequency(data, alplen) {
    const len = data.length
    let charCount = {}
    let count = 0;
    reg = alplen > 30 ? /^[А-яёЁ]$/ : /^[A-z]$/
    for (let i = 0; i < len; i++){
        let char = data[i]   
        if (reg.test(char)) {
            if (charCount[char])
                charCount[char]++;
            else
                charCount[char] = 1
            count++
        }
    }
    
    obj = {}
    let keys = Object.keys(charCount).sort();
    let sum = 0
    console.log(charCount)
    for(i = 0; i < keys.length; i++) {
        sum += Math.abs(charCount[keys[i]] / count - freq[keys[i]])
    }

return sum
}
/*
const path_in = process.argv[3]
const path_out = process.argv[4] 
const endecode = process.argv[2]
const alph = process.argv.slice(-1)

let alphabet
if (alph == "eng") {
    alphabet = alphabetENG
    var obj = fs.readFileSync("eng.txt", "utf8")
}
    
else if (alph == "ru") {
    alphabet = alphabetRU
    var obj = fs.readFileSync("ru.txt", "utf8")
}
    
else {
    console.error("alphaber error: only ru/eng")
    return
}
const freq = JSON.parse(obj)

try {
    data = fs.readFileSync(path_in, 'utf-8')
} catch (error) {
    console.error("File does not exist")
    return
}

if(endecode == "code") {
    const shift = +process.argv[5]
    if (!Number.isInteger(shift)) {
        console.error("shift must be integer")
        return
    }
    const encode = CaesarEncode(data,shift,alphabet)
    fs.writeFileSync(path_out, encode)
}
else if(endecode == "decode") {
    const decode = findTrueCeaser(data,alphabet)
    fs.writeFileSync(path_out,decode)
}
else {
    console.error("encoding/decoding syntax error")
}
*/

const shift = 4
s = "приветик"
console.log(s)
s = CaesarEncode(s,shift,alphabetRU)
console.log(s)
console.log(findTrueCeaser(s,alphabetRU))





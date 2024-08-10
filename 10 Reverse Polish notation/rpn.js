const priority = {
    ')' : -2, //-1 >>> (-2) -2 = -2
    '(' : -1,
    '+' : 0,
    '-' : 0,
    '/' : 1,
    '*' : 1,
    '^' : 2,
}

function isCorrect(s) {
    count = 0;
    const len = s.length
    for(i = 0; i < len; i++) {
        if (s[i] == "(")
            count++
        if (s[i] == ")")
            count--
        if (count < 0) {
            count = 999;
            break
        }
    }
    return count === 0 
}


function makeArray(s) {
    let array = new Array()
    s = s.replaceAll(" ","")
    let dig = ""
    const len = s.length
    for(i = 0; i < len; i++) {
        
        if (/\d/.test(s[i]) || s[i] == '.') {
            if (s[i-1] == '-' && (priority[s[i-2]] >=-1 || !s[i-2])) {
                dig += '-'
                array.pop()
            }
                
            dig +=s[i]
        }
        else {
            if (dig) {
                array.push(dig)
                dig = ""
            }
            array.push(s[i])
        }

    }
    if (dig) {
        array.push(dig)
        dig = ""
    }
return array
}

function RNP(s) {
    let stack = new Array()
    let rnp = new Array()   
    const len = s.length
    for(i = 0; i < len; i++) {
        const stackLen = stack.length

        if (s[i] == '(')
            stack.push(s[i])
        else if(s[i] == ')') {
            while (stack.length > 0) {
                let lastElement = stack.length - 1
                if (stack[lastElement] != '(' ) 
                    rnp.push(stack[lastElement])
                else {
                    stack.pop()
                    break
                }
                stack.pop()
            }
        }
        else if(/\d/.test(s[i]))
            rnp.push(s[i])

        else if(stackLen == 0 || priority[stack[stackLen - 1]] < priority[s[i]])
            stack.push(s[i])
        else if (stackLen == 0  || priority[stack[stackLen - 1]] >= priority[s[i]]) {
            while(priority[stack[stack.length - 1]] >= priority[s[i]]) {
                rnp.push(stack.pop())
            }
            stack.push(s[i])
        }
        //console.log(stack.join(" "),">>>>", rnp.join(" "))
    }
    while (stack.length > 0) {
        rnp.push(stack.pop());
    }
    return rnp
}

function op(rnp) {
    const len = rnp.length
    let ans = new Array()
    let a,b
    for(let i = 0; i < len; i++) {
        console.log(ans, rnp[i])
        switch (rnp[i]) {
            case '+':
                a = +ans.pop()
                b = +ans.pop()
                ans.push(b + a)
                break
            case '-':
                a = +ans.pop()
                b = +ans.pop()
                ans.push(b - a)
                break
            case '/':         
                a = +ans.pop()
                b = +ans.pop()
                ans.push(b / a)
                break
            case '*':
                a = +ans.pop()
                b = +ans.pop()
                ans.push(b * a)
                break
            case '^':
                a = +ans.pop()
                b = +ans.pop()
                ans.push(b ** a)
                break
            default:
                ans.push(rnp[i])
                break
        }
    }
    return ans[0]
}

const fs = require('fs')
let s = ""
const path = process.argv[2]
if (!path){
    console.error("File path not specified")
    return 
}
if(path.slice(-4) != ".txt") {
    console.error("The output file must be in txt format")
    return
}
try {
    s = fs.readFileSync(path, 'utf-8')
}      
catch (err) {
    console.error("File does not exist");
    return;
}

if (!isCorrect(s)) {
    console.log("Incorrect placement")
    return
}
s = makeArray(s)
rnp = RNP(s)
console.log(rnp.join(' '))
console.log(op(rnp))
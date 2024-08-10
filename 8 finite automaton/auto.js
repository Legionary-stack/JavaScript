function finite_automaton(s,t,m,n,num) {
    alphabet = new Array()
    for(i = 0; i < m;i++) {
        alphabet[t[i]] = 0
    }

    table = new Array(m+1)
    for(j = 0; j <= m; j++) {
        table[j] = new Array()
    }

    for(i in alphabet)
        table[0][i] = 0

    for (j = 0; j < m; j++) {

        previous = table[j][t[j]]
        table[j][t[j]] = j + 1
        
        for(i in alphabet)
            table[j+1][i] = table[previous][i]
    }
    
    c=0
    x = 0
    occurrences=[]
    for(i = 0; i < n;i++) {
        if (x < num) {
            if (table[c][s[i]]) {
                c = table[c][s[i]]
            }
            else {
                c = 0
            }
            if (c == m) {
                occurrences[x++] = i-m+1+1
            }
        }
        else
            break
    }
    return {
        "occurrences" : occurrences,
        "table" : table
    }
}



const fs = require('fs');
const KEYS = ["-a", "-n","-t"]

const keys_argv = process.argv.slice(2,-2)
const keys_len = keys_argv.length

const path = process.argv.slice(2)
const path_str = path.slice(-2)[0]
const path_sub = path.slice(-2)[1]

let time = false, num = Number.MAX_SAFE_INTEGER, table_auto = false


if (!path_str || !path_sub) {
    console.error("File path not specified")
    return 
}

try {
    s = fs.readFileSync(path_str, 'utf-8')
    t = fs.readFileSync(path_sub, 'utf-8')
}
catch (err) {
    console.error("File does not exist");
    return;

}
if (keys_len > 4) {
    console.error("more than four keys were transferred")
    return
}
for(i = 0; i < keys_len;i++) {

    if (keys_argv[i] == "-n") {

        if (keys_argv[i+1] >= 1 && Number.isInteger(+keys_argv[i+1])) {
            num = keys_argv[++i]
        }
        else {
            console.error("key argument passed incorrectly")
            return
        }
    }
    else if (!KEYS.includes(keys_argv[i])) {
        console.error("key not found")
        return
    }
}

if (keys_argv.includes("-t")) {
    time = true
}
if (keys_argv.includes("-a")) {
    table_auto = true
}

const m = t.length
const n = s.length

if (!n || !m) {
    console.error("Empty file")
    return
}
if (n < m ) {
    console.error("The length of the string must be greater than or equal to the length of the substring")
    return
}
const start = performance.now();
const data = finite_automaton(s,t,m,n,num)
const time_alg = performance.now() - start + " ms";


console.log("Number of occurrences:",data["occurrences"].join())
if (time)
    console.log(time_alg)
if (table_auto) {
    new_table = data["table"];
    len = new_table.length
    console.log("Table:")
    for(i = 0; i < len; i++)
        console.log(" ",i, new_table[i])
}


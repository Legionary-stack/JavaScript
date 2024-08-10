function brute_force(S,T, t = false, N) {
    let start, time;

    if (t) {
        start = performance.now();
    }
    let n = S.length
    let m = T.length

    let ans = []
    let c = 0
    let i = 1;
    while (i <= n - m + 1) {
        j = 0;
        if (c < N) {
            while (S[i+j-1] == T[j]) {
                j++
                if (j==m) {
                    ans[c++] = i;
                    break
                }
            }
        }
        else 
            break
        i++
    }
    if (t) {
        time = performance.now() - start + " ms";
    }
    return [ans,time]
}

function hashes(S,T, METOD,t = false, N ,collision = false) {
    let start, time;
    
    if (t) {
        start = performance.now();
    }
    const n = S.length
    const m = T.length
    const q = 997, d = 256;
    let ht = 0, hs = 0, x_deg = 1

    if (METOD == "h1") {
        for(el = 0; el < m; el++) {
            ht += T.charCodeAt(el)
            hs += S.charCodeAt(el)
        }
    }
    else if (METOD == "h2") {
        for(el = 0; el < m; el++) {
            ht += T.charCodeAt(el) ** 2
            hs += S.charCodeAt(el) ** 2
        }
    }
    else {
        for (let i = 0; i < m-1; i++) 
            x_deg = (x_deg * d) % q;
    
        for(let i = 0; i < m;i++) {
            ht = (d * ht + T.charCodeAt(i)) % q
            hs = (d * hs + S.charCodeAt(i)) % q
        }
    } 

    let ans = []
    let c = 0, i = 1, col = 0
    const lENGTH = n - m + 1

    while (i <= lENGTH) {
        let j = 0;
        if (c < N) {           
            if (hs == ht) {
                let res_c = c
                while (S[i+j-1] == T[j]) {
                    j++
                    if (j==m) {
                        ans[c++] = i;
                        break
                    }
                }
                if(collision && res_c == c) 
                    col++
            }
            if (i != lENGTH ) {
                if (METOD == "h1") {
                    hs = hs + S.charCodeAt(i+m-1) - S.charCodeAt(i-1)
                }
                else if (METOD == "h2") {
                    hs = hs + S.charCodeAt(i+m-1)**2 - S.charCodeAt(i-1)**2
                }
                else {
                    hs = (d * (hs - S.charCodeAt(i-1) * x_deg) + S.charCodeAt(i + m - 1)) % q;
                    if (hs < 0)
                        hs += q  
                }
            }
        }
        else
            break
        
        i++
    }
    if (t) {
        time = performance.now() - start + " ms";
    }
    return [ans,time,col]



}

const KEYS = ["-c", "-n","-t"]
const METODS = ["b","h1","h2","h3"];
const fs = require('fs');

let time, num = 10e10,collision; 

keys_argv = process.argv.slice(2,-3)
metod = process.argv.slice(-3,-2)[0]  

path_str = process.argv.slice(-2)[0]
path_sub = process.argv.slice(-2)[1]

let keys_len = keys_argv.length

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
if (!METODS.includes(metod)) {
    console.error("method not found")
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
if (keys_argv.includes("-c")) {
    collision = true
}

n = s.length
m = t.length
if (!n || !m) {
    console.error("Empty file")
    return
}
if (n < m ) {
    console.error("The length of the string must be greater than or equal to the length of the substring")
    return
}
if (metod == "b") {
    b_f = brute_force(s,t, time, num)
    console.log("Number of occurrences:", b_f[0].join())
    if(time)
        console.log("time:", b_f[1])
}
else  {
    h_s = hashes(s,t, metod, time, num, collision)
    console.log("Number of occurrences:", h_s[0].join())
    if(time)
        console.log("time:", h_s[1])
    if(collision)
        console.log("collision:",h_s[2])
}


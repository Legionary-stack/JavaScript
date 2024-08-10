


// таблица наиболее правых вхождений в T
function BM(S,T,m,n,num) {
    N = new Array()
    table = new Array()
    for (let i = 0; i < m - 1; i++) 
        N[T[i]] = i+1

    //смещение между символами в строке
    suffshift = new Array()
    //максимальное совпадение в начале строки и в конце текста
    x = new Array()
    maxX = 0
    id_maxX = 0

    for(let i = 0; i <= m; i++) {
        x[i] =0
        suffshift[i] = m
    }

    for (let i = 1; i < m; i++) {
        if (i <= maxX) {
            x[i] = Math.min(maxX - i + 1, x[i-id_maxX]) 
        }
        while(i + x[i] < m && T[m - 1 - x[i]] == T[m - i - 1 - x[i]])
            x[i]++;
        if (i + x[i] - 1> maxX ) {
            id_maxX = i
            maxX = i + x[i] -1
        }

    }

    for (let i = m -1; i >0; i--)
        suffshift[m-x[i]] = i

    for(let i = 1; i <= m-1; i++)
        if (i + x[i] == m)
            for(let j = 0; j <= i; j++)
                if (suffshift[j] == m)
                    suffshift[j] = i


    let i = 0,l = 0
    oc = new Array()
    c = 0
    while (i <= n - m) {
        if (c < num) {
            let j = m - 1
            while(j >= l && S[i+j] == T[j])
                j--
            if (j < l) {
                oc[c++] = i+1
                l = m - suffshift[0]
                j = -1
                i += suffshift[0]
            }
            else {
                l = 0
                if (N[S[i + m -1]])
                    table[S[i+j]] = N[S[i + m - 1]]
                else 
                    table[S[i+j]] = 0
                i = Math.max(i + suffshift[j+1], i + j + 1 - table[S[i+j]])
            }
        }
        else
            break
    }
return oc
}


let time = false, num = Number.MAX_SAFE_INTEGER

const fs = require('fs')
const KEYS = ["-n","-t"]
const keys_argv = process.argv.slice(2,-2)
const keys_len = keys_argv.length

const path = process.argv.slice(2)
const path_str = path.slice(-2)[0]
const path_sub = path.slice(-2)[1]
console.log(path_str,path_sub)
if (!path_str || !path_sub) {
    console.error("File path not specified")
    return 
}
if (keys_len > 3) {
    console.error("more than three keys were transferred")
    return
}
try {
    S = fs.readFileSync(path_str, 'utf-8')
    T = fs.readFileSync(path_sub, 'utf-8')
}
catch (err) {
    console.error("File does not exist");
    return;

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
    else if (keys_argv[i] == "-t") {
        time = true
    }
    else {
        console.error("key not found")
        return
    }
}
const n = S.length
const m = T.length
if (!n || !m) {
    console.error("Empty file")
    return
}
if (n < m ) {
    console.error("The length of the string must be greater than or equal to the length of the substring")
    return
}

const start = performance.now();
const data = BM(S,T,m,n,num)
const time_alg = performance.now() - start + " ms";
console.log("Number of occurrences:",data.join())
if (time)
    console.log(time_alg)


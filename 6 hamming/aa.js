
function encode(s){
    A = +s[0]
    B = +s[1]
    C = +s[2]
    D = +s[3]

    p = A ^ B ^ D
    q = A ^ C ^ D
    r = B ^ C ^ D
    mes = [A,B,C,D,p,q,r]
    return mes.join("")
}

function decode(s){
    A = +s[0]
    B = +s[1]
    C = +s[2]
    D = +s[3]

    x = +s[4]
    y = +s[5]
    z = +s[6]

    g = A ^ B ^ D ^ x
    b = A ^ C ^ D ^ y
    r = B ^ C ^ D ^ z
    gbr = ""+g+b+r
    if(gbr != '000') {
        if(r == 0){
            if(b == 0 && g != 0) {
                x^=1
            }
            else if(b != 0 && g == 0) {
                y^=1
            }
            else if(b != 0 && g != 0) {
                A^=1
            }
        }
        else {
            if(b == 0 && g == 0) {
                z^=1
            }
            else if (b == 0 && g != 0){
                B^=1
            }
            else if (b != 0 && g == 0){
                C^=1
            }
            else if (b != 0 && g != 0){
                D^=1
            }
        }
    }


    return ""+A+B+C+D;
}
   
s = "1000"
console.log(s)
console.log(encode(s))

new_s = "1000111"
console.log(new_s)
console.log(decode(new_s)) 






    /*
    for(let q = 0; q < 100;q++) {
        for(let p = 0; p < 100;p++ ) {
            for (let r = 0; r < 100; r++){
                x = A ^ B ^ D
                y = A ^ C ^ D
                z = B ^ C ^ D
                if (X != x){
                    A = A^p%2
                    B = B^q%2
                    C = C^r%2
                }
                else if(Y!= y){
                    A = A^p%2
                    B = B^q%2
                    D = D^r%2  
                }
                else if (Z != z){
                    A = A^p%2
                    C = C^q%2
                    D = D^r%2           
                }
                else {
                    str = "" + A + B + C + D
                    return str
                }

            }
        }
    }*/


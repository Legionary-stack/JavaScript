function Node(name, weight, left = null, right = null) {
    this.name = name;
    this.weight = weight;
    this.left = left;
    this.right = right;
}

function buildHuffmanTree(string) {
    let charCount = {}
    for (let i = 0; i < string.length; i++){
        let char = String(string[i])
        if (charCount[char]){
            charCount[char]++;
        } 
        else{
            charCount[char] = 1
        }
    }

    let nodes = [];
  
    for (let char in charCount) {
      nodes.push(new Node(char, charCount[char]));
    }

    if(nodes.length == 1) {
        return nodes;
    }

    while (nodes.length > 1) {
        nodes.sort((a, b) => a.weight - b.weight);

        let leftNode = nodes.shift();
        let rightNode = nodes.shift();

        // Создание нового родительского узла с суммой их весов
        let parentNode = new Node(leftNode.name+rightNode.name, leftNode.weight + rightNode.weight, leftNode, rightNode);
    
        nodes.push(parentNode);

    }
    
    return nodes[0];
}

function buildCodeTable(node, code = '', codeTable = {}) {
    
    // Если узел не имеет левого и правого потомков
    // добавляем его символ и код в таблицу
    if (node.left === null && node.right === null) {
      codeTable[node.name] = code;
      return codeTable;
    }
    
    if (node.length == 1) { 
        codeTable[node[0].name] = "0";
        return codeTable;
    }

    buildCodeTable(node.left, code + '0', codeTable);
    buildCodeTable(node.right, code + '1', codeTable);
  
    return codeTable;
}

function encode(string, codeTable) {
    
    codeTable = Object.entries(codeTable)
    let message =""
    for (let char of string) {
        let i = 0;
        let flag = true;
        while(i < codeTable.length && flag) {
            if(char == codeTable[i][0]) {
                message+=codeTable[i][1];
                flag = false;
            }
            i++;
        }
        if(flag) {
            console.error("encode error in char "+char+"\ncurrent mes: " + message )
            return message;
        }
    }
    return message;
}


function decode(message, codeTable) {
    codeTable = Object.entries(codeTable)
    codeTable.sort()
    let string = ""
    let str = ""
    let len = codeTable.length;
    for (let char of message) {
        str += char;
        for (let index of codeTable) {
            if (str === index[1]) {
                string += index[0];
                str = "";
                break;
            }
        }
        if (str.length > codeTable[len-1][1].length){
            console.error("error in num: "+ str + "\ncurrent message: " + string)
            return  string
        }
    }
    if (str.length > 0){
        console.error("error in last num: "+ str + "\ncurrent message: " + string)
        return  string
    }
    return string;
}

const fs = require('fs');

endecode = process.argv[2]
path_in = process.argv[3]
table = process.argv[4]
path_out = process.argv[5]

if (path_out && table && path_in){ 
    if (path_out.slice(-4) != ".txt" || table.slice(-4) != ".txt") {
    console.error("The output file must be in txt format")
    return
    }
}
else {
    console.error("File path not specified")
    return
}

if(endecode == "code") {
    let data;
    try {
        data = fs.readFileSync(path_in, 'utf-8')
    }
    catch (err) {
        console.error("File does not exist");
        return;
    }
    let huffmanTree = buildHuffmanTree(data);
    let codeTable = buildCodeTable(huffmanTree);
    //Ниже, если не найдет файл, создат новый и запишет туда данные)
    fs.writeFileSync(table, JSON.stringify(codeTable))   
    fs.writeFileSync(path_out,encode(data,codeTable))
}
else if (endecode == "decode") {
    let data, obj;
    try {
        data = fs.readFileSync(path_in, 'utf-8')
        obj = fs.readFileSync(table, 'utf-8')
    }
    catch (err) {
        console.error("File does not exist");
        return;
    }
    fs.writeFileSync(path_out, decode(data,JSON.parse(obj)) )
}
else {
    console.error("encoding/decoding syntax error")
}




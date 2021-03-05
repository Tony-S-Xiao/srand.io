const Keccak = require('sha3').Keccak;
const crypto = require('crypto');

const hashCombine = (random_0, random_1) => {
    let sha2 = crypto.createHash('sha256');
    let sha3 = new Keccak(256);
    sha2.update(random_0[0]);
    sha2.update(random_1[0]);
    sha3.update(random_0[1]);
    sha3.update(random_1[1]);
    let hash1 = sha2.digest().toString('hex');
    let hash2 = sha3.digest().toString('hex');
    return(xorHex(hash1, hash2));
};
const hexToBinary = (hex_letter) => {
    return parseInt(hex_letter, 16).toString(2).padStart(4,'0');
}
const binaryToHex = (binary_group_of_4) => {
    return parseInt(binary_group_of_4, 2).toString(16);
}
const xorBinary = (binary_string_0, binary_string_1) => {
    let output = [];
    for(let i = 0; i < binary_string_0.length; ++i) {
        output.push(binary_string_0.charAt(i) != binary_string_1.charAt(i) ? '1' : '0');
    }
    return output.join('');
}
const xorHex = (hex_string_0, hex_string_1) => {
    let binary_0 = [];
    let binary_1 = [];
    for(let i = 0; i < hex_string_0.length; ++i) {
        binary_0.push(hexToBinary(hex_string_0[i]));
        binary_1.push(hexToBinary(hex_string_1[i]));
    }
    let result_binary = xorBinary(binary_0.join(''), binary_1.join(''));
    
    let result_hex = [];
    for(let i = 0; i < result_binary.length; i+=4) {
        result_hex.push(binaryToHex(result_binary.substring(i, i+4)));
    }
    return result_hex.join('');
}
const hexStringToBinaryString = (hex_string) => {
    let binary = [];
    for(let i = 0; i < hex_string.length; ++i) {
        binary.push(hexToBinary(hex_string[i]));
    }
    return binary.join('');
}

const zeroRatio = (input) => {
    let zeros = 0;
    let total = 0;

    for(let i = 0; i < input.length; ++i) {
        if(input.charAt(i) == '0') {
            ++zeros;

        }

        ++total;
    }
    return zeros/total;
};

module.exports = {hashCombine, hexStringToBinaryString, zeroRatio, hexToBinary};
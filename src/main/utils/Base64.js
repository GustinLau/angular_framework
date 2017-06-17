/**
 *  Base64
 *
 *  @date    14/06/2017
 *
 */

export default class Base64 {

    /**
     * ascii convert to binary
     * @param ascii
     * @returns {Array}
     * @private
     */
    static _toBinary(ascii) {
        let binary = [];
        while (ascii > 0) {
            let b = ascii % 2;
            ascii = Math.floor(ascii / 2);
            binary.push(b);
        }
        binary.reverse();
        return binary;
    }

    /**
     * binary convert to decimal
     * @param binary
     * @returns {number}
     * @private
     */
    static _toDecimal(binary) {
        let dec = 0;
        let p = 0;
        for (let i = binary.length - 1; i >= 0; --i) {
            let b = binary[i];
            if (b == 1) {
                dec += Math.pow(2, p);
            }
            ++p;
        }
        return dec;
    }

    /**
     * unicode convert to utf-8
     * @param c
     * @param binaryArray
     * @private
     */
    static _toUTF8Binary(c, binaryArray) {
        let mustLen = (8 - (c + 1)) + ((c - 1) * 6);
        let fatLen = binaryArray.length;
        let diff = mustLen - fatLen;
        while (--diff >= 0) {
            binaryArray.unshift(0);
        }
        let binary = [];
        let _c = c;
        while (--_c >= 0) {
            binary.push(1);
        }
        binary.push(0);
        let i = 0, len = 8 - (c + 1);
        for (; i < len; ++i) {
            binary.push(binaryArray[i]);
        }

        for (let j = 0; j < c - 1; ++j) {
            binary.push(1);
            binary.push(0);
            let sum = 6;
            while (--sum >= 0) {
                binary.push(binaryArray[i++]);
            }
        }
        return binary;
    }

    /**
     * BASE64 Encode
     * @param str
     * @returns {string}
     */
    static encode(str) {
        let base64_Index = [];
        let binaryArray = [];
        for (let i = 0, len = str.length; i < len; ++i) {
            let unicode = str.charCodeAt(i);
            let _tmpBinary = Base64._toBinary(unicode);
            if (unicode < 0x80) {
                let _tmpdiff = 8 - _tmpBinary.length;
                while (--_tmpdiff >= 0) {
                    _tmpBinary.unshift(0);
                }
                binaryArray = binaryArray.concat(_tmpBinary);
            } else if (unicode >= 0x80 && unicode <= 0x7FF) {
                binaryArray = binaryArray.concat(Base64._toUTF8Binary(2, _tmpBinary));
            } else if (unicode >= 0x800 && unicode <= 0xFFFF) {//UTF-8 3byte
                binaryArray = binaryArray.concat(Base64._toUTF8Binary(3, _tmpBinary));
            } else if (unicode >= 0x10000 && unicode <= 0x1FFFFF) {//UTF-8 4byte
                binaryArray = binaryArray.concat(Base64._toUTF8Binary(4, _tmpBinary));
            } else if (unicode >= 0x200000 && unicode <= 0x3FFFFFF) {//UTF-8 5byte
                binaryArray = binaryArray.concat(Base64._toUTF8Binary(5, _tmpBinary));
            } else if (unicode >= 4000000 && unicode <= 0x7FFFFFFF) {//UTF-8 6byte
                binaryArray = binaryArray.concat(Base64._toUTF8Binary(6, _tmpBinary));
            }
        }

        let extra_Zero_Count = 0;
        for (let i = 0, len = binaryArray.length; i < len; i += 6) {
            let diff = (i + 6) - len;
            if (diff == 2) {
                extra_Zero_Count = 2;
            } else if (diff == 4) {
                extra_Zero_Count = 4;
            }
            let _tmpExtra_Zero_Count = extra_Zero_Count;
            while (--_tmpExtra_Zero_Count >= 0) {
                binaryArray.push(0);
            }
            base64_Index.push(Base64._toDecimal(binaryArray.slice(i, i + 6)));
        }

        let base64 = '';
        for (let i = 0, len = base64_Index.length; i < len; ++i) {
            base64 += Base64._BASE64_MAPPING[base64_Index[i]];
        }

        for (let i = 0, len = extra_Zero_Count / 2; i < len; ++i) {
            base64 += '=';
        }
        return base64;
    }

    /**
     * BASE64  Decode for UTF-8
     * @param _base64Str
     * @param returnArray
     * @returns {*}
     */
    static decode(_base64Str, returnArray) {
        let _len = _base64Str.length;
        let extra_Zero_Count = 0;
        /**
         *计算在进行BASE64编码的时候，补了几个0
         */
        if (_base64Str.charAt(_len - 1) == '=') {
            if (_base64Str.charAt(_len - 2) == '=') {//两个等号说明补了4个0
                extra_Zero_Count = 4;
                _base64Str = _base64Str.substring(0, _len - 2);
            } else {//一个等号说明补了2个0
                extra_Zero_Count = 2;
                _base64Str = _base64Str.substring(0, _len - 1);
            }
        }

        let binaryArray = [];
        for (let i = 0, len = _base64Str.length; i < len; ++i) {
            let c = _base64Str.charAt(i);
            for (let j = 0, size = Base64._BASE64_MAPPING.length; j < size; ++j) {
                if (c == Base64._BASE64_MAPPING[j]) {
                    let _tmp = Base64._toBinary(j);
                    /*不足6位的补0*/
                    let _tmpLen = _tmp.length;
                    if (6 - _tmpLen > 0) {
                        for (let k = 6 - _tmpLen; k > 0; --k) {
                            _tmp.unshift(0);
                        }
                    }
                    binaryArray = binaryArray.concat(_tmp);
                    break;
                }
            }
        }

        if (extra_Zero_Count > 0) {
            binaryArray = binaryArray.slice(0, binaryArray.length - extra_Zero_Count);
        }

        let unicode = [];
        let unicodeBinary = [];
        for (let i = 0, len = binaryArray.length; i < len;) {
            if (binaryArray[i] == 0) {
                unicode = unicode.concat(Base64._toDecimal(binaryArray.slice(i, i + 8)));
                i += 8;
            } else {
                let sum = 0;
                while (i < len) {
                    if (binaryArray[i] == 1) {
                        ++sum;
                    } else {
                        break;
                    }
                    ++i;
                }
                unicodeBinary = unicodeBinary.concat(binaryArray.slice(i + 1, i + 8 - sum));
                i += 8 - sum;
                while (sum > 1) {
                    unicodeBinary = unicodeBinary.concat(binaryArray.slice(i + 2, i + 8));
                    i += 8;
                    --sum;
                }
                unicode = unicode.concat(Base64._toDecimal(unicodeBinary));
                unicodeBinary = [];
            }
        }
        if (returnArray)
            return unicode;
        else {
            let str = '';
            for (let i = 0, len = unicode.length; i < len; ++i) {
                str += String.fromCharCode(unicode[i]);
            }
            return str
        }
    }
}
/**
 *
 * @type {string[]}
 * @private
 */
Base64._BASE64_MAPPING = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z', '0', '1', '2', '3',
    '4', '5', '6', '7', '8', '9', '+', '/',
];
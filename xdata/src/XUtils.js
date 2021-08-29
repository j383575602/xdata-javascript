import {TYPE_BYTE_i_1,TYPE_BYTE_i_2,TYPE_BYTE_i_4,TYPE_BYTE_i_8,TYPE_BYTE_f_4,TYPE_BYTE_f_8} from "./XType"
/**
 * Created by wlzhao on 2017/4/22.
 */
export var decodeUTF8 = function(dataView,start,len) {
    var str = '';
    var _arr = dataView;
    for(var i = start; i < start+len; i++) {
        var b = _arr.getInt8(i) & 0xFF;
        if (b >= 0xE0) {
            var b1 = _arr.getInt8(i) & 0xFF;
            var b2 = _arr.getInt8(i+1) & 0xFF;
            var b3 = _arr.getInt8(i+2) & 0xFF;
            var first4  = b1 & 0x0F ;
            var second6 = b2 & 0x3F;
            var third6  = b3 & 0x3F;
            value = (((first4 << 4) | (second6 >> 2)) << 8) | ((second6 << 6) | third6)
            str += String.fromCharCode(value);
            i+=2;
        } else if(b >= 0xC0) {
            var first5 = (_arr.getInt8(i) & 0xFF)& 0x1F;
            var second6 = (_arr.getInt8(i+1) & 0xFF) & 0x3F;
            var value = (first5 << 6) | second6;
            str += String.fromCharCode(value);
            i+=1;
        } else if (b  <= 0x7F) {
            str += String.fromCharCode(b);
        }
    }
    return str;
}

export function encodeUTF8(str){
    var bytes = new Array();
    var len,c;
    len = str.length;
    for(var i = 0; i < len; i++){
        c = str.charCodeAt(i);
        if(c >= 0x010000 && c <= 0x10FFFF){
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        }else if(c >= 0x000800 && c <= 0x00FFFF){
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        }else if(c >= 0x000080 && c <= 0x0007FF){
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        }else{
            bytes.push(c & 0xFF);
        }
    }

    //var reverse = byteToString2(bytes);
    //console.log("origin:" + str + ",reverse:" + reverse);

    return bytes;
}

export var isNumberType = function(type) {
    if (type == TYPE_BYTE_i_1 
        || type == TYPE_BYTE_i_2
        || type == TYPE_BYTE_i_4
        || type == TYPE_BYTE_i_8
        || type == TYPE_BYTE_f_4
        || type == TYPE_BYTE_f_8 
        ) {
            return true
        }
    return false
}

export default {
    isNumberType,
    encodeUTF8,
    decodeUTF8
}




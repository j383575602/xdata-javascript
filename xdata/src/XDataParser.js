/**
 * Created by wlzhao on 2017/3/21.
 */
 
import XData from "./XData"
import * as XType from "./XType"
import {decodeUTF8} from "./XUtils"

export default function XDataParser() {
    this.position = 0;
    this.dataView;
    this.parse = function(buffer) {
        var t0 = new Date().getTime();
        this.dataView = new DataView(buffer);
        var result = this.readData();
        var t1 = new Date().getTime();
        if (this.debug) {
            console.log("parse:type:" + result.getType() + " use:" + (t1 - t0));
        }
        return result;
    }

    this.readData = function () {
        var type = this.readByte4I();
        return this.readDataWithType(type);
    }
    this.readDataWithType = function (type) {
        var result = new XData(type);
        var fieldCount = this.readByte1I();
        for(var i=0;i<fieldCount;i++) {
            var index = this.readByte4I();
            var collectionFlag = index & XType.MASK_TYPE_COLLECTION
            var rawType = index & XType.MASK_TYPE & ~XType.MASK_TYPE_COLLECTION;
            if (collectionFlag == XType.MASK_TYPE_COLLECTION_LIST) {
                result.set(index,this.readListObject(rawType));
            } else if (collectionFlag == XType.MASK_TYPE_COLLECTION_SET) {
                result.set(index,this.readSetObject(rawType));
            } else if (collectionFlag == XType.MASK_TYPE_COLLECTION_STRING_MAP
                || collectionFlag == XType.MASK_TYPE_COLLECTION_INT_MAP
                || collectionFlag == XType.MASK_TYPE_COLLECTION_LONG_MAP
                || collectionFlag == XType.MASK_TYPE_COLLECTION_FLOAT_MAP
                || collectionFlag == XType.MASK_TYPE_COLLECTION_DOUBLE_MAP
                ) {
                    result.set(index,this.readMapObject(collectionFlag,rawType));
            } else if (collectionFlag == 0 ){
                result.set(index,this.readSingleObject(rawType));
            } else {
                throw new Error("collectionFlag is error:" + collectionFlag);
            }
        }
        return result;
    }

    this.readSetObject = function(rawType) {
        var count = this.readByte4I();
        var set = new Set();
        for (var j = 0; j < count; j++) {
            var value = this.readSingleObject(rawType);
            set.add(value);
        }
        return set;
    }


    this.readMapObject = function(collectionFlag,rawType) {
        var count = this.readByte4I();
        var map = new Map();
        for (var j = 0; j < count; j++) {
            var key = undefined;
            if (collectionFlag == XType.MASK_TYPE_COLLECTION_STRING_MAP) {
                key = this.readStringField();
            } else if (collectionFlag == XType.MASK_TYPE_COLLECTION_INT_MAP) {
                key = this.readByte4I();
            } else if (collectionFlag == XType.MASK_TYPE_COLLECTION_LONG_MAP) {
                key = this.readByte8F();
            } else if (collectionFlag == XType.MASK_TYPE_COLLECTION_FLOAT_MAP) {
                key = this.readByte4F();
            } else if (collectionFlag == XType.MASK_TYPE_COLLECTION_DOUBLE_MAP) {
                key = this.readByte8F();
            } else {
                throw new Error("wrong collectionType:" + collectionFlag +" for map: for " + rawType);
            }
            var value = this.readSingleObject(rawType);
            map.set(key,value);
        }
        return map;
    }


    this.readListObject = function (rawType) {
        var count = this.readByte4I();
        var array = new Array();
        for (var j = 0; j < count; j++) {
            var value = this.readSingleObject(rawType);
            array.push(value);
        }
        return array;
    }

    this.readSingleObject = function (rawType) {
        if (rawType == XType.TYPE_BYTE_i_1) {
            return this.readByte1I();
        } else if (rawType == XType.TYPE_BYTE_i_2) {
            return this.readByte2I();
        } else if (rawType == XType.TYPE_BYTE_i_4) {
            return this.readByte4I();
        } else if (rawType == XType.TYPE_BYTE_i_8) {
            return this.readByte8I();
        } else if (rawType == XType.TYPE_BYTE_f_4) {
            return this.readByte4F();
        } else if (rawType == XType.TYPE_BYTE_f_8) {
            return this.readByte8F();
        } else if (rawType == XType.TYPE_STRING) {
           return this.readStringField()
        } else if (rawType == XType.TYPE_BOOLEAN) {
            var b = this.readByte1I();
            return  b == 1;
        } else if (rawType == XType.TYPE_BLOB) {
            var len = this.readByte4I();
            return this.readBytes(len);
        } else if (rawType == XType.TYPE_DATE) {
            var num = this.readByte8F();
            var d = new Date();
            d.setTime(num)
            return d;
        } if(rawType >=XType.TYPE_OBJECT_START) {
            return this.readDataWithType(rawType);
        }
        return undefined;
    }

    this.readStringField = function() {
        var len = this.readByte4I();
        return this.readString(len);
    }

    this.readByte1I = function () {
        var byte = this.dataView.getInt8(this.position);
        this.position++;
        return byte;
    };

    this.readByte2I = function () {
        var i = this.dataView.getInt16(this.position);
        this.position+= 2;
        return i;
    }
    this.readByte4I = function () {
        var i = this.dataView.getInt32(this.position);
        this.position+= 4;
        return i;
    };

    this.readByte8I = function () {
        var i1 = this.dataView.getFloat64(this.position);
         this.position+= 8;
        return i1;
    };

    this.readByte4F = function () {
        var f = this.dataView.getFloat32(this.position);
        this.position+= 4;
        return f;
    };

    this.readByte8F = function () {
        var f = this.dataView.getFloat64(this.position);
        this.position+= 8;
        return f;
    };

    this.readBytes = function (len) {
        var bytes = new ArrayBuffer(len);
        var dataView = new DataView(bytes);
        for (var i=0;i<len;i++) {
            bytes[i] == this.dataView.getInt8(this.position);
            dataView.setInt8(i,this.dataView.getInt8(this.position))
            this.position ++;
        }
        return bytes;
    }

    this.readString = function (len) {
        var str = decodeUTF8(this.dataView,this.position,len);
        this.position += len;
        return str;
    }
}

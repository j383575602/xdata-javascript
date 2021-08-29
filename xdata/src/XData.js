/**
 * Created by wlzhao on 2017/3/15.
 */
import * as XType from "./XType"
// export default class XData {
//     constructor(dataType) {
//     if (dataType) {
//         this.type = dataType;
//         this.fields = {};
//     }
//     }
// }
export default function XData(dataType) {
    this.type = dataType;
    this.fields = new Map();
}

XData.prototype.getType = function () {
    return this.type;
};

XData.prototype.get = function (index) {
    return this.fields.get(index);
}

XData.prototype.set = function (index, value) {
    var basicType = index & XType.MASK_TYPE & ~XType.MASK_TYPE_COLLECTION;
    var collectionFlag = index & XType.MASK_TYPE_COLLECTION;
    if (collectionFlag == XType.MASK_TYPE_COLLECTION_LIST) {
        if (value == undefined) {
            this.fields.delete(index)
        } else if (value instanceof Array) {
            if (value.length == 0) {
               this.fields.delete(index);
            } else {
                this.fields.set(index,value);
            }
        } else {
            throw new Error("wrong value:" + value +" for list: for " + type+"." + index);
        }
    } else if (collectionFlag == XType.MASK_TYPE_COLLECTION_SET) {
        if (value == undefined) {
            this.fields.delete(index);
        } else if (value instanceof Set) {
            if (value.size == 0) {
                this.fields.delete(index);
            } else {
                this.fields.set(index, value);
            }
        } else {
            throw new Error("wrong value:" + value +" for set: for " + type+"." + index);
        }
    } else if(collectionFlag == XType.MASK_TYPE_COLLECTION_STRING_MAP
        || collectionFlag == XType.MASK_TYPE_COLLECTION_INT_MAP
        || collectionFlag == XType.MASK_TYPE_COLLECTION_LONG_MAP
        || collectionFlag == XType.MASK_TYPE_COLLECTION_FLOAT_MAP
        || collectionFlag == XType.MASK_TYPE_COLLECTION_DOUBLE_MAP
        ) {
            if (value == undefined) {
                this.fields.delete(index)
            } else if (value instanceof Map) {
                if (value.size == 0) {
                    this.fields.delete(index)
                } else {
                    this.fields.set(index, value);
                }
            } else {
                throw new Error("wrong value:" + value +" for map: for " + type+"." + index);
            }
    } else if (basicType == XType.TYPE_BYTE_i_1) {
        if (isNaN(value)) {
            throw new Error("wrong value:" + value + " for byte");
        }
        if(value == 0) {
            this.fields.delete(index);
        } else {
            this.fields.set(index,value);
        }
    } else if (basicType == XType.TYPE_BYTE_i_2) {
        if (isNaN(value)) {
            throw new Error("wrong value:" + value + " for short");
        }
        if (value == 0) {
            this.fields.delete(index);
        } else {
            this.fields.set(index, value);
        }
    } else if (basicType == XType.TYPE_BYTE_i_4) {
        if (isNaN(value)) {
            throw new Error("wrong value:" + value + " for integer");
        }
        if (value == 0) {
            this.fields.delete(index);
        } else {
            this.fields.set(index, value);
        }
    } else if (basicType == XType.TYPE_BYTE_i_8) {
        if (isNaN(value)) {
            throw new Error("wrong value:" + value + " for long");
        }
        if (value == 0) {
            this.fields.delete(index);
        } else {
            this.fields.set(index, value);
        }
    } else if (basicType == XType.TYPE_BYTE_f_4) {
        if (isNaN(value)) {
            throw new Error("wrong value:" + value + " for float");
        }
        if (value == 0) {
            this.fields.delete(index);
        } else {
            this.fields.set(index, value);
        }
    } else if (basicType == XType.TYPE_BYTE_f_8) {
        if (isNaN(value)) {
            throw new Error("wrong value:" + value + " for double");
        }
        if (value == 0) {
            this.fields.delete(index);
        } else {
            this.fields.set(index, value);
        }
    } else if (basicType== XType.TYPE_STRING) {
        if (!(value instanceof String) && typeof(value) != 'string') {
            throw new Error("wrong value:'" + value + "'(type:" + value.prototype + ")  for String");
        }
        if (value && value.length > 0) {
            this.fields.set(index, value);
        } else {
            this.fields.delete(index);
        }
    } else if (basicType == XType.TYPE_BLOB) {
        if (!(value instanceof ArrayBuffer)) {
            throw new Error("wrong value:" + value + " for byte[]");
        }
        if (value && value.byteLength > 0) {
            this.fields.set(index, value);
        } else {
            this.fields.delete(index);
        }
    } else if (basicType == XType.TYPE_BOOLEAN) {
        this.fields[index] = value;
    } else if (basicType == XType.TYPE_DATE) {
        if (value == undefined) {
            this.fields.delete(index);
        } else if (!(value instanceof Date)) {
            throw new Error("wrong value:" + value + " for Date");
        } else {
            this.fields.set(index, value);
        }
    } else if (basicType >= XType.TYPE_OBJECT_START) {
        if (value) {
            this.fields.set(index, value);
        } else {
            this.fields.delete(index);
        }
    }
};






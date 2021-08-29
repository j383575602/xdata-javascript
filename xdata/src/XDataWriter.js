/**
 * Created by wlzhao on 2017/3/18.
 */

 import * as XType from "./XType"
 import LinkedBuffer from "./LinkedBuffer"
 import XDataWrapper from "./XDataWrapper"
 import {encodeUTF8} from "./XUtils"
 export default function XDataWriter() {
    this.buffer = new LinkedBuffer(8192);
    this.infoSize = 0;
    this.write = function(data) {
        var t0 = new Date().getTime();
        this.writeData(data);
        var t1 = new Date().getTime();
        if (this.debug) {
            console.log("write use:" + (t1-t0));
        }
        return this.commit();
    }
    this.commit = function () {
        var t0 = new Date().getTime();
        var result = this.buffer.toBytes();
        var t1 = new Date().getTime();
        if (this.debug) {
            console.log("commit use:" + (t1-t0));
        }
        this.infoSize = 0;
        return result;
    }

    this.writeType = function (data) {
        this.writeByte4I(data.getType());
    }
    this.writeFieldCount = function (data) {
        var count = data.fields.size;
        this.writeByte1I(count);
    }

    this.writeFieldValue = function (data) {
        data.fields.forEach((value,key) => {
            this.writeByte4I(key);
            this.infoSize+=4;
            var collectionFlag = key & XType.MASK_TYPE_COLLECTION;
            var rawType = key & XType.MASK_TYPE & ~XType.MASK_TYPE_COLLECTION;
            if (collectionFlag > 0) {
                this.writeCollectionObject(value,collectionFlag,rawType);
            } else {
                this.writeSingleObject(value,rawType);
            }
        })
    }

    this.writeCollectionObject = function(value,collectionFlag,rawType) {
        if (collectionFlag == XType.MASK_TYPE_COLLECTION_LIST) {
            this.writeListObject(value,rawType);
        } else if (collectionFlag == XType.MASK_TYPE_COLLECTION_SET) {
            this.writeSetObject(value,rawType);
        } else {
            this.writeMapObject(value,collectionFlag,rawType);
        }
    }

    this.writeSetObject = function (set, rawType) {
        var len = set.size;
        this.writeByte4I(len);
        this.infoSize += 4;
        set.forEach(element => {
            this.writeSingleObject(element,rawType);
        });
    }


    this.writeListObject = function (array, rawType) {
        var len = array.length;
        this.writeByte4I(len);
        this.infoSize += 4;
        array.forEach(xdata => {
            this.writeSingleObject(xdata,rawType);
        })
    }

    this.writeMapObject = function (map, collectionType,rawType) {
        var len = map.size;
        this.writeByte4I(len);
        this.infoSize += 4;
        map.forEach((value,key) => {
            if (collectionType == XType.MASK_TYPE_COLLECTION_STRING_MAP) {
                this.writeStringField(key);   
            } else if (collectionType == XType.MASK_TYPE_COLLECTION_INT_MAP) {
                this.writeByte4I(key);
            } else if (collectionType == XType.MASK_TYPE_COLLECTION_LONG_MAP) {
                this.writeByte8F(key)
            } else if (collectionType == XType.MASK_TYPE_COLLECTION_FLOAT_MAP) {
                this.writeByte4F(key)
            } else if (collectionType == XType.MASK_TYPE_COLLECTION_DOUBLE_MAP) {
                this.writeByte8F(key);
            }
            this.writeSingleObject(value,rawType);
        })
    }


    this.writeSingleObject = function(value,rawType) {
        if (rawType == XType.TYPE_BYTE_i_1) {
            this.writeByte1I(value);
        } else if (rawType == XType.TYPE_BYTE_i_2) {
            this.writeByte2I(value);
        } else if (rawType == XType.TYPE_BYTE_i_4) {
            this.writeByte4I(value);
        } else if (rawType == XType.TYPE_BYTE_i_8) {
            this.writeByte8I(value);
        } else if (rawType == XType.TYPE_BYTE_f_4) {
            if (value != 0)
                this.writeByte4F(value);
        } else if (rawType == XType.TYPE_BYTE_f_8) {
            this.writeByte8F(value);
        } else if (rawType == XType.TYPE_BOOLEAN) {
            var b = value == true ? 1 : 0;
            this.writeByte1I(b);
        } else if (rawType == XType.TYPE_BLOB) {
            this.writeBlob(value)
        } else if (rawType == XType.TYPE_STRING) {
            this.writeStringField(value)
        } else if (rawType == XType.TYPE_DATE) {
            var num = value.getTime();
            this.writeByte8F(num)
        } else if (rawType >= XType.TYPE_OBJECT_START) {
            this.writeDataWithoutType(value);
        }
    }

    this.writeStringField = function(value) {
        var startPosition = this.buffer.getPosition();
        this.jump(4);
        this.writeString(value);
        var newPosition = this.buffer.getPosition();
        var len = newPosition - startPosition - 4;
        this.seek(startPosition);
        this.writeByte4I(len);
        this.seek(newPosition);
    }

    this.writeData = function(data) {
        if (data instanceof XDataWrapper) {
            if (data._data != null) {
                var xdata = data._data;
                this.doWriteData(xdata);
            } else {
                this.doWriteData(data);
            }
        } else {
            this.doWriteData(data);
        }        
    }

    this.writeDataWithoutType = function(data) {
        if (data instanceof XDataWrapper) {
            if (data._data != null) {
                var xdata = data._data;
                this.doWriteDataWithoutType(xdata);
            } else {
                this.doWriteDataWithoutType(data);
            }
        } else {
            this.doWriteDataWithoutType(data);
        }        
    }

    this.doWriteData = function (data) {
        this.writeType(data);
        this.doWriteDataWithoutType(data);
    }

    this.doWriteDataWithoutType = function(data) {
        this.writeFieldCount(data);
        this.writeFieldValue(data);
    }

    this.writeByte1I = function (b1) {
        this.buffer.writeByte(b1);
    }
    this.writeByte2I = function (b2) {
        this.buffer.writeByte((b2 >> 8) & 0xFF);
        this.buffer.writeByte(b2 & 0xFF);
    }
    this.writeByte4I = function (b4) {
        for (var index = 3; index >= 0; index--) {
            this.buffer.writeByte((b4 >> index * 8) & 0xFF);
        }
    }
    this.writeByte8I = function (b8) {
        var bytes = new ArrayBuffer(8);
        var dataView = new DataView(bytes);
        dataView.setFloat64(0,b8);
        for(var i=0;i<8;i++) {
            this.buffer.writeByte(dataView.getInt8(i));
        }
    }
    this.writeByte4F = function (f4) {
        var bytes = new ArrayBuffer(4);
        var dataView = new DataView(bytes);
        dataView.setFloat32(0,f4);
        for(var i=0;i<4;i++) {
            this.buffer.writeByte(dataView.getInt8(i));
        }

    }
    this.writeByte8F = function (f8) {
        var bytes = new ArrayBuffer(8);
        var dataView = new DataView(bytes);
        dataView.setFloat64(0,f8);
        for(var i=0;i<8;i++) {
            this.buffer.writeByte(dataView.getInt8(i));
        }
    }

    this.writeBlob = function (byteArray) {
        this.writeByte4I(byteArray.byteLength);
        this.buffer.writeBytes(byteArray);
    }

    this.writeString = function (string) {
        var bytes = encodeUTF8(string);
        for(var index in bytes) {
            this.buffer.writeByte(bytes[index]);
        }
    }

    this.jump = function (count) {
        this.buffer.jump(count);
    }
    this.seek =function (pos) {
        this.buffer.seek(pos);
    }
}
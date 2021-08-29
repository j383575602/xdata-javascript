import XData from "./XData"
import XDataWrapper from "./XDataWrapper"
import XBaseRecord from "./XBaseRecord"


export default function XBaseRecordWrapper(arg){
    if (arg instanceof XData) {
        XBaseRecordWrapper.prototype.constructor.call(this, arg);
    } else {
        XBaseRecordWrapper.prototype.constructor.call(this, XBaseRecord.prototype.TYPE_INDEX);
    }
}

XBaseRecordWrapper.prototype = new XDataWrapper();
XBaseRecordWrapper.prototype.constructor = XDataWrapper;
Object.defineProperty(XBaseRecordWrapper.prototype,"_ID",{
    /**
    *@param {String} _ID
    */
    set: function (_ID) {
        this.set(XBaseRecord.prototype._ID,_ID);
    },
    /**
    *@returns {int32}
    */
    get: function () {
        return this.get(XBaseRecord.prototype._ID);
    }
})

Object.defineProperty(XBaseRecordWrapper.prototype,"STATUS",{
    /**
    *@param {int8} STATUS
    */
    set: function (_ID) {
        this.set(XBaseRecord.prototype.STATUS,STATUS);
    },
    /**
    *@returns {int8}
    */
    get: function () {
        return this.get(XBaseRecord.prototype.STATUS);
    }
})

Object.defineProperty(XBaseRecordWrapper.prototype,"ADD_VERSION",{
    /**
    *@param {int16} ADD_VERSION
    */
    set: function (ADD_VERSION) {
        this.set(XBaseRecord.prototype.ADD_VERSION,ADD_VERSION);
    },
    /**
    *@returns {int16}
    */
    get: function () {
        return this.get(XBaseRecord.prototype.ADD_VERSION);
    }
})

Object.defineProperty(XBaseRecordWrapper.prototype,"VERSION",{
    /**
    *@param {int16} VERSION
    */
    set: function (VERSION) {
        this.set(XBaseRecord.prototype.VERSION,VERSION);
    },
    /**
    *@returns {int16}
    */
    get: function () {
        return this.get(XBaseRecord.prototype.VERSION);
    }
})

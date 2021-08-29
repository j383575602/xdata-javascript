import XData from "./XData"

export default function XDataWrapper(arg) {
    if (arg instanceof XData){
        this._data = arg
    } else if (isNaN(arg)) {
        //throw new Error("must be number or xdata")
    } else {
        XDataWrapper.prototype.constructor.call(this,arg);
    }
}

XDataWrapper.prototype = new XData();
XDataWrapper.prototype.constructor = XData;
XDataWrapper.prototype.getType = function () {
    return this._data == null ? XDataWrapper.prototype.constructor.prototype.getType.call(this): this._data.getType();
}

XDataWrapper.prototype.set = function (index, value) {
    if (this._data != null) {
        this._data.set(index,value);
    } else {
        XDataWrapper.prototype.constructor.prototype.set.call(this,index,value);
    }
}

XDataWrapper.prototype.get = function (index) {
    if (this._data != null) {
        return this._data.get(index);
    } else {
        return XDataWrapper.prototype.constructor.prototype.get.call(this,index);
    }
}
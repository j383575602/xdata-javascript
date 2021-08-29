import XData from "./XData"
import XDataWrapper from "./XDataWrapper"
import XObjectRef from "./ObjectRef"


export default function XObjectRefWrapper(arg){
    if (arg instanceof XData) {
        XObjectRefWrapper.prototype.constructor.call(this, arg);
    } else {
        XObjectRefWrapper.prototype.constructor.call(this, XObjectRef.prototype.TYPE_INDEX);
    }
}

XObjectRefWrapper.prototype = new XDataWrapper();
XObjectRefWrapper.prototype.constructor = XDataWrapper;
Object.defineProperty(XObjectRefWrapper.prototype,"OWNER_ID",{
    /**
    *@param {int32} OWNER_ID
    */
    set: function (OWNER_ID) {
        this.set(XObjectRef.prototype.OWNER_ID,OWNER_ID);
    },
    /**
    *@returns {int32}
    */
    get: function () {
        return this.get(XObjectRef.prototype.OWNER_ID);
    }
})

Object.defineProperty(XObjectRefWrapper.prototype,"OWNER_TYPE",{
    /**
    *@param {int32} OWNER_TYPE
    */
    set: function (OWNER_TYPE) {
        this.set(XObjectRef.prototype.OWNER_TYPE,OWNER_TYPE);
    },
    /**
    *@returns {int32}
    */
    get: function () {
        return this.get(XObjectRef.prototype.OWNER_TYPE);
    }
})

Object.defineProperty(XObjectRefWrapper.prototype,"OWNER_PROP",{
    /**
    *@param {int32} OWNER_PROP
    */
    set: function (OWNER_PROP) {
        this.set(XObjectRef.prototype.OWNER_PROP,OWNER_PROP);
    },
    /**
    *@returns {int16}
    */
    get: function () {
        return this.get(XObjectRef.prototype.ADD_VERSION);
    }
})

Object.defineProperty(XObjectRefWrapper.prototype,"REF_TYPE",{
    /**
    *@param {int32} REF_TYPE
    */
    set: function (REF_TYPE) {
        this.set(XObjectRef.prototype.REF_TYPE,REF_TYPE);
    },
    /**
    *@returns {int16}
    */
    get: function () {
        return this.get(XObjectRef.prototype.REF_TYPE);
    }
})

Object.defineProperty(XObjectRefWrapper.prototype,"REF_ID",{
    /**
    *@param {int32} REF_ID
    */
    set: function (REF_TYPE) {
        this.set(XObjectRef.prototype.REF_ID,REF_ID);
    },
    /**
    *@returns {int32}
    */
    get: function () {
        return this.get(XObjectRef.prototype.REF_ID);
    }
})

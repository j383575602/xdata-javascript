
/**
 * Created by wlzhao on 2017/4/3.
 */
import {TYPE_BYTE_i_4,TYPE_OBJECT_REF} from "./XType"
import XBaseRecord from "./XBaseRecord"
export default function ObjectRef() {}
ObjectRef.prototype = new XBaseRecord();
ObjectRef.prototype.TYPE_INDEX = TYPE_OBJECT_REF;
ObjectRef.prototype.OWNER_ID   = 5 | TYPE_BYTE_i_4;
ObjectRef.prototype.OWNER_TYPE = 6 | TYPE_BYTE_i_4;
ObjectRef.prototype.OWNER_PROP = 7 | TYPE_BYTE_i_4;
ObjectRef.prototype.REF_TYPE   = 8 | TYPE_BYTE_i_4;
ObjectRef.prototype.REF_ID     = 9 | TYPE_BYTE_i_4;


/**
 * Created by wlzhao on 2017/3/6.
 */
import * as XType from "./XType"
export default class XBaseRecord {
}
XBaseRecord.prototype.TYPE_INDEX     = XType.TYPE_BASS_RECORD;
XBaseRecord.prototype._ID            = 1 | XType.TYPE_BYTE_i_4;
XBaseRecord.prototype.STATUS         = 2 | XType.TYPE_BYTE_i_1;
XBaseRecord.prototype.ADD_VERSION    = 3 | XType.TYPE_BYTE_i_2;
XBaseRecord.prototype.VERSION        = 4 | XType.TYPE_BYTE_i_2;


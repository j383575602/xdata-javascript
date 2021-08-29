
/**
 *Created by wlzhao on 2017/2/20.
 *最大类型class数量：0xFFFFFF个，65535*16
 *单个类字段数：0xFF个，约256个,为了省空间，限制在127.已经足够大了
 *支持列表，还保留4个集合类型，9个基础类型,Boolean类型不支持，使用int表示
 */

 /**集合类型掩码*/

export const OBJECT_INDEX_OFFSET  = 15;
export const MASK_TYPE_COLLECTION             = 0x00007000;
export const MASK_TYPE_COLLECTION_LIST        = 0x00001000;
export const MASK_TYPE_COLLECTION_SET         = 0x00002000;
export const MASK_TYPE_COLLECTION_INT_MAP     = 0x00003000;
export const MASK_TYPE_COLLECTION_STRING_MAP  = 0x00004000;
export const MASK_TYPE_COLLECTION_LONG_MAP    = 0x00005000;
export const MASK_TYPE_COLLECTION_FLOAT_MAP   = 0x00006000;
export const MASK_TYPE_COLLECTION_DOUBLE_MAP  = 0x00007000;

export const MASK_TYPE            = 0xFFFFFF00;
/**索引掩码*/
export const MASK_INDEX           = 0x000000FF;
/**Boolean 1位 */
export const TYPE_BOOLEAN         = 0x00000100;
/**8bit 整形，对应java byte*/
export const TYPE_BYTE_i_1        = 0x00000200 ;
/**16bit 整形，对应java short*/
export const TYPE_BYTE_i_2        = 0x00000300;
/**32bit 整形，对应java integer*/
export const TYPE_BYTE_i_4        = 0x00000400;
/**64bit 整形，对应java long*/
export const TYPE_BYTE_i_8        = 0x00000500;
/**32bit 浮点，对应java float*/
export const TYPE_BYTE_f_4        = 0x00000600;
/**64bit 浮点，对应java double*/
export const TYPE_BYTE_f_8        = 0x00000700;
/**字符串，对应java String*/
export const TYPE_STRING          = 0x00000800;
/**二进制数据，对应java byte[]*/
export const TYPE_BLOB            = 0x00000900;
/**预留*/
export const TYPE_DATE            = 0x00000A00;
/**预留*/
export const TYPE_UNKNOWN_1       = 0x00000B00;
/**预留*/
export const TYPE_UNKNOWN_2       = 0x00000C00;
/**预留*/
export const TYPE_UNKNOWN_3       = 0x00000D00;
/**预留*/
export const TYPE_UNKNOWN_4       = 0x00000E00;
/**预留*/
export const TYPE_UNKNOWN_5       = 0x00000F00;
/**复杂类型起始*/
export const TYPE_OBJECT_START    = 0x00008FFF;

/**系统基础对象*/
export const TYPE_BASS_RECORD     = ((TYPE_OBJECT_START >> OBJECT_INDEX_OFFSET) + 1) << OBJECT_INDEX_OFFSET;
/**对象关联关系*/
export const TYPE_OBJECT_REF      = ((TYPE_OBJECT_START >> OBJECT_INDEX_OFFSET) + 2) << OBJECT_INDEX_OFFSET;
/**应用自定义类型的基础值，预留200给系统手动处理*/
export const TYPE_CUSTOMER_START  = ((TYPE_OBJECT_START >> OBJECT_INDEX_OFFSET) + 200) << OBJECT_INDEX_OFFSET;
/**应用自定义类型的基础值，预留100给系统应用手动处理*/
export const TYPE_PROJECT_START   = ((TYPE_OBJECT_START >> OBJECT_INDEX_OFFSET) + 300) << OBJECT_INDEX_OFFSET;

export default {
    MASK_TYPE,
    MASK_INDEX,
    TYPE_BOOLEAN,
    TYPE_BYTE_i_1,
    TYPE_BYTE_i_2,
    TYPE_BYTE_i_4,
    TYPE_BYTE_i_8,
    TYPE_BYTE_f_4,
    TYPE_BYTE_f_8,
    TYPE_STRING,
    TYPE_BLOB,
    TYPE_DATE,
    TYPE_OBJECT_START,
    TYPE_BASS_RECORD,
    TYPE_OBJECT_REF,
    TYPE_CUSTOMER_START,
    TYPE_PROJECT_START,
    MASK_TYPE_COLLECTION,
    MASK_TYPE_COLLECTION_LIST,
    MASK_TYPE_COLLECTION_SET,
    MASK_TYPE_COLLECTION_INT_MAP,
    MASK_TYPE_COLLECTION_STRING_MAP,
    MASK_TYPE_COLLECTION_LONG_MAP,
    MASK_TYPE_COLLECTION_FLOAT_MAP,
    MASK_TYPE_COLLECTION_FLOAT_MAP,
    MASK_TYPE_COLLECTION_DOUBLE_MAP,
    OBJECT_INDEX_OFFSET
}

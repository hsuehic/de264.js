/**
 * Created by gd on 16/5/12.
 */
define([
    'de264/common',
    'de264/defs',
    'de264/queuebuffer',
    'de264/util'
], function(_common, _defs, _queuebuffer, _util) {

    var coeff_map_nc_0_2 = {
        0x00018000: [0, 0],
        0x00061400: [0, 1],
        0x00024000: [1, 1],
        0x00080700: [0, 2],
        0x00061000: [1, 2],
        0x00032000: [2, 2],
        0x00090380: [0, 3],
        0x00080600: [1, 3],
        0x00070A00: [2, 3],
        0x00051800: [3, 3],
        0x000A01C0: [0, 4],
        0x00090300: [1, 4],
        0x00080500: [2, 4],
        0x00060C00: [3, 4],
        0x000B00E0: [0, 5],
        0x000A0180: [1, 5],
        0x00090280: [2, 5],
        0x00070800: [3, 5],
        0x000D0078: [0, 6],
        0x000B00C0: [1, 6],
        0x000A0140: [2, 6],
        0x00080400: [3, 6],
        0x000D0058: [0, 7],
        0x000D0070: [1, 7],
        0x000B00A0: [2, 7],
        0x00090200: [3, 7],
        0x000D0040: [0, 8],
        0x000D0050: [1, 8],
        0x000D0068: [2, 8],
        0x000A0100: [3, 8],
        0x000E003C: [0, 9],
        0x000E0038: [1, 9],
        0x000D0048: [2, 9],
        0x000B0080: [3, 9],
        0x000E002C: [0, 10],
        0x000E0028: [1, 10],
        0x000E0034: [2, 10],
        0x000D0060: [3, 10],
        0x000F001E: [0, 11],
        0x000F001C: [1, 11],
        0x000E0024: [2, 11],
        0x000E0030: [3, 11],
        0x000F0016: [0, 12],
        0x000F0014: [1, 12],
        0x000F001A: [2, 12],
        0x000E0020: [3, 12],
        0x0010000F: [0, 13],
        0x000F0002: [1, 13],
        0x000F0012: [2, 13],
        0x000F0018: [3, 13],
        0x0010000B: [0, 14],
        0x0010000E: [1, 14],
        0x0010000D: [2, 14],
        0x000F0010: [3, 14],
        0x00100007: [0, 15],
        0x0010000A: [1, 15],
        0x00100009: [2, 15],
        0x0010000C: [3, 15],
        0x00100004: [0, 16],
        0x00100006: [1, 16],
        0x00100005: [2, 16],
        0x00100008: [3, 16]
    };

    var coeff_map_nc_2_4 = {
        0x0002C000: [0, 0],
        0x00062C00: [0, 1],
        0x00028000: [1, 1],
        0x00061C00: [0, 2],
        0x00053800: [1, 2],
        0x00036000: [2, 2],
        0x00070E00: [0, 3],
        0x00062800: [1, 3],
        0x00062400: [2, 3],
        0x00045000: [3, 3],
        0x00080700: [0, 4],
        0x00061800: [1, 4],
        0x00061400: [2, 4],
        0x00044000: [3, 4],
        0x00080400: [0, 5],
        0x00070C00: [1, 5],
        0x00070A00: [2, 5],
        0x00053000: [3, 5],
        0x00090380: [0, 6],
        0x00080600: [1, 6],
        0x00080500: [2, 6],
        0x00062000: [3, 6],
        0x000B01E0: [0, 7],
        0x00090300: [1, 7],
        0x00090280: [2, 7],
        0x00061000: [3, 7],
        0x000B0160: [0, 8],
        0x000B01C0: [1, 8],
        0x000B01A0: [2, 8],
        0x00070800: [3, 8],
        0x000C00F0: [0, 9],
        0x000B0140: [1, 9],
        0x000B0120: [2, 9],
        0x00090200: [3, 9],
        0x000C00B0: [0, 10],
        0x000C00E0: [1, 10],
        0x000C00D0: [2, 10],
        0x000B0180: [3, 10],
        0x000C0080: [0, 11],
        0x000C00A0: [1, 11],
        0x000C0090: [2, 11],
        0x000B0100: [3, 11],
        0x000D0078: [0, 12],
        0x000D0070: [1, 12],
        0x000D0068: [2, 12],
        0x000C00C0: [3, 12],
        0x000D0058: [0, 13],
        0x000D0050: [1, 13],
        0x000D0048: [2, 13],
        0x000D0060: [3, 13],
        0x000D0038: [0, 14],
        0x000E002C: [1, 14],
        0x000D0030: [2, 14],
        0x000D0040: [3, 14],
        0x000E0024: [0, 15],
        0x000E0020: [1, 15],
        0x000E0028: [2, 15],
        0x000D0008: [3, 15],
        0x000E001C: [0, 16],
        0x000E0018: [1, 16],
        0x000E0014: [2, 16],
        0x000E0010: [3, 16]
    };

    var coeff_map_nc_4_8 = {
        0x0004F000: [0, 0],
        0x00063C00: [0, 1],
        0x0004E000: [1, 1],
        0x00062C00: [0, 2],
        0x00057800: [1, 2],
        0x0004D000: [2, 2],
        0x00062000: [0, 3],
        0x00056000: [1, 3],
        0x00057000: [2, 3],
        0x0004C000: [3, 3],
        0x00071E00: [0, 4],
        0x00055000: [1, 4],
        0x00055800: [2, 4],
        0x0004B000: [3, 4],
        0x00071600: [0, 5],
        0x00054000: [1, 5],
        0x00054800: [2, 5],
        0x0004A000: [3, 5],
        0x00071200: [0, 6],
        0x00063800: [1, 6],
        0x00063400: [2, 6],
        0x00049000: [3, 6],
        0x00071000: [0, 7],
        0x00062800: [1, 7],
        0x00062400: [2, 7],
        0x00048000: [3, 7],
        0x00080F00: [0, 8],
        0x00071C00: [1, 8],
        0x00071A00: [2, 8],
        0x00056800: [3, 8],
        0x00080B00: [0, 9],
        0x00080E00: [1, 9],
        0x00071400: [2, 9],
        0x00063000: [3, 9],
        0x00090780: [0, 10],
        0x00080A00: [1, 10],
        0x00080D00: [2, 10],
        0x00071800: [3, 10],
        0x00090580: [0, 11],
        0x00090700: [1, 11],
        0x00080900: [2, 11],
        0x00080C00: [3, 11],
        0x00090400: [0, 12],
        0x00090500: [1, 12],
        0x00090680: [2, 12],
        0x00080800: [3, 12],
        0x000A0340: [0, 13],
        0x00090380: [1, 13],
        0x00090480: [2, 13],
        0x00090600: [3, 13],
        0x000A0240: [0, 14],
        0x000A0300: [1, 14],
        0x000A02C0: [2, 14],
        0x000A0280: [3, 14],
        0x000A0140: [0, 15],
        0x000A0200: [1, 15],
        0x000A01C0: [2, 15],
        0x000A0180: [3, 15],
        0x000A0040: [0, 16],
        0x000A0100: [1, 16],
        0x000A00C0: [2, 16],
        0x000A0080: [3, 16]
    };

    var coeff_map_nc_8 = {
        0x00060C00: [0, 0],
        0x00060000: [0, 1],
        0x00060400: [1, 1],
        0x00061000: [0, 2],
        0x00061400: [1, 2],
        0x00061800: [2, 2],
        0x00062000: [0, 3],
        0x00062400: [1, 3],
        0x00062800: [2, 3],
        0x00062C00: [3, 3],
        0x00063000: [0, 4],
        0x00063400: [1, 4],
        0x00063800: [2, 4],
        0x00063C00: [3, 4],
        0x00064000: [0, 5],
        0x00064400: [1, 5],
        0x00064800: [2, 5],
        0x00064C00: [3, 5],
        0x00065000: [0, 6],
        0x00065400: [1, 6],
        0x00065800: [2, 6],
        0x00065C00: [3, 6],
        0x00066000: [0, 7],
        0x00066400: [1, 7],
        0x00066800: [2, 7],
        0x00066C00: [3, 7],
        0x00067000: [0, 8],
        0x00067400: [1, 8],
        0x00067800: [2, 8],
        0x00067C00: [3, 8],
        0x00068000: [0, 9],
        0x00068400: [1, 9],
        0x00068800: [2, 9],
        0x00068C00: [3, 9],
        0x00069000: [0, 10],
        0x00069400: [1, 10],
        0x00069800: [2, 10],
        0x00069C00: [3, 10],
        0x0006A000: [0, 11],
        0x0006A400: [1, 11],
        0x0006A800: [2, 11],
        0x0006AC00: [3, 11],
        0x0006B000: [0, 12],
        0x0006B400: [1, 12],
        0x0006B800: [2, 12],
        0x0006BC00: [3, 12],
        0x0006C000: [0, 13],
        0x0006C400: [1, 13],
        0x0006C800: [2, 13],
        0x0006CC00: [3, 13],
        0x0006D000: [0, 14],
        0x0006D400: [1, 14],
        0x0006D800: [2, 14],
        0x0006DC00: [3, 14],
        0x0006E000: [0, 15],
        0x0006E400: [1, 15],
        0x0006E800: [2, 15],
        0x0006EC00: [3, 15],
        0x0006F000: [0, 16],
        0x0006F400: [1, 16],
        0x0006F800: [2, 16],
        0x0006FC00: [3, 16]
    };

    var coeff_map_nc_m1 = {
        0x00024000: [0, 0],
        0x00061C00: [0, 1],
        0x00018000: [1, 1],
        0x00061000: [0, 2],
        0x00061800: [1, 2],
        0x00032000: [2, 2],
        0x00060C00: [0, 3],
        0x00070600: [1, 3],
        0x00070400: [2, 3],
        0x00061400: [3, 3],
        0x00060800: [0, 4],
        0x00080300: [1, 4],
        0x00080200: [2, 4],
        0x00070000: [3, 4],
    };

    var total_zeros_map = [{
        /* totalCoeff == 1 */
        0x00018000: 0,
        0x00036000: 1,
        0x00034000: 2,
        0x00043000: 3,
        0x00042000: 4,
        0x00051800: 5,
        0x00051000: 6,
        0x00060C00: 7,
        0x00060800: 8,
        0x00070600: 9,
        0x00070400: 10,
        0x00080300: 11,
        0x00080200: 12,
        0x00090180: 13,
        0x00090100: 14,
        0x00090080: 15
    }, {
        /* totalCoeff == 2 */
        0x0003E000: 0,
        0x0003C000: 1,
        0x0003A000: 2,
        0x00038000: 3,
        0x00036000: 4,
        0x00045000: 5,
        0x00044000: 6,
        0x00043000: 7,
        0x00042000: 8,
        0x00051800: 9,
        0x00051000: 10,
        0x00060C00: 11,
        0x00060800: 12,
        0x00060400: 13,
        0x00060000: 14
    }, {
        /* totalCoeff == 3 */
        0x00045000: 0,
        0x0003E000: 1,
        0x0003C000: 2,
        0x0003A000: 3,
        0x00044000: 4,
        0x00043000: 5,
        0x00038000: 6,
        0x00036000: 7,
        0x00042000: 8,
        0x00051800: 9,
        0x00051000: 10,
        0x00060400: 11,
        0x00050800: 12,
        0x00060000: 13,
    }, {
        /* totalCoeff == 4 */
        0x00051800: 0,
        0x0003E000: 1,
        0x00045000: 2,
        0x00044000: 3,
        0x0003C000: 4,
        0x0003A000: 5,
        0x00038000: 6,
        0x00043000: 7,
        0x00036000: 8,
        0x00042000: 9,
        0x00051000: 10,
        0x00050800: 11,
        0x00050000: 12,
    }, {
        /* totalCoeff == 5 */
        0x00045000: 0,
        0x00044000: 1,
        0x00043000: 2,
        0x0003E000: 3,
        0x0003C000: 4,
        0x0003A000: 5,
        0x00038000: 6,
        0x00036000: 7,
        0x00042000: 8,
        0x00050800: 9,
        0x00041000: 10,
        0x00050000: 11,
    }, {
        /* totalCoeff == 6 */
        0x00060400: 0,
        0x00050800: 1,
        0x0003E000: 2,
        0x0003C000: 3,
        0x0003A000: 4,
        0x00038000: 5,
        0x00036000: 6,
        0x00034000: 7,
        0x00041000: 8,
        0x00032000: 9,
        0x00060000: 10,
    }, {
        /* totalCoeff == 7 */
        0x00060400: 0,
        0x00050800: 1,
        0x0003A000: 2,
        0x00038000: 3,
        0x00036000: 4,
        0x0002C000: 5,
        0x00034000: 6,
        0x00041000: 7,
        0x00032000: 8,
        0x00060000: 9,
    }, {
        /* totalCoeff == 8 */
        0x00060400: 0,
        0x00041000: 1,
        0x00050800: 2,
        0x00036000: 3,
        0x0002C000: 4,
        0x00028000: 5,
        0x00034000: 6,
        0x00032000: 7,
        0x00060000: 8,
    }, {
        /* totalCoeff == 9 */
        0x00060400: 0,
        0x00060000: 1,
        0x00041000: 2,
        0x0002C000: 3,
        0x00028000: 4,
        0x00032000: 5,
        0x00024000: 6,
        0x00050800: 7,
    }, {
        /* totalCoeff == 10 */
        0x00050800: 0,
        0x00050000: 1,
        0x00032000: 2,
        0x0002C000: 3,
        0x00028000: 4,
        0x00024000: 5,
        0x00041000: 6,
    }, {
        /* totalCoeff == 11 */
        0x00040000: 0,
        0x00041000: 1,
        0x00032000: 2,
        0x00034000: 3,
        0x00018000: 4,
        0x00036000: 5,
    }, {
        /* totalCoeff == 12 */
        0x00040000: 0,
        0x00041000: 1,
        0x00024000: 2,
        0x00018000: 3,
        0x00032000: 4,
    }, {
        /* totalCoeff == 13 */
        0x00030000: 0,
        0x00032000: 1,
        0x00018000: 2,
        0x00024000: 3,
    }, {
        /* totalCoeff == 14 */
        0x00020000: 0,
        0x00024000: 1,
        0x00018000: 2,
    }, {
        /* totalCoeff == 15 */
        0x00010000: 0,
        0x00018000: 1,
    }];

    var run_before_map = [{
        0x00018000: 0,
        0x00010000: 1,
    }, {
        0x00018000: 0,
        0x00024000: 1,
        0x00020000: 2,
    }, {
        0x0002C000: 0,
        0x00028000: 1,
        0x00024000: 2,
        0x00020000: 3,
    }, {
        0x0002C000: 0,
        0x00028000: 1,
        0x00024000: 2,
        0x00032000: 3,
        0x00030000: 4,
    }, {
        0x0002C000: 0,
        0x00028000: 1,
        0x00036000: 2,
        0x00034000: 3,
        0x00032000: 4,
        0x00030000: 5,
    }, {
        0x0002C000: 0,
        0x00030000: 1,
        0x00032000: 2,
        0x00036000: 3,
        0x00034000: 4,
        0x0003A000: 5,
        0x00038000: 6,
    }, {
        0x0003E000: 0,
        0x0003C000: 1,
        0x0003A000: 2,
        0x00038000: 3,
        0x00036000: 4,
        0x00034000: 5,
        0x00032000: 6,
        0x00041000: 7,
        0x00050800: 8,
        0x00060400: 9,
        0x00070200: 10,
        0x00080100: 11,
        0x00090080: 12,
        0x000A0040: 13,
        0x000B0020: 14,
    }
    ];

    var MbPartPredMode = function(mb_type, slice_type) {
        if (_common.isISlice(slice_type)) {
            if (mb_type === 0) {
                return _defs.PRED_MODE_INTRA4x4;
            } else {
                return _defs.PRED_MODE_INTRA16x16;
            }
        } else {
            return _defs.PRED_MODE_INTER;
        }
    };
    var NumMbPart = function(mb_type) {
        switch (mb_type) {
            case _defs.P_L0_16x16:
            case _defs.P_Skip:
                return 1;
            case  _defs.P_L0_L0_16x8:
            case _defs.P_L0_L0_8x16:
                return 2;
            default: /* P_8x8, P_8x8ref0 */
                return 4;

        }
    };
    var NumSubMbPart = function(sub_mb_type) {
        switch (sub_mb_type) {
            case 0:
                return 1;
            case 1:
            case 2:
                return 2;
            default:
                return 4;
        }
    };

    function sub_mb_pred(mb_type) {
        var qb = this.qb;
        this.sub_mb_type = [];
        for (var mbPartIdx = 0; mbPartIdx < 4; mbPartIdx++) {
            this.sub_mb_type[mbPartIdx] = qb.deqUe();
        }
        this.ref_idx_l0 = [];
        for (var mbPartIdx = 0; mbPartIdx < 4; mbPartIdx++) { /* SubMbPredMode(sub_mb_type[mbPartIdx]) is Prd_L0 for P slice */
            if ((this.num_ref_idx_l0_active_minus1 > 0 || this.mb_field_decoding_flag) && mb_type !== _defs.P_8x8ref0 && this.sub_mb_type[mbPartIdx] !== _defs.B_Direct_8x8) { // TODO: SubMbPredMode()
                this.ref_idx_l0[mbPartIdx] = qb.deqTe(this.num_ref_idx_l0_active_minus1 > 1);
            }
        }

        /* SubMbPredMode(sub_mb_type[mbPartIdx]) is Prd_L0 for P slice, so no need to parse ref_idx_l1 */

        this.mvd_l0 = [];
        for (var mbPartIdx = 0; mbPartIdx < 4; mbPartIdx++) {
            this.mvd_l0[mbPartIdx] = [];
            if (this.sub_mb_type[mbPartIdx] !== _defs.B_Direct_8x8) {
                for (var subMbPartIdx = 0; subMbPartIdx < NumSubMbPart(this.sub_mb_type[mbPartIdx]); subMbPartIdx++) {
                    this.mvd_l0[mbPartIdx][subMbPartIdx] = [];
                    for (var compIdx = 0; compIdx < 2; compIdx++) {
                        this.mvd_l0[mbPartIdx][subMbPartIdx][compIdx] = qb.deqSe();
                    }
                }
            }
        }
        /* SubMbPredMode(sub_mb_type[mbPartIdx]) is Prd_L0 for P slice, so no need to parse follow */
    }

    function mb_pred(mb_type) {
        var qb = this.qb;
        switch (MbPartPredMode(mb_type, this.slice.slice_type)) {
            case _defs.PRED_MODE_INTER:
                if (this.num_ref_idx_l0_active_minus1 > 0) {
                    this.ref_idx_l0 = [];
                    for (var i = NumMbPart(mb_type), j = 0; i--; j++) {
                        this.ref_idx_l0[j] = qb.deqTe((this.num_ref_idx_l0_active_minus1 > 1));
                    }
                }
                this.mvd_l0 = [];
                for (var i = NumMbPart(mb_type), j = 0; i--; j++) {
                    this.mvd_l0[j] = {hor: qb.deqSe(), ver: qb.deqSe()};
                }
                break;
            case _defs.PRED_MODE_INTRA4x4:
                this.prev_intra4x4_pred_mode_flag = [];
                this.rem_intra4x4_pred_mode = [];
                for (var luma4x4BlkIdx = 0; luma4x4BlkIdx < 16; luma4x4BlkIdx++) {
                    this.prev_intra4x4_pred_mode_flag[luma4x4BlkIdx] = qb.deqBits(1);
                    if (!this.prev_intra4x4_pred_mode_flag[luma4x4BlkIdx]) {
                        this.rem_intra4x4_pred_mode[luma4x4BlkIdx] = qb.deqBits(3);
                    }
                }
            /* falls through */
            case _defs.PRED_MODE_INTRA16x16:
                this.intra_chroma_pred_mode = qb.deqUe();
                break;
        }
    }

    function calcNC(blockIndex) {
        var neighbourA = _common.getNeighbourA4x4(blockIndex);
        var neighbourB = _common.getNeighbourB4x4(blockIndex);
        var nc = 0;

        if (neighbourA[0] === _defs.MB_CURR && neighbourB[0] === _defs.MB_CURR) {
            nc = (this.totalCoeff[neighbourA[1]] + this.totalCoeff[neighbourB[1]] + 1) >> 1;
        } else if (neighbourA[0] === _defs.MB_CURR) {
            nc = this.totalCoeff[neighbourA[1]];
            if (_common.isNeighbourAvailable(this, this.mbB)) {
                nc = (nc + this.mbB.totalCoeff[neighbourB[1]] + 1) >> 1;
            }
        } else if (neighbourB[0] === _defs.MB_CURR) {
            nc = this.totalCoeff[neighbourB[1]];
            if (_common.isNeighbourAvailable(this, this.mbA)) {
                nc = (nc + this.mbA.totalCoeff[neighbourA[1]] + 1) >> 1;
            }
        } else {
            var tmp = 0;
            if (_common.isNeighbourAvailable(this, this.mbA)) {
                nc = this.mbA.totalCoeff[neighbourA[1]];
                tmp = 1;
            }
            if (_common.isNeighbourAvailable(this, this.mbB)) {
                if (tmp) {
                    nc = (nc + this.mbB.totalCoeff[neighbourB[1]] + 1) >> 1;
                } else {
                    nc = this.mbB.totalCoeff[neighbourB[1]];
                }
            }
        }
        return nc || 0;
    }

    function decodeCoeffToken(qb, nc) {
        var state = 0x00000000;
        if (0 <= nc && nc < 2) {
            for (var size = 0; size < 16; size++) {
                var bit = qb.deqBits(1);
                state += 1 << 16;
                state |= bit << (15 - size);
                if (coeff_map_nc_0_2[state] !== undefined) {
                    return coeff_map_nc_0_2[state];
                }
            }
        } else if (2 <= nc && nc < 4) {
            for (var size = 0; size < 16; size++) {
                var bit = qb.deqBits(1);
                state += 1 << 16;
                state |= bit << (15 - size);
                if (coeff_map_nc_2_4[state] !== undefined) {
                    return coeff_map_nc_2_4[state];
                }
            }
        } else if (4 <= nc && nc < 8) {
            for (var size = 0; size < 10; size++) {
                var bit = qb.deqBits(1);
                state += 1 << 16;
                state |= bit << (15 - size);
                if (coeff_map_nc_4_8[state] !== undefined) {
                    return coeff_map_nc_4_8[state];
                }
            }
        } else if (8 <= nc) {
            for (var size = 0; size < 6; size++) {
                var bit = qb.deqBits(1);
                state += 1 << 16;
                state |= bit << (15 - size);
                if (coeff_map_nc_8[state] !== undefined) {
                    return coeff_map_nc_8[state];
                }
            }
        } else if (nc === -1) {
            for (var size = 0; size < 8; size++) {
                var bit = qb.deqBits(1);
                state += 1 << 16;
                state |= bit << (15 - size);
                if (coeff_map_nc_m1[state] !== undefined) {
                    return coeff_map_nc_m1[state];
                }
            }
        }
        console.log('nc', nc, state);
    }

    function decodeLevelPrefix(qb) {
        for (var i = 0; i < 32; i++) {
            var bit = qb.deqBits(1);
            if (bit) {
                return i;
            }
        }
        return null;
    }

    function decodeTotalZeros(qb, totalCoeff, isChromaDC) {
        var state = 0x00000000;
        if (!isChromaDC) {
            for (var i = 0; i < 17 - totalCoeff; i++) {
                var bit = qb.deqBits(1);
                state += 1 << 16;
                state |= bit << (15 - i);
                if (total_zeros_map[totalCoeff - 1][state] !== undefined) {
                    return total_zeros_map[totalCoeff - 1][state];
                }
            }
        } else {
            if (totalCoeff === 1) {
                for (var i = 0; i < 3; i++) {
                    var bit = qb.deqBits(1);
                    if (bit) {
                        return i;
                    }
                }
                return 3;
            } else if (totalCoeff === 2) {
                for (var i = 0; i < 2; i++) {
                    var bit = qb.deqBits(1);
                    if (bit) {
                        return i;
                    }
                }
                return 2;
            } else if (totalCoeff === 3) {
                for (var i = 0; i < 1; i++) {
                    var bit = qb.deqBits(1);
                    if (bit) {
                        return i;
                    }
                }
                return 1;
            }
        }
    }

    function decodeRunBefore(qb, zerosLeft) {
        var state = 0x00000000;
        var loops = 0;
        switch (zerosLeft) {
            case 1:
                loops = 1;
                break;
            case 2:
            case 3:
                loops = 2;
                break;
            case 4:
            case 5:
            case 6:
                loops = 3;
                break;
            default:
                loops = 11;
                break;
        }

        if (zerosLeft <= 6) {
            for (var i = 0; i < loops; i++) {
                var bit = qb.deqBits(1);
                state += 1 << 16;
                state |= bit << (15 - i);
                if (run_before_map[zerosLeft - 1][state] !== undefined) {
                    return run_before_map[zerosLeft - 1][state];
                }
            }
        } else {
            for (var i = 0; i < loops; i++) {
                var bit = qb.deqBits(1);
                state += 1 << 16;
                state |= bit << (15 - i);
                if (run_before_map[6][state] !== undefined) {
                    return run_before_map[6][state];
                }
            }
        }

    }

    function residual_block_cavlc(nc, coeffLevel, maxNumCoeff) {
        for (var i = 0; i < maxNumCoeff; i++) {
            coeffLevel[i] = 0;
        }
        var params = decodeCoeffToken(this.qb, nc);
        var suffixLength = 0;
        var trailing_ones_sign_flag = 0;
        var level = [];
        var level_suffix;
        if (params[1] > 0) {
            if (params[1] > 10 && params[0] < 3) {
                suffixLength = 1;
            } else {
                suffixLength = 0;
            }
            for (var i = 0; i < params[1]; i++) {
                if (i < params[0]) {
                    trailing_ones_sign_flag = this.qb.deqBits(1);
                    level[i] = 1 - 2 * trailing_ones_sign_flag;
                } else {
                    var level_prefix = decodeLevelPrefix(this.qb);
                    var levelCode = (level_prefix << suffixLength);
                    if (suffixLength > 0 || level_prefix >= 14) {
                        var levelSuffixSize;
                        if (level_prefix === 14 && suffixLength === 0) {
                            levelSuffixSize = 4;
                        } else if (level_prefix === 15) {
                            levelSuffixSize = 12;
                        } else {
                            levelSuffixSize = suffixLength;
                        }
                        if (levelSuffixSize) {
                            level_suffix = this.qb.deqBits(levelSuffixSize);
                        } else {
                            level_suffix = 0;
                        }
                        levelCode += level_suffix;
                    }
                    if (level_prefix === 15 && suffixLength === 0) {
                        levelCode += 15;
                    }
                    if (i === params[0] && params[0] < 3) {
                        levelCode += 2;
                    }
                    if (levelCode % 2 === 0) {
                        level[i] = (levelCode + 2) >> 1;
                    } else {
                        level[i] = (-levelCode - 1) >> 1;
                    }
                    if (suffixLength === 0) {
                        suffixLength = 1;
                    }
                    if (Math.abs(level[i]) > (3 << (suffixLength - 1)) && suffixLength < 6) {
                        suffixLength++;
                    }
                }
            }
            var zerosLeft = 0;
            if (params[1] < maxNumCoeff) {
                var total_zeros = decodeTotalZeros(this.qb, params[1], maxNumCoeff === 4);
                zerosLeft = total_zeros;
            }

            var run = [];
            for (var i = 0; i < params[1] - 1; i++) {
                if (zerosLeft > 0) {
                    var run_before = decodeRunBefore(this.qb, zerosLeft);
                    run[i] = run_before;
                } else {
                    run[i] = 0;
                }
                zerosLeft = zerosLeft - run[i];
            }
            run[params[1] - 1] = zerosLeft;
            var coeffNum = -1;
            for (var i = params[1] - 1; i >= 0; i--) {
                coeffNum += run[i] + 1;
                coeffLevel[coeffNum] = level[i];
            }
        }
        return params[1];
    }

    function residual(mb_type) {
        if (MbPartPredMode(mb_type, this.slice.slice_type) === _defs.PRED_MODE_INTRA16x16) {
            var nc = calcNC.call(this, 0); // why?
            this.Intra16x16DCLevel = [];
            var tc = residual_block_cavlc.call(this, nc, this.Intra16x16DCLevel, 16);
            this.totalCoeff[24] = tc;
        }

        this.Intra16x16ACLevel = [];
        var LumaLevel = [];
        this.LumaLevel = LumaLevel;
        for (var i8x8 = 0; i8x8 < 4; i8x8++) {
            for (var i4x4 = 0; i4x4 < 4; i4x4++) {
                if (this.CodedBlockPattenLuma & (1 << i8x8)) {
                    var nc = calcNC.call(this, 4 * i8x8 + i4x4);
                    if (MbPartPredMode(mb_type, this.slice.slice_type) === _defs.PRED_MODE_INTRA16x16) {
                        Intra16x16ACLevel[i8x8 * 4 + i4x4] = [];
                        var tc = residual_block_cavlc.call(this, nc, Intra16x16ACLevel[i8x8 * 4 + i4x4], 15);
                        this.totalCoeff[i8x8 * 4 + i4x4] = tc;
                    } else {
                        LumaLevel[i8x8 * 4 + i4x4] = [];
                        var tc = residual_block_cavlc.call(this, nc, LumaLevel[i8x8 * 4 + i4x4], 16);
                        this.totalCoeff[i8x8 * 4 + i4x4] = tc;
                    }
                } else {
                    if (MbPartPredMode(mb_type, this.slice.slice_type) === _defs.PRED_MODE_INTRA16x16) {
                        this.Intra16x16ACLevel[i8x8 * 4 + i4x4] = [];
                        for (var i = 0; i < 15; i++) {
                            this.Intra16x16ACLevel[i8x8 * 4 + i4x4][i] = 0;
                        }
                    } else {
                        LumaLevel[i8x8 * 4 + i4x4] = [];
                        for (var i = 0; i < 16; i++) {
                            LumaLevel[i8x8 * 4 + i4x4][i] = 0;
                        }
                    }
                }
            }
        }

        var ChromaDCLevel = [];
        var idx = 25;
        for (var iCbCr = 0; iCbCr < 2; iCbCr++) {
            ChromaDCLevel[iCbCr] = [];
            if (this.CodedBlockPatternChroma & 3) {
                var tc = residual_block_cavlc.call(this, -1, ChromaDCLevel[iCbCr], 4);
                this.totalCoeff[idx] = tc;
            } else {
                for (var i = 0; i < 4; i++) {
                    ChromaDCLevel[iCbCr][i] = 0;
                }
            }
            idx++;
        }

        var ChromaACLevel = [];
        var idx = 16;
        for (var iCbCr = 0; iCbCr < 2; iCbCr++) {
            ChromaACLevel[iCbCr] = [];
            for (var i4x4 = 0; i4x4 < 4; i4x4++) {
                ChromaACLevel[iCbCr][i4x4] = [];
                if (this.CodedBlockPatternChroma & 2) {
                    var nc = calcNC.call(this, idx); // problem
                    var tc = residual_block_cavlc.call(this, nc, ChromaACLevel[iCbCr][i4x4], 15);
                    this.totalCoeff[idx] = tc;
                } else {
                    for (var i = 0; i < 15; i++) {
                        ChromaACLevel[iCbCr][i4x4][i] = 0;
                    }
                    this.totalCoeff[idx] = 0;
                }
                idx++;
            }
        }
    }

    function LevelScale(m, i, j) {
        var v = [
            [10, 16, 13],
            [11, 18, 14],
            [13, 20, 16],
            [14, 23, 18],
            [16, 25, 20],
            [18, 29, 23]
        ];

        if ((i === 0 && j === 0) || (i === 0 && j === 2) || (i === 2 && j === 0) || (i === 2 && j === 2)) {
            return v[m][0];
        } else if ((i === 1 && j === 1) || (i === 1 && j === 3) || (i === 3 && j === 1) || (i === 3 && j === 3)) {
            return v[m][1];
        } else {
            return v[m][2];
        }
    }

    function Macroblock_layer(qb, slice) {
        this.qb = qb;
        this.slice = slice;

        this.totalCoeff = [];
        for (var i = 0; i < 23; i++) {
            this.totalCoeff[i] = 0;
        }

        this.luma4x4 = [];
        this.luma4x4PredMode = [];
        this.intra4x4PredMode = [];
        this.dataLuma = [];
        this.dataLuma16x16 = [
            [], [], [], [],
            [], [], [], [],
            [], [], [], [],
            [], [], [], [],
        ];
        this.decoded = {
            lumas: []
        };
    }

    Macroblock_layer.prototype = {
        parse: function() {
            var qb = this.qb;
            this.mb_type = qb.deqUe();
            if (this.mb_type === _defs.I_PCM) { /* I_PCM */
                while (!qb.isAligned()) {
                    this.pcm_alignment_zero_bit = qb.deqBits(1);
                }
                this.pcm_byte = [];
                for (var i = 0; i < 384; i++) {
                    this.pcm_byte[i] = qb.deqBits(8);
                }
            } else {
                var noSubMbPartSizeLessThan8x8Flag = 1;
                if (MbPartPredMode(this.mb_type, this.slice.slice_type) === _defs.PRED_MODE_INTER && NumMbPart(mb_type) === 4) {
                    /* sub_mb_pred() */
                    sub_mb_pred.call(this, this.mb_type);
                    /* sub_mb_pred() end*/
                } else {
                    /* mb_pred() */
                    mb_pred.call(this, this.mb_type);
                    /* mb_pred() end */
                }

                if (MbPartPredMode(this.mb_type, this.slice.slice_type) !== _defs.PRED_MODE_INTRA16x16) {
                    this.coded_block_pattern = qb.deqMe(MbPartPredMode(this.mb_type, this.slice.slice_type) === _defs.PRED_MODE_INTRA4x4);
                    this.CodedBlockPattenLuma = this.coded_block_pattern % 16;
                    this.CodedBlockPatternChroma = Math.floor(this.coded_block_pattern / 16);
                } else {
                    if (this.mb_type <= 12) {
                        this.CodedBlockPattenLuma = 0;
                    } else {
                        this.CodedBlockPattenLuma = 15;
                    }
                    if ((this.mb_type >= 1 && this.mb_type <= 4) || (this.mb_type >= 13 && this.mb_type <= 16)) {
                        this.CodedBlockPatternChroma = 0;
                    } else if ((this.mb_type >= 5 && this.mb_type <= 8) || (this.mb_type >= 17 && this.mb_type <= 20)) {
                        this.CodedBlockPatternChroma = 1;
                    } else if ((this.mb_type >= 9 && this.mb_type <= 12) || (this.mb_type >= 21 && this.mb_type <= 24)) {
                        this.CodedBlockPatternChroma = 2;
                    }
                }
                if (this.CodedBlockPattenLuma > 0 || this.CodedBlockPatternChroma > 0 || MbPartPredMode(this.mb_type, this.slice.slice_type) === _defs.PRED_MODE_INTRA16x16) {
                    this.mb_qp_delta = qb.deqSe();
                    residual.call(this, this.mb_type);
                }
            }
        },
        getMbPartPredMode: function() {
            return (this.mb_type === 0) ? _defs.Intra_4x4 : _defs.Intra_16x16;
        },
        getIntra16x16PredMode: function() {
            return (this.mb_type - 1) % 4;
        },
        isMbAAvailable: function() {
            if (!this.mbA || this.slice != this.mbA.slice) {
                return false;
            }
            return true;
        },
        isMbBAvailable: function() {
            if (!this.mbB || this.slice != this.mbB.slice) {
                return false;
            }
            return true;
        },
        getIntra4x4PredMode: function(blockIndex) {
            var pm, pmA, pmB;
            var nA = _common.getNeighbourA4x4(blockIndex);
            var nB = _common.getNeighbourB4x4(blockIndex);

            if (nA[0] === _defs.MB_CURR) {
                pmA = this.intra4x4PredMode[nA[1]];
            } else {
                if (this.mbA === null) {
                    pmA = -1;
                } else {
                    if (this.mbA.mb_type === 0) {
                        pmA = this.mbA.intra4x4PredMode[nA[1]];
                    } else {
                        pmA = 2;
                    }
                }
            }

            if (nB[0] === _defs.MB_CURR) {
                pmB = this.intra4x4PredMode[nB[1]];
            } else {
                if (this.mbB === null) {
                    pmB = -1;
                } else {
                    if (this.mbB.mb_type === 0) {
                        pmB = this.mbB.intra4x4PredMode[nB[1]];
                    } else {
                        pmB = 2;
                    }
                }
            }

            if (pmA === -1 || pmB === -1) {
                pm = 2;
            } else {
                pm = _util.min(pmA, pmB);
            }

            if (!this.prev_intra4x4_pred_mode_flag[blockIndex]) {
                if (this.rem_intra4x4_pred_mode[blockIndex] < pm) {
                    pm = this.rem_intra4x4_pred_mode[blockIndex];
                } else {
                    pm = this.rem_intra4x4_pred_mode[blockIndex] + 1;
                }

            }

            /* store pred mode in order to reduce calculation */
            this.intra4x4PredMode[blockIndex] = pm;
            return pm;
        },
        getRight16: function() {
            var lumas = [];
            for (var i = 0; i < 16; i++) {
                if (i <= 3) {
                    lumas[i] = this.decoded.lumas[5][i][3];
                } else if (i <= 7) {
                    lumas[i] = this.decoded.lumas[7][i - 4][3];
                } else if (i <= 11) {
                    lumas[i] = this.decoded.lumas[13][i - 8][3];
                } else {
                    lumas[i] = this.decoded.lumas[15][i - 12][3];
                }
            }

            return lumas;
        },
        getBottom16: function() {
            var lumas = [];
            for (var i = 0; i < 16; i++) {
                if (i <= 3) {
                    lumas[i] = this.decoded.lumas[10][3][i];
                } else if (i <= 7) {
                    lumas[i] = this.decoded.lumas[11][3][i - 4];
                } else if (i <= 11) {
                    lumas[i] = this.decoded.lumas[14][3][i - 8];
                } else {
                    lumas[i] = this.decoded.lumas[15][3][i - 12];
                }
            }

            return lumas;
        },
        getRight4: function(blockIndex) {
            var lumas = [];
            for (var i = 0; i < 4; i++) {
                lumas[i] = this.decoded.lumas[blockIndex][i][3];
            }
            return lumas;
        },
        getBottom4: function(blockIndex) {
            var lumas = [];
            for (var i = 0; i < 4; i++) {
                lumas[i] = this.decoded.lumas[blockIndex][3][i];
            }
            return lumas;
        },
        decode: function() {
            if (this.getMbPartPredMode() === _defs.Intra_16x16) {
                var pm = this.getIntra16x16PredMode();
                switch (pm) {
                    case _defs.Intra_16x16_Vertical:

                        break;
                    case _defs.Intra_16x16_Horizontal:
                        var source = this.mbA.getRight16();
                        for (var blk = 0; blk < 16; blk++) {

                            var data = [
                                [0x80, 0x80, 0x80, 0x80],
                                [0x80, 0x80, 0x80, 0x80],
                                [0x80, 0x80, 0x80, 0x80],
                                [0x80, 0x80, 0x80, 0x80]
                            ];
                            if (blk === 0 || blk === 1 || blk === 4 || blk === 5) {
                                for (var i = 0; i < 4; i++) {
                                    for (var j = 0; j < 4; j++) {
                                        data[i][j] = source[i];
                                    }
                                }
                            } else if (blk === 2 || blk === 3 || blk === 6 || blk === 7) {
                                for (var i = 0; i < 4; i++) {
                                    for (var j = 0; j < 4; j++) {
                                        data[i][j] = source[i + 4];
                                    }
                                }
                            } else if (blk === 8 || blk === 9 || blk === 12 || blk === 13) {
                                for (var i = 0; i < 4; i++) {
                                    for (var j = 0; j < 4; j++) {
                                        data[i][j] = source[i + 8];
                                    }
                                }
                            } else {
                                for (var i = 0; i < 4; i++) {
                                    for (var j = 0; j < 4; j++) {
                                        data[i][j] = source[i + 12];
                                    }
                                }
                            }
                            this.decoded.lumas[blk] = data;
                        }
                        break;
                }

                var dc = this.Intra16x16DCLevel;

                var c = [
                    [dc[0], dc[1], dc[5], dc[6]],
                    [dc[2], dc[4], dc[7], dc[12]],
                    [dc[3], dc[8], dc[11], dc[13]],
                    [dc[9], dc[10], dc[14], dc[15]]
                ];

                var tmp1 = [
                    [1, 1, 1, 1],
                    [1, 1, -1, -1],
                    [1, -1, -1, 1],
                    [1, -1, 1, -1]
                ];
                var tmp2 = [
                    [1, 1, 1, 1],
                    [1, 1, -1, -1],
                    [1, -1, -1, 1],
                    [1, -1, 1, -1]
                ];
                var tmp3 = _util.matrix.multiply(tmp1, c);
                var f = _util.matrix.multiply(tmp3, tmp2);
                
                var qp = this.decoder.pps.pic_init_qp_minus26 + 26 + this.slice.slice_qp_delta;
                
                var dcY = [[], [], [], []];
                if (qp >= 12) {
                    for (var i = 0; i < 4; i++) {
                        for (var j = 0; j < 4; j++) {
                            dcY[i][j] = (f[i][j] * LevelScale(qp % 6, 0, 0)) << (Math.floor(qp / 6) - 2);
                        }
                    }
                } else {
                    for (var i = 0; i < 4; i++) {
                        for (var j = 0; j < 4; j++) {
                            dcY[i][j] = (f[i][j] * LevelScale(qp % 6, 0, 0) + (1 << (1 - Math.floor(qp / 6)))) >> (2 - Math.floor(qp / 6));
                        }
                    }
                }

                for (var blk = 0; blk < 16; blk++) {
                    var lumaList = [];
                    lumaList[0] = dcY[_defs.abmap[blk][0]][_defs.abmap[blk][1]];
                    for (var i = 1; i < 16; i++) {
                        lumaList[i] = this.Intra16x16ACLevel[blk][i - 1];
                    }

                    var c = [
                        [lumaList[0], lumaList[1], lumaList[5], lumaList[6]],
                        [lumaList[2], lumaList[4], lumaList[7], lumaList[12]],
                        [lumaList[3], lumaList[8], lumaList[11], lumaList[13]],
                        [lumaList[9], lumaList[10], lumaList[14], lumaList[15]]
                    ];
                    var d = [
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ];
                    for (var i = 0; i < 4; i++) {
                        for (var j = 0; j < 4; j++) {
                            d[i][j] = (c[i][j] * LevelScale(qp % 6, i, j)) << Math.floor(qp / 6);
                        }
                    }
                    d[0][0] = c[0][0];

                    var e = [
                        [d[0][0] + d[0][2], d[0][0] - d[0][2], (d[0][1] >> 1) - d[0][3], d[0][1] + (d[0][3] >> 1)],
                        [d[1][0] + d[1][2], d[1][0] - d[1][2], (d[1][1] >> 1) - d[1][3], d[1][1] + (d[1][3] >> 1)],
                        [d[2][0] + d[2][2], d[2][0] - d[2][2], (d[2][1] >> 1) - d[2][3], d[2][1] + (d[2][3] >> 1)],
                        [d[3][0] + d[3][2], d[3][0] - d[3][2], (d[3][1] >> 1) - d[3][3], d[3][1] + (d[3][3] >> 1)],
                    ];

                    var f = [
                        [e[0][0] + e[0][3], e[0][1] + e[0][2], e[0][1] - e[0][2], e[0][0] - e[0][3]],
                        [e[1][0] + e[1][3], e[1][1] + e[1][2], e[1][1] - e[1][2], e[1][0] - e[1][3]],
                        [e[2][0] + e[2][3], e[2][1] + e[2][2], e[2][1] - e[2][2], e[2][0] - e[2][3]],
                        [e[3][0] + e[3][3], e[3][1] + e[3][2], e[3][1] - e[3][2], e[3][0] - e[3][3]],
                    ];

                    var g = [
                        [f[0][0] + f[2][0], f[0][1] + f[2][1], f[0][2] + f[2][2], f[0][3] + f[2][3]],
                        [f[0][0] - f[2][0], f[0][1] - f[2][1], f[0][2] - f[2][2], f[0][3] - f[2][3]],
                        [(f[1][0] >> 1) - f[3][0], (f[1][1] >> 1) - f[3][1], (f[1][2] >> 1) - f[3][2], (f[1][3] >> 1) - f[3][3]],
                        [f[1][0] + (f[3][0] >> 1), f[1][1] + (f[3][1] >> 1), f[1][2] + (f[3][2] >> 1), f[1][3] + (f[3][3] >> 1)]
                    ];

                    var h = [
                        [g[0][0] + g[3][0], g[0][1] + g[3][1], g[0][2] + g[3][2], g[0][3] + g[3][3]],
                        [g[1][0] + g[2][0], g[1][1] + g[2][1], g[1][2] + g[2][2], g[1][3] + g[2][3]],
                        [g[1][0] - g[2][0], g[1][1] - g[2][1], g[1][2] - g[2][2], g[1][3] - g[2][3]],
                        [g[0][0] - g[3][0], g[0][1] - g[3][1], g[0][2] - g[3][2], g[0][3] - g[3][3]],
                    ];

                    var r = [];
                    for (var i = 0; i < 4; i++) {
                        r[i] = [];
                        for (var j = 0; j < 4; j++) {
                            r[i][j] = (h[i][j] + 32) >> 6;
                        }
                    }

                    var data = this.decoded.lumas[blk];
                    for (var i = 0; i < 4; i++) {
                        for (var j = 0; j < 4; j++) {
                            data[i][j] += r[i][j];
                        }
                    }
                    this.decoded.lumas[blk] = data;

                    console.log(data);
                }




            } else {

                for (var blk = 0; blk < 16; blk++) {
                    var pm = this.getIntra4x4PredMode(blk);

                    var data = [
                        [0x80, 0x80, 0x80, 0x80],
                        [0x80, 0x80, 0x80, 0x80],
                        [0x80, 0x80, 0x80, 0x80],
                        [0x80, 0x80, 0x80, 0x80]
                    ];

                    switch (pm) {
                        case _defs.Intra_4x4_Vertical:
                            var nB = _common.getNeighbourB4x4(blk);
                            var sourceMb;
                            if (nB[0] === _defs.MB_CURR) {
                                sourceMb = this;
                            } else {
                                sourceMb = this.mbB;
                            }
                            var source = sourceMb.getBottom4(nB[1]);
                            for (var i = 0; i < 4; i++) {
                                for (var j = 0; j < 4; j++) {
                                    data[i][j] = source[j];
                                }
                            }
                            break;
                        case _defs.Intra_4x4_Horizontal:
                            var nA = _common.getNeighbourA4x4(blk);
                            var sourceMb;
                            if (nA[0] === _defs.MB_CURR) {
                                sourceMb = this;
                            } else {
                                sourceMb = this.mbA;
                            }
                            var source = sourceMb.getRight4(nA[1]);
                            for (var i = 0; i < 4; i++) {
                                for (var j = 0; j < 4; j++) {
                                    data[i][j] = source[i];
                                }
                            }
                            break;
                        case _defs.Intra_4x4_DC:
                            var nA = _common.getNeighbourA4x4(blk);
                            var nB = _common.getNeighbourB4x4(blk);
                            var Amb = (nA[0] === _defs.MB_CURR) ? this : this.mbA;
                            var Bmb = (nB[0] === _defs.MB_CURR) ? this : this.mbB;
                            var avgA = 0, avgB = 0, sum = 0;
                            if (Amb === null && Bmb === null) {
                                /* default is 128, so do nothing */
                            } else {
                                if (Amb !== null) {
                                    for (var i = 0; i < 4; i++) {
                                        sum += Amb.getRight4(nA[1])[i];
                                    }
                                    avgA = sum >> 2;
                                }
                                sum = 0;
                                if (Bmb !== null) {
                                    for (var i = 0; i < 4; i++) {
                                        sum += Bmb.getBottom4(nB[1])[i];
                                    }
                                    avgB = sum >> 2;
                                }
                                var out;
                                if (Amb === null || Bmb === null) {
                                    out = avgA + avgB;
                                } else {
                                    out = (avgA + avgB) >> 1;
                                }
                                for (var i = 0; i < 4; i++) {
                                    for (var j = 0; j < 4; j++) {
                                        data[i][j] = out;
                                    }
                                }
                            }
                            break;
                    }
                    var lumas = this.LumaLevel[blk];

                    var c = [
                        [lumas[0], lumas[1], lumas[5], lumas[6]],
                        [lumas[2], lumas[4], lumas[7], lumas[12]],
                        [lumas[3], lumas[8], lumas[11], lumas[13]],
                        [lumas[9], lumas[10], lumas[14], lumas[15]]
                    ];

                    var qp = this.decoder.pps.pic_init_qp_minus26 + 26 + this.slice.slice_qp_delta;

                    var d = [
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ];
                    for (var i = 0; i < 4; i++) {
                        for (var j = 0; j < 4; j++) {
                            d[i][j] = (c[i][j] * LevelScale(qp % 6, i, j)) << Math.floor(qp / 6);
                        }
                    }

                    var e = [
                        [d[0][0] + d[0][2], d[0][0] - d[0][2], (d[0][1] >> 1) - d[0][3], d[0][1] + (d[0][3] >> 1)],
                        [d[1][0] + d[1][2], d[1][0] - d[1][2], (d[1][1] >> 1) - d[1][3], d[1][1] + (d[1][3] >> 1)],
                        [d[2][0] + d[2][2], d[2][0] - d[2][2], (d[2][1] >> 1) - d[2][3], d[2][1] + (d[2][3] >> 1)],
                        [d[3][0] + d[3][2], d[3][0] - d[3][2], (d[3][1] >> 1) - d[3][3], d[3][1] + (d[3][3] >> 1)],
                    ];

                    var f = [
                        [e[0][0] + e[0][3], e[0][1] + e[0][2], e[0][1] - e[0][2], e[0][0] - e[0][3]],
                        [e[1][0] + e[1][3], e[1][1] + e[1][2], e[1][1] - e[1][2], e[1][0] - e[1][3]],
                        [e[2][0] + e[2][3], e[2][1] + e[2][2], e[2][1] - e[2][2], e[2][0] - e[2][3]],
                        [e[3][0] + e[3][3], e[3][1] + e[3][2], e[3][1] - e[3][2], e[3][0] - e[3][3]],
                    ];

                    var g = [
                        [f[0][0] + f[2][0], f[0][1] + f[2][1], f[0][2] + f[2][2], f[0][3] + f[2][3]],
                        [f[0][0] - f[2][0], f[0][1] - f[2][1], f[0][2] - f[2][2], f[0][3] - f[2][3]],
                        [(f[1][0] >> 1) - f[3][0], (f[1][1] >> 1) - f[3][1], (f[1][2] >> 1) - f[3][2], (f[1][3] >> 1) - f[3][3]],
                        [f[1][0] + (f[3][0] >> 1), f[1][1] + (f[3][1] >> 1), f[1][2] + (f[3][2] >> 1), f[1][3] + (f[3][3] >> 1)]
                    ];

                    var h = [
                        [g[0][0] + g[3][0], g[0][1] + g[3][1], g[0][2] + g[3][2], g[0][3] + g[3][3]],
                        [g[1][0] + g[2][0], g[1][1] + g[2][1], g[1][2] + g[2][2], g[1][3] + g[2][3]],
                        [g[1][0] - g[2][0], g[1][1] - g[2][1], g[1][2] - g[2][2], g[1][3] - g[2][3]],
                        [g[0][0] - g[3][0], g[0][1] - g[3][1], g[0][2] - g[3][2], g[0][3] - g[3][3]],
                    ];

                    var r = [];
                    for (var i = 0; i < 4; i++) {
                        r[i] = [];
                        for (var j = 0; j < 4; j++) {
                            r[i][j] = (h[i][j] + 32) >> 6;
                        }
                    }

                    for (var i = 0; i < 4; i++) {
                        for (var j = 0; j < 4; j++) {
                            data[i][j] += r[i][j];
                        }
                    }
                    this.decoded.lumas[blk] = data;
                }

            }
        }
    };

    function create(qb, slice) {
        var ml = new Macroblock_layer(qb, slice);
        return ml;
    }

    return {
        create: create
    };
});
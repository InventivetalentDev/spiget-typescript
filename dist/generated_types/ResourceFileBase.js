"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Spiget_1 = require("../Spiget");
var SpigetType_1 = require("../SpigetType");
var ResourceFile = /** @class */ (function (_super) {
    __extends(ResourceFile, _super);
    function ResourceFile(source, spiget) {
        if (spiget === void 0) { spiget = new Spiget_1.default(); }
        var _this = _super.call(this, source, spiget) || this;
        if (source !== undefined) {
            if (source.hasOwnProperty("type"))
                _this.type = source.type;
            if (source.hasOwnProperty("size"))
                _this.size = source.size;
            if (source.hasOwnProperty("sizeUnit"))
                _this.sizeUnit = source.sizeUnit;
            if (source.hasOwnProperty("url"))
                _this.url = source.url;
        }
        return _this;
    }
    return ResourceFile;
}(SpigetType_1.default));
exports.ResourceFile = ResourceFile;
exports.default = ResourceFile;

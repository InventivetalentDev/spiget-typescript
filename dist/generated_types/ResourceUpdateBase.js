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
var ResourceUpdate = /** @class */ (function (_super) {
    __extends(ResourceUpdate, _super);
    function ResourceUpdate(source, spiget) {
        if (spiget === void 0) { spiget = new Spiget_1.default(); }
        var _this = _super.call(this, source, spiget) || this;
        if (source !== undefined) {
            if (source.hasOwnProperty("id"))
                _this.id = source.id;
            if (source.hasOwnProperty("title"))
                _this.title = source.title;
            if (source.hasOwnProperty("description"))
                _this.description = source.description;
            if (source.hasOwnProperty("date"))
                _this.date = source.date;
            if (source.hasOwnProperty("likes"))
                _this.likes = source.likes;
        }
        return _this;
    }
    return ResourceUpdate;
}(SpigetType_1.default));
exports.ResourceUpdate = ResourceUpdate;
exports.default = ResourceUpdate;

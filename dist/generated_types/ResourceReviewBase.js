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
var Author_1 = require("../types/Author");
var ResourceRating_1 = require("../types/ResourceRating");
var ResourceReview = /** @class */ (function (_super) {
    __extends(ResourceReview, _super);
    function ResourceReview(source, spiget) {
        if (spiget === void 0) { spiget = new Spiget_1.default(); }
        var _this = _super.call(this, source, spiget) || this;
        if (source !== undefined) {
            if (source.hasOwnProperty("author"))
                _this.author = _this._spiget.__mapType(source.author, Author_1.default);
            if (source.hasOwnProperty("rating"))
                _this.rating = _this._spiget.__mapType(source.rating, ResourceRating_1.default);
            if (source.hasOwnProperty("message"))
                _this.message = source.message;
            if (source.hasOwnProperty("responseMessage"))
                _this.responseMessage = source.responseMessage;
            if (source.hasOwnProperty("version"))
                _this.version = source.version;
            if (source.hasOwnProperty("date"))
                _this.date = source.date;
        }
        return _this;
    }
    return ResourceReview;
}(SpigetType_1.default));
exports.ResourceReview = ResourceReview;
exports.default = ResourceReview;

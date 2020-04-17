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
var ResourceFile_1 = require("../types/ResourceFile");
var ResourceRating_1 = require("../types/ResourceRating");
var Icon_1 = require("../types/Icon");
var IdReference_1 = require("../types/IdReference");
var Resource = /** @class */ (function (_super) {
    __extends(Resource, _super);
    function Resource(source, spiget) {
        if (spiget === void 0) { spiget = new Spiget_1.default(); }
        var _this = _super.call(this, source, spiget) || this;
        if (source !== undefined) {
            if (source.hasOwnProperty("id"))
                _this.id = source.id;
            if (source.hasOwnProperty("name"))
                _this.name = source.name;
            if (source.hasOwnProperty("tag"))
                _this.tag = source.tag;
            if (source.hasOwnProperty("contributors"))
                _this.contributors = source.contributors;
            if (source.hasOwnProperty("likes"))
                _this.likes = source.likes;
            if (source.hasOwnProperty("file"))
                _this.file = _this._spiget.__mapType(source.file, ResourceFile_1.default);
            if (source.hasOwnProperty("testedVersions"))
                _this.testedVersions = source.testedVersions;
            if (source.hasOwnProperty("links"))
                _this.links = source.links;
            if (source.hasOwnProperty("rating"))
                _this.rating = _this._spiget.__mapType(source.rating, ResourceRating_1.default);
            if (source.hasOwnProperty("releaseDate"))
                _this.releaseDate = source.releaseDate;
            if (source.hasOwnProperty("updateDate"))
                _this.updateDate = source.updateDate;
            if (source.hasOwnProperty("downloads"))
                _this.downloads = source.downloads;
            if (source.hasOwnProperty("external"))
                _this.external = source.external;
            if (source.hasOwnProperty("icon"))
                _this.icon = _this._spiget.__mapType(source.icon, Icon_1.default);
            if (source.hasOwnProperty("premium"))
                _this.premium = source.premium;
            if (source.hasOwnProperty("price"))
                _this.price = source.price;
            if (source.hasOwnProperty("currency"))
                _this.currency = source.currency;
            if (source.hasOwnProperty("reviews"))
                _this.reviews = _this._spiget.__mapTypeList(source.reviews, IdReference_1.default);
            if (source.hasOwnProperty("versions"))
                _this.versions = _this._spiget.__mapTypeList(source.versions, IdReference_1.default);
            if (source.hasOwnProperty("updates"))
                _this.updates = _this._spiget.__mapTypeList(source.updates, IdReference_1.default);
        }
        return _this;
    }
    return Resource;
}(SpigetType_1.default));
exports.Resource = Resource;
exports.default = Resource;

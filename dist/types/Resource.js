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
var ResourceBase_1 = require("../generated_types/ResourceBase");
var Resource = /** @class */ (function (_super) {
    __extends(Resource, _super);
    function Resource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Check if this is a full resource object (via /resources/:id) or a stripped down object (via /resources)
     */
    Resource.prototype.isFullResource = function () {
        return this.updates != null && this.versions != null;
    };
    Resource.prototype.getFullResource = function () {
        return this._spiget.getResource(this.id);
    };
    Resource.prototype.getAuthor = function () {
        return this._spiget.getResourceAuthor(this.id);
    };
    Resource.prototype.getUpdates = function (pagination, fields) {
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return this._spiget.getResourceUpdates(this.id, pagination, fields);
    };
    Resource.prototype.getVersions = function (pagination, fields) {
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return this._spiget.getResourceVersions(this.id, pagination, fields);
    };
    Resource.prototype.getReviews = function (pagination, fields) {
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return this._spiget.getResourceReviews(this.id, pagination, fields);
    };
    return Resource;
}(ResourceBase_1.default));
exports.default = Resource;

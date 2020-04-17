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
var AuthorBase_1 = require("../generated_types/AuthorBase");
var Author = /** @class */ (function (_super) {
    __extends(Author, _super);
    function Author() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Author.prototype.getResources = function (pagination, fields) {
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return this._spiget.getAuthorResources(this.id, pagination, fields);
    };
    Author.prototype.getReviews = function (pagination, fields) {
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return this._spiget.getAuthorReviews(this.id, pagination, fields);
    };
    return Author;
}(AuthorBase_1.default));
exports.default = Author;

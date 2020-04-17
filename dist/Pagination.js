"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pagination = /** @class */ (function () {
    function Pagination(size, page, sort) {
        if (size === void 0) { size = 10; }
        if (page === void 0) { page = 1; }
        if (sort === void 0) { sort = ""; }
        this.size = size;
        this.page = page;
        this.sort = sort;
    }
    return Pagination;
}());
exports.Pagination = Pagination;
exports.default = Pagination;

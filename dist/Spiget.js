"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var Resource_1 = require("./types/Resource");
exports.Resource = Resource_1.default;
var ResourceFile_1 = require("./types/ResourceFile");
exports.ResourceFile = ResourceFile_1.default;
var Icon_1 = require("./types/Icon");
exports.Icon = Icon_1.default;
var ResourceVersion_1 = require("./types/ResourceVersion");
exports.ResourceVersion = ResourceVersion_1.default;
var ResourceUpdate_1 = require("./types/ResourceUpdate");
exports.ResourceUpdate = ResourceUpdate_1.default;
var ResourceRating_1 = require("./types/ResourceRating");
exports.ResourceRating = ResourceRating_1.default;
var ResourceReview_1 = require("./types/ResourceReview");
exports.ResourceReview = ResourceReview_1.default;
var Author_1 = require("./types/Author");
exports.Author = Author_1.default;
var Category_1 = require("./types/Category");
exports.Category = Category_1.default;
var Error_1 = require("./Error");
exports.Error = Error_1.default;
var Pagination_1 = require("./Pagination");
exports.Pagination = Pagination_1.Pagination;
var SpigetType_1 = require("./SpigetType");
exports.SpigetType = SpigetType_1.default;
var Spiget = /** @class */ (function () {
    function Spiget(userAgent, apiBase, spigotMcUrl) {
        if (userAgent === void 0) { userAgent = "spiget-typescript"; }
        if (apiBase === void 0) { apiBase = "https://api.spiget.org/v2"; }
        if (spigotMcUrl === void 0) { spigotMcUrl = "https://spigotmc.org"; }
        this.__apiBase = apiBase;
        this.__spigotMcUrl = spigotMcUrl;
        this.axios = axios_1.default.create({
            baseURL: apiBase,
            timeout: 10000,
            headers: {
                "User-Agent": userAgent
            },
            responseType: "json"
        });
    }
    Spiget.prototype.__request = function (method, endpoint, query, body) {
        var _this = this;
        if (method === void 0) { method = "GET"; }
        if (endpoint === void 0) { endpoint = "/"; }
        if (query === void 0) { query = {}; }
        if (body === void 0) { body = {}; }
        return new Promise(function (resolve, reject) {
            _this.axios.request({
                method: method,
                url: endpoint,
                params: query,
                data: body
            }).then(function (response) {
                if (response.status >= 200 && response.status < 400 && response.data && !response.data.hasOwnProperty("error")) {
                    resolve(response.data);
                }
                else if (response.data.hasOwnProperty("error")) {
                    var err = new Error_1.default(response.data);
                    err.code = response.status;
                    reject(err);
                }
            }).catch(reject);
        });
    };
    Spiget.prototype.__addPaginationAndFieldsToQuery = function (pagination, fields, query) {
        if (query === void 0) { query = {}; }
        if (pagination !== undefined) {
            query.size = pagination.size || 10;
            query.page = pagination.page || 1;
            query.sort = pagination.sort || "";
        }
        if (fields !== undefined) {
            query.fields = fields.join(",");
        }
        return query;
    };
    Spiget.prototype.__mapType = function (data, type) {
        return new type(data, this);
        //return this.__typeFactory.create(type, data, this)
    };
    Spiget.prototype.__mapTypeList = function (data, type) {
        var _this = this;
        var mapped = [];
        data.forEach(function (d) {
            mapped.push(_this.__mapType(d, type));
        });
        return mapped;
    };
    ///// STATUS
    /**
     GET /status
     Get the API status

     **/
    Spiget.prototype.getAPIStatus = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = {};
            _this.__request("GET", "/status", query).then(function (res) {
                resolve(res);
            }).catch(reject);
        });
    };
    ///// AUTHORS
    /**
     GET /authors
     Get a list of available authors
     Note: This only includes members involved with resources, either being their author or having reviewed a resource

     **/
    Spiget.prototype.getAuthorList = function (pagination, fields) {
        var _this = this;
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return new Promise(function (resolve, reject) {
            var query = _this.__addPaginationAndFieldsToQuery(pagination, fields);
            _this.__request("GET", "/authors", query).then(function (resArr) {
                resolve(_this.__mapTypeList(resArr, Author_1.default));
            }).catch(reject);
        });
    };
    /**
     Alias of getAuthorList
     **/
    Spiget.prototype.getAuthors = function (pagination, fields) {
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return this.getAuthorList(pagination, fields);
    };
    /**
     GET /authors/{author}
     Get details about an author

     @param	author	Author ID
     **/
    Spiget.prototype.getAuthorDetails = function (author) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = {};
            _this.__request("GET", "/authors/" + author + "", query).then(function (res) {
                resolve(_this.__mapType(res, Author_1.default));
            }).catch(reject);
        });
    };
    /**
     Alias of getAuthorDetails
     **/
    Spiget.prototype.getAuthor = function (author) {
        return this.getAuthorDetails(author);
    };
    /**
     GET /authors/{author}/resources
     Get an author's resources

     @param	author	Author ID
     **/
    Spiget.prototype.getAuthorResources = function (author, pagination, fields) {
        var _this = this;
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return new Promise(function (resolve, reject) {
            var query = _this.__addPaginationAndFieldsToQuery(pagination, fields);
            _this.__request("GET", "/authors/" + author + "/resources", query).then(function (resArr) {
                resolve(_this.__mapTypeList(resArr, Resource_1.default));
            }).catch(reject);
        });
    };
    /**
     GET /authors/{author}/reviews
     Get an author's reviews left on resources

     @param	author	Author ID
     **/
    Spiget.prototype.getAuthorReviews = function (author, pagination, fields) {
        var _this = this;
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return new Promise(function (resolve, reject) {
            var query = _this.__addPaginationAndFieldsToQuery(pagination, fields);
            _this.__request("GET", "/authors/" + author + "/reviews", query).then(function (resArr) {
                resolve(_this.__mapTypeList(resArr, ResourceReview_1.default));
            }).catch(reject);
        });
    };
    ///// CATEGORIES
    /**
     GET /categories
     Get a list of categories

     **/
    Spiget.prototype.getCategoryList = function (pagination, fields) {
        var _this = this;
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return new Promise(function (resolve, reject) {
            var query = _this.__addPaginationAndFieldsToQuery(pagination, fields);
            _this.__request("GET", "/categories", query).then(function (resArr) {
                resolve(_this.__mapTypeList(resArr, Category_1.default));
            }).catch(reject);
        });
    };
    /**
     Alias of getCategoryList
     **/
    Spiget.prototype.getCategories = function (pagination, fields) {
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return this.getCategoryList(pagination, fields);
    };
    /**
     GET /categories/{category}
     Get details about a category

     @param	category	Category ID
     **/
    Spiget.prototype.getCategoryDetails = function (category) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = {};
            _this.__request("GET", "/categories/" + category + "", query).then(function (res) {
                resolve(_this.__mapType(res, Category_1.default));
            }).catch(reject);
        });
    };
    /**
     Alias of getCategoryDetails
     **/
    Spiget.prototype.getCategory = function (category) {
        return this.getCategoryDetails(category);
    };
    /**
     GET /categories/{category}/resources
     Get the resources in a category

     @param	category	Category ID
     **/
    Spiget.prototype.getCategoryResources = function (category, pagination, fields) {
        var _this = this;
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return new Promise(function (resolve, reject) {
            var query = _this.__addPaginationAndFieldsToQuery(pagination, fields);
            _this.__request("GET", "/categories/" + category + "/resources", query).then(function (resArr) {
                resolve(_this.__mapTypeList(resArr, Resource_1.default));
            }).catch(reject);
        });
    };
    ///// RESOURCES
    /**
     GET /resources
     Get a list of available resources (premium and free)

     **/
    Spiget.prototype.getResourceList = function (pagination, fields) {
        var _this = this;
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return new Promise(function (resolve, reject) {
            var query = _this.__addPaginationAndFieldsToQuery(pagination, fields);
            _this.__request("GET", "/resources", query).then(function (resArr) {
                resolve(_this.__mapTypeList(resArr, Resource_1.default));
            }).catch(reject);
        });
    };
    /**
     Alias of getResourceList
     **/
    Spiget.prototype.getResources = function (pagination, fields) {
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return this.getResourceList(pagination, fields);
    };
    /**
     GET /resources/for/{version}
     Get resources for the specified version(s)

     @param	version	Version(s), separated by commas
     @param	method	Method to use to check for versions
     **/
    Spiget.prototype.getResourcesForVersions = function (version, method, pagination, fields) {
        var _this = this;
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return new Promise(function (resolve, reject) {
            var query = _this.__addPaginationAndFieldsToQuery(pagination, fields);
            query["method"] = method;
            _this.__request("GET", "/resources/for/" + version + "", query).then(function (resArr) {
                resolve(_this.__mapTypeList(resArr, Resource_1.default));
            }).catch(reject);
        });
    };
    /**
     GET /resources/free
     Get a list of available free resources

     **/
    Spiget.prototype.getFreeResourceList = function (pagination, fields) {
        var _this = this;
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return new Promise(function (resolve, reject) {
            var query = _this.__addPaginationAndFieldsToQuery(pagination, fields);
            _this.__request("GET", "/resources/free", query).then(function (resArr) {
                resolve(_this.__mapTypeList(resArr, Resource_1.default));
            }).catch(reject);
        });
    };
    /**
     Alias of getFreeResourceList
     **/
    Spiget.prototype.getFreeResources = function (pagination, fields) {
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return this.getFreeResourceList(pagination, fields);
    };
    /**
     GET /resources/new
     Get all new resources

     **/
    Spiget.prototype.getNewResources = function (pagination, fields) {
        var _this = this;
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return new Promise(function (resolve, reject) {
            var query = _this.__addPaginationAndFieldsToQuery(pagination, fields);
            _this.__request("GET", "/resources/new", query).then(function (resArr) {
                resolve(_this.__mapTypeList(resArr, Resource_1.default));
            }).catch(reject);
        });
    };
    /**
     GET /resources/premium
     Get a list of available premium resources

     **/
    Spiget.prototype.getPremiumResourceList = function (pagination, fields) {
        var _this = this;
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return new Promise(function (resolve, reject) {
            var query = _this.__addPaginationAndFieldsToQuery(pagination, fields);
            _this.__request("GET", "/resources/premium", query).then(function (resArr) {
                resolve(_this.__mapTypeList(resArr, Resource_1.default));
            }).catch(reject);
        });
    };
    /**
     Alias of getPremiumResourceList
     **/
    Spiget.prototype.getPremiumResources = function (pagination, fields) {
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return this.getPremiumResourceList(pagination, fields);
    };
    /**
     GET /resources/{resource}
     Get a resource by its ID

     @param	resource	Resource ID
     **/
    Spiget.prototype.getResourceDetails = function (resource) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = {};
            _this.__request("GET", "/resources/" + resource + "", query).then(function (res) {
                resolve(_this.__mapType(res, Resource_1.default));
            }).catch(reject);
        });
    };
    /**
     Alias of getResourceDetails
     **/
    Spiget.prototype.getResource = function (resource) {
        return this.getResourceDetails(resource);
    };
    /**
     GET /resources/{resource}/author
     Get the resource author

     @param	resource	Resource ID
     **/
    Spiget.prototype.getResourceAuthor = function (resource) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = {};
            _this.__request("GET", "/resources/" + resource + "/author", query).then(function (res) {
                resolve(_this.__mapType(res, Author_1.default));
            }).catch(reject);
        });
    };
    /**
     GET /resources/{resource}/reviews
     Get reviews of a resource

     @param	resource	Resource ID
     **/
    Spiget.prototype.getResourceReviews = function (resource, pagination, fields) {
        var _this = this;
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return new Promise(function (resolve, reject) {
            var query = _this.__addPaginationAndFieldsToQuery(pagination, fields);
            _this.__request("GET", "/resources/" + resource + "/reviews", query).then(function (resArr) {
                resolve(_this.__mapTypeList(resArr, ResourceReview_1.default));
            }).catch(reject);
        });
    };
    /**
     GET /resources/{resource}/updates
     Get updates of a resource

     @param	resource	Resource ID
     **/
    Spiget.prototype.getResourceUpdates = function (resource, pagination, fields) {
        var _this = this;
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return new Promise(function (resolve, reject) {
            var query = _this.__addPaginationAndFieldsToQuery(pagination, fields);
            _this.__request("GET", "/resources/" + resource + "/updates", query).then(function (resArr) {
                resolve(_this.__mapTypeList(resArr, ResourceUpdate_1.default));
            }).catch(reject);
        });
    };
    /**
     GET /resources/{resource}/versions
     Get versions of a resource

     @param	resource	Resource ID
     **/
    Spiget.prototype.getResourceVersions = function (resource, pagination, fields) {
        var _this = this;
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return new Promise(function (resolve, reject) {
            var query = _this.__addPaginationAndFieldsToQuery(pagination, fields);
            _this.__request("GET", "/resources/" + resource + "/versions", query).then(function (resArr) {
                resolve(_this.__mapTypeList(resArr, ResourceVersion_1.default));
            }).catch(reject);
        });
    };
    /**
     GET /resources/{resource}/versions/latest
     Get the latest resource version

     @param	resource	Resource ID
     **/
    Spiget.prototype.getLatestResourceVersion = function (resource) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = {};
            _this.__request("GET", "/resources/" + resource + "/versions/latest", query).then(function (res) {
                resolve(_this.__mapType(res, ResourceVersion_1.default));
            }).catch(reject);
        });
    };
    /**
     GET /resources/{resource}/versions/{version}
     Get a specific resource version by its ID

     @param	resource	Resource ID
     @param	version	Version ID
     **/
    Spiget.prototype.getResourceVersion = function (resource, version) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var query = {};
            _this.__request("GET", "/resources/" + resource + "/versions/" + version + "", query).then(function (res) {
                resolve(_this.__mapType(res, ResourceVersion_1.default));
            }).catch(reject);
        });
    };
    ///// SEARCH
    /**
     GET /search/authors/{query}
     Search authors

     @param	query	Search query
     @param	field	Field to search in
     **/
    Spiget.prototype.getAuthorSearch = function (query, field, pagination, fields) {
        var _this = this;
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return new Promise(function (resolve, reject) {
            var query = _this.__addPaginationAndFieldsToQuery(pagination, fields);
            query["field"] = field;
            _this.__request("GET", "/search/authors/" + query + "", query).then(function (resArr) {
                resolve(_this.__mapTypeList(resArr, Author_1.default));
            }).catch(reject);
        });
    };
    /**
     GET /search/resources/{query}
     Search resources

     @param	query	Search query
     @param	field	Field to search in
     **/
    Spiget.prototype.getResourceSearch = function (query, field, pagination, fields) {
        var _this = this;
        if (pagination === void 0) { pagination = undefined; }
        if (fields === void 0) { fields = []; }
        return new Promise(function (resolve, reject) {
            var query = _this.__addPaginationAndFieldsToQuery(pagination, fields);
            query["field"] = field;
            _this.__request("GET", "/search/resources/" + query + "", query).then(function (resArr) {
                resolve(_this.__mapTypeList(resArr, Resource_1.default));
            }).catch(reject);
        });
    };
    return Spiget;
}());
exports.Spiget = Spiget;
exports.default = Spiget;

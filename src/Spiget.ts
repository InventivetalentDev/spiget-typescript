import Axios, { AxiosInstance, AxiosResponse, Method } from "axios";

import Resource from "./types/Resource";
import ResourceFile from "./types/ResourceFile";
import Icon from "./types/Icon";
import ResourceVersion from "./types/ResourceVersion";
import ResourceUpdate from "./types/ResourceUpdate";
import ResourceRating from "./types/ResourceRating";
import ResourceReview from "./types/ResourceReview";
import Author from "./types/Author";
import Category from "./types/Category";
import IdReference from "./types/IdReference";
import Error from "./Error"
import { Pagination } from "./Pagination";
import SpigetType, { Constructor as TypeConstructor } from "./SpigetType";
import AuthorImpl from "./types_/AuthorImpl";
import ResourceImpl from "./types_/ResourceImpl";
import ResourceReviewImpl from "./types_/ResourceReviewImpl";
import CategoryImpl from "./types_/CategoryImpl";


export class Spiget {

    __apiBase: String;
    __spigotMcUrl: String;
    axios: AxiosInstance;

    constructor(apiBase = "https://api.spiget.org/v2", userAgent = "spiget-typescript", spigotMcUrl = "https://spigotmc.org") {
        this.__apiBase = apiBase;
        this.__spigotMcUrl = spigotMcUrl;
        this.axios = Axios.create({
            baseURL: apiBase,
            timeout: 10000,
            headers: {
                "User-Agent": userAgent
            },
            responseType: "json"
        })
    }

    __request(method: Method = "GET", endpoint = "/", query = {}, body = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            this.axios.request({
                method: method,
                url: endpoint,
                params: query,
                data: body
            }).then(response => {
                if (response.status >= 200 && response.status < 400 && response.data && !response.data.hasOwnProperty("error")) {
                    resolve(response.data)
                } else if (response.data.hasOwnProperty("error")) {
                    let err = new Error(response.data);
                    err.code = response.status;
                    reject(err)
                }
            }).catch(reject);
        })
    }

    __addPaginationAndFieldsToQuery(pagination: Pagination, fields: Fields, query: any = {}) {
        if (pagination !== undefined) {
            query.size = pagination.size || 10;
            query.page = pagination.page || 1;
            query.sort = pagination.sort || "";
        }
        if (fields !== undefined) {
            query.fields = fields.join(",");
        }
        return query;
    }

    __mapType<T extends SpigetType>(data: any, type: TypeConstructor<T>): T {
        return new type(data, this);
        //return this.__typeFactory.create(type, data, this)
    }

    __mapTypeList<T extends SpigetType>(data: any, type: TypeConstructor<T>): Array<T> {
        let mapped = [];
        data.forEach(d => {
            mapped.push(this.__mapType(d, type));
        });
        return mapped;
    }

    ///// AUTHORS

    /*
    getAuthors(pagination: Pagination = undefined, fields: Fields = []): Promise<Array<Author>> {
        return new Promise<Array<Author>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/authors", query).then(authors => {
                resolve(this.__mapTypeList(authors, AuthorImpl));
            }).catch(reject);
        })
    }

    getAuthor(author: Id): Promise<Author> {
        return new Promise<Author>((resolve, reject) => {
            this.__request("GET", "/authors/" + author).then(author => {
                resolve(this.__mapType(author, AuthorImpl));
            }).catch(reject);
        })
    }

    getAuthorResources(author: Id, pagination: Pagination = undefined, fields: Fields = []): Promise<Array<Resource>> {
        return new Promise<Array<Resource>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/authors/" + author + "/resources", query).then(resources => {
                resolve(this.__mapTypeList(resources, ResourceImpl));
            }).catch(reject);
        })
    }

    getAuthorReviews(author: Id, pagination: Pagination = undefined, fields: Fields = []): Promise<Array<ResourceReview>> {
        return new Promise<Array<ResourceReviewImpl>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/authors/" + author + "/reviews", query).then(reviews => {
                resolve(this.__mapTypeList(reviews, ResourceReviewImpl));
            }).catch(reject);
        })
    }
    */

    getAuthors(pagination: Pagination, fields: Fields): Promise<Array<Author>> {
        return this.getAuthorList(pagination, fields);
    }

    /**
     GET /authors
     Get a list of available authors
     Note: This only includes members involved with resources, either being their author or having reviewed a resource

     **/
    getAuthorList(pagination: Pagination, fields: Fields): Promise<Array<Author>> {
        return new Promise<Array<Author>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/authors", query).then(resArr => {
                resolve(this.__mapTypeList(resArr, Author));
            }).catch(reject);
        });
    }


    /**
     GET /authors/{author}
     Get details about an author

     **/
    getAuthorDetails(author: string): Promise<Author> {
        return new Promise<Author>((resolve, reject) => {
            let query = {};
            this.__request("GET", "/authors/"+author+"", query).then(res => {
                resolve(this.__mapType(res, Author));
            }).catch(reject);
        });
    }


    /**
     GET /authors/{author}/resources
     Get an author's resources

     **/
    getAuthorResources(author: string, pagination: Pagination, fields: Fields): Promise<Array<Resource>> {
        return new Promise<Array<Resource>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/authors/"+author+"/resources", query).then(resArr => {
                resolve(this.__mapTypeList(resArr, Resource));
            }).catch(reject);
        });
    }


    /**
     GET /authors/{author}/reviews
     Get an author's reviews left on resources

     **/
    getAuthorReviews(author: string, pagination: Pagination, fields: Fields): Promise<Array<ResourceReview>> {
        return new Promise<Array<ResourceReview>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/authors/"+author+"/reviews", query).then(resArr => {
                resolve(this.__mapTypeList(resArr, ResourceReview));
            }).catch(reject);
        });
    }

    ///// CATEGORIES

    /*
    getCategories(pagination: Pagination = undefined, fields: Fields = []): Promise<Array<Category>> {
        return new Promise<Array<Category>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/categories", query).then(categories => {
                resolve(this.__mapTypeList(categories, CategoryImpl));
            }).catch(reject);
        })
    }

    getCategory(category: Id): Promise<Category> {
        return new Promise<Category>((resolve, reject) => {
            this.__request("GET", "/categories/" + category).then(category => {
                resolve(this.__mapType(category, CategoryImpl));
            }).catch(reject);
        })
    }


    getCategoryResources(category: Id, pagination: Pagination = undefined, fields: Fields = []): Promise<Array<Resource>> {
        return new Promise<Array<Resource>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/categories/" + category + "/resources", query).then(resources => {
                resolve(this.__mapTypeList(resources, ResourceImpl));
            }).catch(reject);
        })
    }
    */

    getCategories(pagination: Pagination, fields: Fields): Promise<Array<Category>> {
        return this.getCategoryList(pagination, fields);
    }

    /**
     GET /categories
     Get a list of categories

     **/
    getCategoryList(pagination: Pagination, fields: Fields): Promise<Array<Category>> {
        return new Promise<Array<Category>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/categories", query).then(resArr => {
                resolve(this.__mapTypeList(resArr, Category));
            }).catch(reject);
        });
    }


    /**
     GET /categories/{category}
     Get details about a category

     **/
    getCategoryDetails(category: string): Promise<Category> {
        return new Promise<Category>((resolve, reject) => {
            let query = {};
            this.__request("GET", "/categories/"+category+"", query).then(res => {
                resolve(this.__mapType(res, Category));
            }).catch(reject);
        });
    }


    /**
     GET /categories/{category}/resources
     Get the resources in a category

     **/
    getCategoryResources(category: string, pagination: Pagination, fields: Fields): Promise<Array<Resource>> {
        return new Promise<Array<Resource>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/categories/"+category+"/resources", query).then(resArr => {
                resolve(this.__mapTypeList(resArr, Resource));
            }).catch(reject);
        });
    }


    ///// RESOURCES

    getResources(pagination: Pagination, fields: Fields): Promise<Array<Resource>> {
        return this.getResourceList(pagination, fields);
    }

    /**
     GET /resources
     Get a list of available resources (premium and free)

     **/
    getResourceList(pagination: Pagination, fields: Fields): Promise<Array<Resource>> {
        return new Promise<Array<Resource>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/resources", query).then(resArr => {
                resolve(this.__mapTypeList(resArr, Resource));
            }).catch(reject);
        });
    }


    /**
     GET /resources/for/{version}
     Get resources for the specified version(s)

     **/
    getResourcesForVersions(version: string, method: string, pagination: Pagination, fields: Fields): Promise<Array<Resource>> {
        return new Promise<Array<Resource>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            query["method"] = method;
            this.__request("GET", "/resources/for/"+version+"", query).then(resArr => {
                resolve(this.__mapTypeList(resArr, Resource));
            }).catch(reject);
        });
    }


    /**
     GET /resources/free
     Get a list of available free resources

     **/
    getFreeResourceList(pagination: Pagination, fields: Fields): Promise<Array<Resource>> {
        return new Promise<Array<Resource>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/resources/free", query).then(resArr => {
                resolve(this.__mapTypeList(resArr, Resource));
            }).catch(reject);
        });
    }


    /**
     GET /resources/new
     Get all new resources

     **/
    getNewResources(pagination: Pagination, fields: Fields): Promise<Array<Resource>> {
        return new Promise<Array<Resource>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/resources/new", query).then(resArr => {
                resolve(this.__mapTypeList(resArr, Resource));
            }).catch(reject);
        });
    }


    /**
     GET /resources/premium
     Get a list of available premium resources

     **/
    getPremiumResourceList(pagination: Pagination, fields: Fields): Promise<Array<Resource>> {
        return new Promise<Array<Resource>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/resources/premium", query).then(resArr => {
                resolve(this.__mapTypeList(resArr, Resource));
            }).catch(reject);
        });
    }


    /**
     GET /resources/{resource}
     Get a resource by its ID or name

     **/
    getResourceDetails(resource: string): Promise<Resource> {
        return new Promise<Resource>((resolve, reject) => {
            let query = {};
            this.__request("GET", "/resources/"+resource+"", query).then(res => {
                resolve(this.__mapType(res, Resource));
            }).catch(reject);
        });
    }


    /**
     GET /resources/{resource}/author
     Get the resource author

     **/
    getResourceAuthor(resource: string): Promise<Author> {
        return new Promise<Author>((resolve, reject) => {
            let query = {};
            this.__request("GET", "/resources/"+resource+"/author", query).then(res => {
                resolve(this.__mapType(res, Author));
            }).catch(reject);
        });
    }


    /**
     GET /resources/{resource}/download
     Download a resource

     **/
    getResourceDownload(resource: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let query = {};
            this.__request("GET", "/resources/"+resource+"/download", query).then(res => {
                resolve(this.__mapType(res, any));
            }).catch(reject);
        });
    }


    /**
     GET /resources/{resource}/reviews
     Get reviews of a resource

     **/
    getResourceReviews(resource: string, pagination: Pagination, fields: Fields): Promise<Array<ResourceReview>> {
        return new Promise<Array<ResourceReview>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/resources/"+resource+"/reviews", query).then(resArr => {
                resolve(this.__mapTypeList(resArr, ResourceReview));
            }).catch(reject);
        });
    }


    /**
     GET /resources/{resource}/updates
     Get updates of a resource

     **/
    getResourceUpdates(resource: string, pagination: Pagination, fields: Fields): Promise<Array<ResourceUpdate>> {
        return new Promise<Array<ResourceUpdate>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/resources/"+resource+"/updates", query).then(resArr => {
                resolve(this.__mapTypeList(resArr, ResourceUpdate));
            }).catch(reject);
        });
    }


    /**
     GET /resources/{resource}/versions
     Get versions of a resource

     **/
    getResourceVersions(resource: string, pagination: Pagination, fields: Fields): Promise<Array<ResourceVersion>> {
        return new Promise<Array<ResourceVersion>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/resources/"+resource+"/versions", query).then(resArr => {
                resolve(this.__mapTypeList(resArr, ResourceVersion));
            }).catch(reject);
        });
    }


    /**
     GET /resources/{resource}/versions/{version}/download
     Download a specific resource version

     Note: This only redirects to the stored download location and might not download a file (i.e. for external resources)

     **/
    getResourceVersionDownload(resource: string, version: string) {
        return new any((resolve, reject) => {
            let query = {};
            this.__request("GET", "/resources/"+resource+"/versions/"+version+"/download", query).then(res => {
                resolve(this.__mapType(res, any));
            }).catch(reject);
        });
    }



}

export default Spiget

export type Id = number
export type IdOrName = number | string
export type Fields = Array<string>

export { Author, Category, Icon, Resource, ResourceFile, ResourceRating, ResourceReview, ResourceUpdate, ResourceVersion }
export { Pagination, Error, SpigetType }

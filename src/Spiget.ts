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
import {Pagination} from "./Pagination";
import SpigetType, { Constructor as TypeConstructor } from "./SpigetType";
import AuthorImpl from "./types_/AuthorImpl";
import ResourceImpl from "./types_/ResourceImpl";


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

    getAuthors(pagination: Pagination = undefined, fields: Fields = []): Promise<Array<Author>> {
        return new Promise<Array<Author>>((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/authors", query).then(authors => {
                resolve(this.__mapTypeList(authors, AuthorImpl));
            }).catch(reject);
        })
    }

    getAuthor(author: Id): Promise<Author>{
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



}
export default Spiget

export type Id = number
export type IdOrName = number | string
export type Fields = Array<string>

export {Author, Category, Icon, Resource, ResourceFile, ResourceRating, ResourceReview, ResourceUpdate, ResourceVersion}
export {Pagination, Error, SpigetType}

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
import Pagination from "./Pagination";


export default class Spiget {

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

    mapType<T>(data: any, type: T){
    }

    ///// AUTHORS

    getAuthors(pagination: Pagination = undefined, fields: Fields = []): Promise<Array<Author>> {
        return new Promise((resolve, reject) => {
            let query = this.__addPaginationAndFieldsToQuery(pagination, fields);
            this.__request("GET", "/authors", query).then(rawAuthorList => {
                let authorList = [];

                rawAuthorList.forEach(ra => {
                    authorList.push(new Author(ra, this))
                });
                resolve(authorList);
            }).catch(reject);
        })
    }


}


export type Id = number
export type Fields = Array<string>


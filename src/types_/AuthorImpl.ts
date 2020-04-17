import Author from "../types/Author";
import { Pagination } from "../Pagination";
import Resource from "../types/Resource";
import { Fields, Id } from "../Spiget";
import ResourceVersion from "../types/ResourceVersion";
import ResourceReview from "../types/ResourceReview";

export default class AuthorImpl extends Author {

    getResources(pagination: Pagination = undefined, fields: Fields = []): Promise<Array<Resource>> {
        return this._spiget.getAuthorResources(this.id, pagination, fields);
    }

    getReviews(pagination: Pagination = undefined, fields: Fields = []): Promise<Array<ResourceReview>> {
        return this._spiget.getAuthorReviews(this.id, pagination, fields);
    }

}

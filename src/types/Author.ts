import AuthorBase from "../generated_types/AuthorBase";
import { Pagination } from "../Pagination";
import { Fields } from "../Spiget";
import Resource from "./Resource";
import ResourceReview from "./ResourceReview";

export default class Author extends AuthorBase {

    getResources(pagination: Pagination = undefined, fields: Fields = []): Promise<Array<Resource>> {
        return this.spiget.getAuthorResources(this.id, pagination, fields);
    }

    getReviews(pagination: Pagination = undefined, fields: Fields = []): Promise<Array<ResourceReview>> {
        return this.spiget.getAuthorReviews(this.id, pagination, fields);
    }

}

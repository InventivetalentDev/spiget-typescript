import AuthorBase from "../generated_types/AuthorBase";
import { Pagination } from "../Pagination";
import { Fields } from "../Spiget";
import Resource from "./Resource";
import ResourceReview from "./ResourceReview";
export default class Author extends AuthorBase {
    getResources(pagination?: Pagination, fields?: Fields): Promise<Array<Resource>>;
    getReviews(pagination?: Pagination, fields?: Fields): Promise<Array<ResourceReview>>;
}

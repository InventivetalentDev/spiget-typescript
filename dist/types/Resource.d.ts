import ResourceBase from "../generated_types/ResourceBase";
import Author from "./Author";
import { Pagination } from "../Pagination";
import { Fields } from "../Spiget";
import ResourceUpdate from "./ResourceUpdate";
import ResourceVersion from "./ResourceVersion";
import ResourceReview from "./ResourceReview";
export default class Resource extends ResourceBase {
    /**
     * Check if this is a full resource object (via /resources/:id) or a stripped down object (via /resources)
     */
    isFullResource(): boolean;
    getFullResource(): Promise<Resource>;
    getAuthor(): Promise<Author>;
    getUpdates(pagination?: Pagination, fields?: Fields): Promise<Array<ResourceUpdate>>;
    getVersions(pagination?: Pagination, fields?: Fields): Promise<Array<ResourceVersion>>;
    getReviews(pagination?: Pagination, fields?: Fields): Promise<Array<ResourceReview>>;
}

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
    isFullResource() {
        return this.updates != null && this.versions != null;
    }

    getFullResource(): Promise<Resource> {
        return this._spiget.getResource(this.id);
    }

    getAuthor(): Promise<Author> {
        return this._spiget.getResourceAuthor(this.id);
    }

    getUpdates(pagination: Pagination = undefined, fields: Fields = []): Promise<Array<ResourceUpdate>> {
        return this._spiget.getResourceUpdates(this.id, pagination, fields);
    }

    getVersions(pagination: Pagination = undefined, fields: Fields = []): Promise<Array<ResourceVersion>> {
        return this._spiget.getResourceVersions(this.id, pagination, fields);
    }

    getReviews(pagination: Pagination = undefined, fields: Fields = []): Promise<Array<ResourceReview>> {
        return this._spiget.getResourceReviews(this.id, pagination, fields);
    }

}

import Resource from "../types/Resource";
import Author from "../types/Author";
import ResourceUpdate from "../types/ResourceUpdate";
import { Fields, Pagination } from "../Spiget";
import ResourceVersion from "../types/ResourceVersion";
import ResourceReview from "../types/ResourceReview";

export default class ResourceImpl extends Resource {

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

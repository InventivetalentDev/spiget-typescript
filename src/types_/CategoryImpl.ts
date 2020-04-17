import Category from "../types/Category";
import { Pagination } from "../Pagination";
import { Fields } from "../Spiget";
import Resource from "../types/Resource";

export default class CategoryImpl extends Category {

    getResources(pagination: Pagination = undefined, fields: Fields = []): Promise<Array<Resource>> {
        return this._spiget.getCategoryResources(this.id, pagination, fields);
    }

}

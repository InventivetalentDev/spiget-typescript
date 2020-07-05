import CategoryBase from "../generated_types/CategoryBase";
import { Pagination } from "../Pagination";
import { Fields } from "../Spiget";
import Resource from "./Resource";

export default class Category extends CategoryBase {

    getResources(pagination: Pagination = undefined, fields: Fields = []): Promise<Array<Resource>> {
        return this.spiget.getCategoryResources(this.id, pagination, fields);
    }

}

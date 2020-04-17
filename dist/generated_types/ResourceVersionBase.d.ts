import Spiget, { Id } from "../Spiget";
import SpigetType from "../SpigetType";
import ResourceRating from "../types/ResourceRating";
export declare class ResourceVersion extends SpigetType {
    /** Version ID **/
    id: Id;
    /** Version name (e.g. v1.0) **/
    name: string;
    /** Timestamp of the version's release date **/
    releaseDate: number;
    /** Amount of downloads **/
    downloads: number;
    rating: ResourceRating;
    constructor(source: any, spiget?: Spiget);
}
export default ResourceVersion;

import Spiget, { Id } from "../Spiget";
import SpigetType from "../SpigetType";
import ResourceFile from "../types/ResourceFile";
import ResourceRating from "../types/ResourceRating";
import Icon from "../types/Icon";
import IdReference from "../types/IdReference";
export declare class Resource extends SpigetType {
    /** Id of the Resource **/
    id: Id;
    /** Name of the Resource **/
    name: string;
    /** Tag line of the Resource **/
    tag: string;
    /** Contributors **/
    contributors: string;
    /** Number of likes **/
    likes: number;
    file: ResourceFile;
    testedVersions: Array<string>;
    /** Map of external and custom links in the resource description **/
    links: object;
    rating: ResourceRating;
    /** Release timestamp **/
    releaseDate: number;
    /** Update timestamp **/
    updateDate: number;
    /** Amount of downloads **/
    downloads: number;
    /** Whether this resource is external (not hosted on SpigotMC.org) **/
    external: boolean;
    icon: Icon;
    /** Whether the resource is a premium resource^ **/
    premium: boolean;
    /** Price of the resource (only if the resource is premium) **/
    price: number;
    /** Price Currency of the resource (only if the resource is premium) **/
    currency: string;
    /** List of review IDs on this resource - only present if directly requesting the resource **/
    reviews: Array<IdReference>;
    /** List of version IDs of this resource - only present if directly requesting the resource **/
    versions: Array<IdReference>;
    /** List of update IDs of this resource - only present if directly requesting the resource **/
    updates: Array<IdReference>;
    constructor(source: any, spiget?: Spiget);
}
export default Resource;

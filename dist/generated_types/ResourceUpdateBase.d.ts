import Spiget, { Id } from "../Spiget";
import SpigetType from "../SpigetType";
export declare class ResourceUpdate extends SpigetType {
    /** Update ID **/
    id: Id;
    /** Update title **/
    title: string;
    /** Base64-Encoded description of the update **/
    description: string;
    /** Update timestamp **/
    date: number;
    /** Amount of likes for this update **/
    likes: number;
    constructor(source: any, spiget?: Spiget);
}
export default ResourceUpdate;

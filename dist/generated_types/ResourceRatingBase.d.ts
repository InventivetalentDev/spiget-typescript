import Spiget from "../Spiget";
import SpigetType from "../SpigetType";
export declare class ResourceRating extends SpigetType {
    /** Number of ratings **/
    count: number;
    /** Average rating **/
    average: number;
    constructor(source: any, spiget?: Spiget);
}
export default ResourceRating;

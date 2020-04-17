import Spiget from "../Spiget";
import SpigetType from "../SpigetType";
import Author from "../types/Author";
import ResourceRating from "../types/ResourceRating";
export declare class ResourceReview extends SpigetType {
    author: Author;
    rating: ResourceRating;
    /** Base64-Encoded Review message **/
    message: string;
    /** Base64-Encoded message the author responded with **/
    responseMessage: string;
    /** Version name the review was posted for **/
    version: string;
    /** Review timestamp **/
    date: number;
    constructor(source: any, spiget?: Spiget);
}
export default ResourceReview;

import Spiget from "../Spiget";
import SpigetType from "../SpigetType";
export declare class Icon extends SpigetType {
    /** Relative URL to the image **/
    url: string;
    /** Base64-Encoded image data **/
    data: string;
    constructor(source: any, spiget?: Spiget);
}
export default Icon;

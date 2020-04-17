import Spiget from "../Spiget";
import SpigetType from "../SpigetType";
export declare class ResourceFile extends SpigetType {
    /** File extension (.jar, .zip, .sk) **/
    type: string;
    /** File size **/
    size: number;
    /** File size-unit (KB, MB, GB) **/
    sizeUnit: string;
    /** Relative URL to the file **/
    url: string;
    constructor(source: any, spiget?: Spiget);
}
export default ResourceFile;

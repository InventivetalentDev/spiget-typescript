import Spiget, { Id } from "../Spiget";
import SpigetType from "../SpigetType";
import Icon from "../types/Icon";
export declare class Author extends SpigetType {
    /** Id of the author **/
    id: Id;
    /** Author name **/
    name: string;
    icon: Icon;
    constructor(source: any, spiget?: Spiget);
}
export default Author;

import Spiget, { Id } from "../Spiget";
import SpigetType from "../SpigetType";
export declare class Category extends SpigetType {
    /** Category ID **/
    id: Id;
    /** Category name **/
    name: string;
    constructor(source: any, spiget?: Spiget);
}
export default Category;

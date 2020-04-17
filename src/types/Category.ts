import Spiget from "../Spiget"
import SpigetType from "../SpigetType"

export class Category extends SpigetType {
  /** Category ID **/
  id: number;
  /** Category name **/
  name: string;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    super(source, spiget);
    if (source !== undefined) {
      if (source.hasOwnProperty("id")) this.id = source.id;
      if (source.hasOwnProperty("name")) this.name = source.name;
    }
  }
}
export default Category;

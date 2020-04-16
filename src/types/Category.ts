import Spiget from "../Spiget"
import SpigetType from "../SpigetType"

export class Category extends SpigetType {
  id: number;
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

import Spiget from "../Spiget"
import SpigetType from "../SpigetType"
import Icon from "./Icon";

/* Generated on Thu, 16 Apr 2020 11:51:52 GMT*/
export class Author extends SpigetType {
  id: number;
  name: string;
  icon: Icon;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    super(source, spiget);
    if (source !== undefined) {
      if (source.hasOwnProperty("id")) this.id = source.id;
      if (source.hasOwnProperty("name")) this.name = source.name;
      if (source.hasOwnProperty("icon")) this.icon = source.icon;
    }
  }
}
export default Author;

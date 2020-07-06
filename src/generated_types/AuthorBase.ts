import Spiget, {Id} from "../Spiget"
import SpigetType from "../SpigetType"
import Icon from "../types/Icon";

export class Author extends SpigetType {
  /** Id of the author **/
  id: Id;
  /** Author name **/
  name: string;
  icon: Icon;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    super(source, spiget);
    if (source !== undefined) {
      if (source.hasOwnProperty("id")) this.id = source.id;
      if (source.hasOwnProperty("name")) this.name = source.name;
      if (source.hasOwnProperty("icon")) this.icon = this.spiget.mapType(source.icon, Icon);
    }
  }
}
export default Author;

import Spiget, {Id} from "../Spiget"
import SpigetType from "../SpigetType"

export class IdReference extends SpigetType {
  id: Id;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    super(source, spiget);
    if (source !== undefined) {
      if (source.hasOwnProperty("id")) this.id = source.id;
    }
  }
}
export default IdReference;

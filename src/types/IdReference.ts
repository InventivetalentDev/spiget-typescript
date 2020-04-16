import Spiget from "../Spiget"
import SpigetType from "../SpigetType"

/* Generated on Thu, 16 Apr 2020 11:51:52 GMT*/
export class IdReference extends SpigetType {
  $id: number;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    super(source, spiget);
    if (source !== undefined) {
      if (source.hasOwnProperty("$id")) this.$id = source.$id;
    }
  }
}
export default IdReference;

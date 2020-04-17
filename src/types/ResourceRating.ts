import Spiget, {Id} from "../Spiget"
import SpigetType from "../SpigetType"

export class ResourceRating extends SpigetType {
  /** Number of ratings **/
  count: number;
  /** Average rating **/
  average: number;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    super(source, spiget);
    if (source !== undefined) {
      if (source.hasOwnProperty("count")) this.count = source.count;
      if (source.hasOwnProperty("average")) this.average = source.average;
    }
  }
}
export default ResourceRating;

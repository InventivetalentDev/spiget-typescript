import Spiget from "../Spiget"
import SpigetType from "../SpigetType"

/* Generated on Thu, 16 Apr 2020 12:59:02 GMT*/
export class ResourceRating extends SpigetType {
  count: number;
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

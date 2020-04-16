import Spiget from "../Spiget"
import SpigetType from "../SpigetType"

/* Generated on Thu, 16 Apr 2020 10:50:06 GMT*/
export default class ResourceFile extends SpigetType {
  type: string;
  size: number;
  sizeUnit: string;
  url: string;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    super(source, spiget);
    if (source !== undefined) {
      if (source.hasOwnProperty("type")) this.type = source.type;
      if (source.hasOwnProperty("size")) this.size = source.size;
      if (source.hasOwnProperty("sizeUnit")) this.sizeUnit = source.sizeUnit;
      if (source.hasOwnProperty("url")) this.url = source.url;
    }
  }
}

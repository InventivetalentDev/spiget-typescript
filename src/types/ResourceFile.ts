import Spiget from "../Spiget"
import SpigetType from "../SpigetType"

export class ResourceFile extends SpigetType {
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
export default ResourceFile;

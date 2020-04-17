import Spiget from "../Spiget"
import SpigetType from "../SpigetType"

export class ResourceFile extends SpigetType {
  /** File extension (.jar, .zip, .sk) **/
  type: string;
  /** File size **/
  size: number;
  /** File size-unit (KB, MB, GB) **/
  sizeUnit: string;
  /** Relative URL to the file **/
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

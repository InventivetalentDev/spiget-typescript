import Spiget from "../Spiget"
import SpigetType from "../SpigetType"

export class Icon extends SpigetType {
  url: string;
  data: string;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    super(source, spiget);
    if (source !== undefined) {
      if (source.hasOwnProperty("url")) this.url = source.url;
      if (source.hasOwnProperty("data")) this.data = source.data;
    }
  }
}
export default Icon;

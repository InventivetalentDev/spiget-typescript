import Spiget from "../Spiget"
import SpigetType from "../SpigetType"

/* Generated on Thu, 16 Apr 2020 10:50:06 GMT*/
export default class Icon extends SpigetType {
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

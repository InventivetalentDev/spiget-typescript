import Spiget from '../Spiget'

/* Generated on Thu, 16 Apr 2020 10:39:57 GMT*/
export default class ResourceFile {
  _raw: any;
  _spiget: Spiget;
  type: string;
  size: number;
  sizeUnit: string;
  url: string;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    this._raw = source;
    this._spiget = spiget;
    if (source !== undefined) {
      if (source.hasOwnProperty("type")) this.type = source.type;
      if (source.hasOwnProperty("size")) this.size = source.size;
      if (source.hasOwnProperty("sizeUnit")) this.sizeUnit = source.sizeUnit;
      if (source.hasOwnProperty("url")) this.url = source.url;
    }
  }
}

import Spiget from '../Spiget'

/* Generated on Thu, 16 Apr 2020 10:39:57 GMT*/
export default class Icon {
  _raw: any;
  _spiget: Spiget;
  url: string;
  data: string;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    this._raw = source;
    this._spiget = spiget;
    if (source !== undefined) {
      if (source.hasOwnProperty("url")) this.url = source.url;
      if (source.hasOwnProperty("data")) this.data = source.data;
    }
  }
}

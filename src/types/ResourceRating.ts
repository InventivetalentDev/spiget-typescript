import Spiget from '../Spiget'

/* Generated on Thu, 16 Apr 2020 10:39:57 GMT*/
export default class ResourceRating {
  _raw: any;
  _spiget: Spiget;
  count: number;
  average: number;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    this._raw = source;
    this._spiget = spiget;
    if (source !== undefined) {
      if (source.hasOwnProperty("count")) this.count = source.count;
      if (source.hasOwnProperty("average")) this.average = source.average;
    }
  }
}


/* Generated on Tue, 14 Apr 2020 23:48:14 GMT*/
export default class ResourceRating {
  _raw: any;
  count: number;
  average: number;

  constructor(source: any) {
    this._raw = source;
    if (source !== undefined) {
      if (source.hasOwnProperty("count")) this.count = source.count;
      if (source.hasOwnProperty("average")) this.average = source.average;
    }
  }
}

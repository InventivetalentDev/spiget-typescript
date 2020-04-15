
/* Generated on Tue, 14 Apr 2020 23:48:14 GMT*/
export default class Icon {
  _raw: any;
  url: string;
  data: string;

  constructor(source: any) {
    this._raw = source;
    if (source !== undefined) {
      if (source.hasOwnProperty("url")) this.url = source.url;
      if (source.hasOwnProperty("data")) this.data = source.data;
    }
  }
}


/* Generated on Tue, 14 Apr 2020 23:48:14 GMT*/
export default class ResourceFile {
  _raw: any;
  type: string;
  size: number;
  sizeUnit: string;
  url: string;

  constructor(source: any) {
    this._raw = source;
    if (source !== undefined) {
      if (source.hasOwnProperty("type")) this.type = source.type;
      if (source.hasOwnProperty("size")) this.size = source.size;
      if (source.hasOwnProperty("sizeUnit")) this.sizeUnit = source.sizeUnit;
      if (source.hasOwnProperty("url")) this.url = source.url;
    }
  }
}

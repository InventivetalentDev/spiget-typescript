
/* Generated on Tue, 14 Apr 2020 23:48:14 GMT*/
export default class Category {
  _raw: any;
  id: number;
  name: string;

  constructor(source: any) {
    this._raw = source;
    if (source !== undefined) {
      if (source.hasOwnProperty("id")) this.id = source.id;
      if (source.hasOwnProperty("name")) this.name = source.name;
    }
  }
}

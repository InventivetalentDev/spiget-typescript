import Icon from "./Icon";

/* Generated on Tue, 14 Apr 2020 23:48:14 GMT*/
export default class Author {
  _raw: any;
  id: number;
  name: string;
  icon: Icon;

  constructor(source: any) {
    this._raw = source;
    if (source !== undefined) {
      if (source.hasOwnProperty("id")) this.id = source.id;
      if (source.hasOwnProperty("name")) this.name = source.name;
      if (source.hasOwnProperty("icon")) this.icon = source.icon;
    }
  }
}

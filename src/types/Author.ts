import Spiget from '../Spiget'
import Icon from "./Icon";

/* Generated on Thu, 16 Apr 2020 10:39:57 GMT*/
export default class Author {
  _raw: any;
  _spiget: Spiget;
  id: number;
  name: string;
  icon: Icon;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    this._raw = source;
    this._spiget = spiget;
    if (source !== undefined) {
      if (source.hasOwnProperty("id")) this.id = source.id;
      if (source.hasOwnProperty("name")) this.name = source.name;
      if (source.hasOwnProperty("icon")) this.icon = source.icon;
    }
  }
}

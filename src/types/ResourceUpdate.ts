import Spiget from '../Spiget'

/* Generated on Thu, 16 Apr 2020 10:39:57 GMT*/
export default class ResourceUpdate {
  _raw: any;
  _spiget: Spiget;
  id: number;
  title: string;
  description: string;
  date: number;
  likes: number;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    this._raw = source;
    this._spiget = spiget;
    if (source !== undefined) {
      if (source.hasOwnProperty("id")) this.id = source.id;
      if (source.hasOwnProperty("title")) this.title = source.title;
      if (source.hasOwnProperty("description")) this.description = source.description;
      if (source.hasOwnProperty("date")) this.date = source.date;
      if (source.hasOwnProperty("likes")) this.likes = source.likes;
    }
  }
}

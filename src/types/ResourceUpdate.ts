
/* Generated on Tue, 14 Apr 2020 23:48:14 GMT*/
export default class ResourceUpdate {
  _raw: any;
  id: number;
  title: string;
  description: string;
  date: number;
  likes: number;

  constructor(source: any) {
    this._raw = source;
    if (source !== undefined) {
      if (source.hasOwnProperty("id")) this.id = source.id;
      if (source.hasOwnProperty("title")) this.title = source.title;
      if (source.hasOwnProperty("description")) this.description = source.description;
      if (source.hasOwnProperty("date")) this.date = source.date;
      if (source.hasOwnProperty("likes")) this.likes = source.likes;
    }
  }
}

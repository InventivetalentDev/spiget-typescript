import ResourceRating from "./ResourceRating";

/* Generated on Tue, 14 Apr 2020 23:48:14 GMT*/
export default class ResourceVersion {
  _raw: any;
  id: number;
  name: string;
  releaseDate: number;
  downloads: number;
  rating: ResourceRating;

  constructor(source: any) {
    this._raw = source;
    if (source !== undefined) {
      if (source.hasOwnProperty("id")) this.id = source.id;
      if (source.hasOwnProperty("name")) this.name = source.name;
      if (source.hasOwnProperty("releaseDate")) this.releaseDate = source.releaseDate;
      if (source.hasOwnProperty("downloads")) this.downloads = source.downloads;
      if (source.hasOwnProperty("rating")) this.rating = source.rating;
    }
  }
}

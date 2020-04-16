import Spiget from '../Spiget'
import ResourceRating from "./ResourceRating";

/* Generated on Thu, 16 Apr 2020 10:39:57 GMT*/
export default class ResourceVersion {
  _raw: any;
  _spiget: Spiget;
  id: number;
  name: string;
  releaseDate: number;
  downloads: number;
  rating: ResourceRating;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    this._raw = source;
    this._spiget = spiget;
    if (source !== undefined) {
      if (source.hasOwnProperty("id")) this.id = source.id;
      if (source.hasOwnProperty("name")) this.name = source.name;
      if (source.hasOwnProperty("releaseDate")) this.releaseDate = source.releaseDate;
      if (source.hasOwnProperty("downloads")) this.downloads = source.downloads;
      if (source.hasOwnProperty("rating")) this.rating = source.rating;
    }
  }
}

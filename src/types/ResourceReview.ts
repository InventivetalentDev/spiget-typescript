import Author from "./Author";
import ResourceRating from "./ResourceRating";

/* Generated on Tue, 14 Apr 2020 23:48:14 GMT*/
export default class ResourceReview {
  _raw: any;
  author: Author;
  rating: ResourceRating;
  message: string;
  responseMessage: string;
  version: string;
  date: number;

  constructor(source: any) {
    this._raw = source;
    if (source !== undefined) {
      if (source.hasOwnProperty("author")) this.author = source.author;
      if (source.hasOwnProperty("rating")) this.rating = source.rating;
      if (source.hasOwnProperty("message")) this.message = source.message;
      if (source.hasOwnProperty("responseMessage")) this.responseMessage = source.responseMessage;
      if (source.hasOwnProperty("version")) this.version = source.version;
      if (source.hasOwnProperty("date")) this.date = source.date;
    }
  }
}

import Spiget from "../Spiget"
import SpigetType from "../SpigetType"
import Author from "./Author";
import ResourceRating from "./ResourceRating";

export class ResourceReview extends SpigetType {
  author: Author;
  rating: ResourceRating;
  message: string;
  responseMessage: string;
  version: string;
  date: number;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    super(source, spiget);
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
export default ResourceReview;

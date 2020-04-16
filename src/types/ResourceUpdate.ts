import Spiget from "../Spiget"
import SpigetType from "../SpigetType"

/* Generated on Thu, 16 Apr 2020 12:59:02 GMT*/
export class ResourceUpdate extends SpigetType {
  id: number;
  title: string;
  description: string;
  date: number;
  likes: number;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    super(source, spiget);
    if (source !== undefined) {
      if (source.hasOwnProperty("id")) this.id = source.id;
      if (source.hasOwnProperty("title")) this.title = source.title;
      if (source.hasOwnProperty("description")) this.description = source.description;
      if (source.hasOwnProperty("date")) this.date = source.date;
      if (source.hasOwnProperty("likes")) this.likes = source.likes;
    }
  }
}
export default ResourceUpdate;

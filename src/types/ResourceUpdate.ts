import Spiget from "../Spiget"
import SpigetType from "../SpigetType"

export class ResourceUpdate extends SpigetType {
  /** Update ID **/
  id: number;
  /** Update title **/
  title: string;
  /** Base64-Encoded description of the update **/
  description: string;
  /** Update timestamp **/
  date: number;
  /** Amount of likes for this update **/
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

import Spiget, {Id} from "../Spiget"
import SpigetType from "../SpigetType"
import ResourceRating from "../types/ResourceRating";

export class ResourceVersion extends SpigetType {
  /** Version ID **/
  id: Id;
  /** Version name (e.g. v1.0) **/
  name: string;
  /** Timestamp of the version's release date **/
  releaseDate: number;
  /** Amount of downloads **/
  downloads: number;
  rating: ResourceRating;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    super(source, spiget);
    if (source !== undefined) {
      if (source.hasOwnProperty("id")) this.id = source.id;
      if (source.hasOwnProperty("name")) this.name = source.name;
      if (source.hasOwnProperty("releaseDate")) this.releaseDate = source.releaseDate;
      if (source.hasOwnProperty("downloads")) this.downloads = source.downloads;
      if (source.hasOwnProperty("rating")) this.rating = this._spiget.__mapType(source.rating, ResourceRating);
    }
  }
}
export default ResourceVersion;

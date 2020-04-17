import Spiget, {Id} from "../Spiget"
import SpigetType from "../SpigetType"
import ResourceFile from "../types/ResourceFile";
import ResourceRating from "../types/ResourceRating";
import Icon from "../types/Icon";
import IdReference from "../types/IdReference";

export class Resource extends SpigetType {
  /** Id of the Resource **/
  id: Id;
  /** Name of the Resource **/
  name: string;
  /** Tag line of the Resource **/
  tag: string;
  /** Contributors **/
  contributors: string;
  /** Number of likes **/
  likes: number;
  file: ResourceFile;
  testedVersions: Array<string>;
  /** Map of external and custom links in the resource description **/
  links: object;
  rating: ResourceRating;
  /** Release timestamp **/
  releaseDate: number;
  /** Update timestamp **/
  updateDate: number;
  /** Amount of downloads **/
  downloads: number;
  /** Whether this resource is external (not hosted on SpigotMC.org) **/
  external: boolean;
  icon: Icon;
  /** Whether the resource is a premium resource^ **/
  premium: boolean;
  /** Price of the resource (only if the resource is premium) **/
  price: number;
  /** Price Currency of the resource (only if the resource is premium) **/
  currency: string;
  /** List of review IDs on this resource - only present if directly requesting the resource **/
  reviews: Array<IdReference>;
  /** List of version IDs of this resource - only present if directly requesting the resource **/
  versions: Array<IdReference>;
  /** List of update IDs of this resource - only present if directly requesting the resource **/
  updates: Array<IdReference>;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    super(source, spiget);
    if (source !== undefined) {
      if (source.hasOwnProperty("id")) this.id = source.id;
      if (source.hasOwnProperty("name")) this.name = source.name;
      if (source.hasOwnProperty("tag")) this.tag = source.tag;
      if (source.hasOwnProperty("contributors")) this.contributors = source.contributors;
      if (source.hasOwnProperty("likes")) this.likes = source.likes;
      if (source.hasOwnProperty("file")) this.file = this._spiget.__mapType(source.file, ResourceFile);
      if (source.hasOwnProperty("testedVersions")) this.testedVersions = source.testedVersions;
      if (source.hasOwnProperty("links")) this.links = source.links;
      if (source.hasOwnProperty("rating")) this.rating = this._spiget.__mapType(source.rating, ResourceRating);
      if (source.hasOwnProperty("releaseDate")) this.releaseDate = source.releaseDate;
      if (source.hasOwnProperty("updateDate")) this.updateDate = source.updateDate;
      if (source.hasOwnProperty("downloads")) this.downloads = source.downloads;
      if (source.hasOwnProperty("external")) this.external = source.external;
      if (source.hasOwnProperty("icon")) this.icon = this._spiget.__mapType(source.icon, Icon);
      if (source.hasOwnProperty("premium")) this.premium = source.premium;
      if (source.hasOwnProperty("price")) this.price = source.price;
      if (source.hasOwnProperty("currency")) this.currency = source.currency;
      if (source.hasOwnProperty("reviews")) this.reviews = this._spiget.__mapTypeList(source.reviews, IdReference);
      if (source.hasOwnProperty("versions")) this.versions = this._spiget.__mapTypeList(source.versions, IdReference);
      if (source.hasOwnProperty("updates")) this.updates = this._spiget.__mapTypeList(source.updates, IdReference);
    }
  }
}
export default Resource;

import Spiget, {Id} from "../Spiget"
import SpigetType from "../SpigetType"
import ResourceFile from "./ResourceFile";
import ResourceRating from "./ResourceRating";
import Icon from "./Icon";
import ResourceReview from "./ResourceReview";

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
  reviews: Array<ResourceReview>;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    super(source, spiget);
    if (source !== undefined) {
      if (source.hasOwnProperty("id")) this.id = source.id;
      if (source.hasOwnProperty("name")) this.name = source.name;
      if (source.hasOwnProperty("tag")) this.tag = source.tag;
      if (source.hasOwnProperty("contributors")) this.contributors = source.contributors;
      if (source.hasOwnProperty("likes")) this.likes = source.likes;
      if (source.hasOwnProperty("file")) this.file = source.file;
      if (source.hasOwnProperty("testedVersions")) this.testedVersions = source.testedVersions;
      if (source.hasOwnProperty("links")) this.links = source.links;
      if (source.hasOwnProperty("rating")) this.rating = source.rating;
      if (source.hasOwnProperty("releaseDate")) this.releaseDate = source.releaseDate;
      if (source.hasOwnProperty("updateDate")) this.updateDate = source.updateDate;
      if (source.hasOwnProperty("downloads")) this.downloads = source.downloads;
      if (source.hasOwnProperty("external")) this.external = source.external;
      if (source.hasOwnProperty("icon")) this.icon = source.icon;
      if (source.hasOwnProperty("premium")) this.premium = source.premium;
      if (source.hasOwnProperty("price")) this.price = source.price;
      if (source.hasOwnProperty("currency")) this.currency = source.currency;
      if (source.hasOwnProperty("reviews")) this.reviews = source.reviews;
    }
  }
}
export default Resource;

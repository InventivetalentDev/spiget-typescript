import Spiget from "../Spiget"
import SpigetType from "../SpigetType"
import ResourceFile from "./ResourceFile";
import ResourceRating from "./ResourceRating";
import Icon from "./Icon";
import ResourceReview from "./ResourceReview";

/* Generated on Thu, 16 Apr 2020 12:59:02 GMT*/
export class Resource extends SpigetType {
  id: number;
  name: string;
  tag: string;
  contributors: string;
  likes: number;
  file: ResourceFile;
  testedVersions: Array<string>;
  links: object;
  rating: ResourceRating;
  releaseDate: number;
  updateDate: number;
  downloads: number;
  external: boolean;
  icon: Icon;
  premium: boolean;
  price: number;
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

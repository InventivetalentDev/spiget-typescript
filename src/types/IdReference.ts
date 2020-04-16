import Spiget from '../Spiget'

/* Generated on Thu, 16 Apr 2020 10:39:57 GMT*/
export default class IdReference {
  _raw: any;
  _spiget: Spiget;
  $id: number;

  constructor(source: any, spiget: Spiget = new Spiget()) {
    this._raw = source;
    this._spiget = spiget;
    if (source !== undefined) {
      if (source.hasOwnProperty("$id")) this.$id = source.$id;
    }
  }
}

import Spiget from "./Spiget";

export default class SpigetType {
    _raw: any;
    _spiget: Spiget;

    constructor(source: any, spiget: Spiget){
        this._raw = source;
        this._spiget = spiget;
    }
}

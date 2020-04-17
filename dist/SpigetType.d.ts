import Spiget from "./Spiget";
export default class SpigetType {
    _raw: any;
    _spiget: Spiget;
    constructor(source: any, spiget: Spiget);
}
export declare type Constructor<T> = new (source: any, spiget: Spiget) => T;

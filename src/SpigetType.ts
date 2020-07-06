import Spiget from "./Spiget";

export default class SpigetType {

    constructor(
        protected source: any,
        protected spiget: Spiget
    ) {
    }

}

export type Constructor<T> = new(source: any, spiget: Spiget) => T;

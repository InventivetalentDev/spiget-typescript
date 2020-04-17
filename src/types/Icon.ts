import IconBase from "../generated_types/IconBase";

export default class Icon extends IconBase {

    fullUrl() {
        return this._spiget.__spigotMcUrl + this.url;
    }

}

import IconBase from "../generated_types/IconBase";

export default class Icon extends IconBase {

    fullUrl() {
        return this.url.startsWith("http") ? this.url : (this._spiget.__spigotMcUrl + this.url);
    }

}

import ResourceFileBase from "../generated_types/ResourceFileBase";

export default class ResourceFile extends ResourceFileBase {

    fullUrl() {
        return this.url.startsWith("http") ? this.url : (this._spiget.__spigotMcUrl + this.url);
    }

}

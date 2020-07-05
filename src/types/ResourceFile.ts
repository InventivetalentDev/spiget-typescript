import ResourceFileBase from "../generated_types/ResourceFileBase";

export default class ResourceFile extends ResourceFileBase {

    fullUrl() {
        return this.url.startsWith("http") ? this.url : (this.spiget.__spigotMcUrl + this.url);
    }

}

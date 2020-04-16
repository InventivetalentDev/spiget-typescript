import Icon from "../types/Icon";

export default class IconImpl extends Icon {

    fullUrl() {
        return this._spiget.__spigotMcUrl + this.url;
    }

}

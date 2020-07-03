import { Definition } from "./swagger/definition";
import { Generator } from "./generator";

export class ImplementationGenerator implements Generator {

    constructor(
        private definition: Definition
    ) {}

    public generate() {
        // TODO Check if the implementation file exists
        // TODO If not then generator the default implementation
    }

    private write() {
        // TODO Write the import of the base class
        // TODO Write the export of the implementation class that extends the base class
    }

}

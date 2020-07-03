import { Definition } from "./swagger/definition";
import { Generator } from "./generator";

// TODO A list of all implementations created

export class ImplementationGenerator implements Generator {

    constructor(
        private definition: Definition
    ) {}

    public generate() {
        // TODO Check if the implementation file exists
        // TODO If not then generator the default implementation
        // TODO add the implementation to the list
    }

    private write() {
        // TODO Write the import of the base class
        // TODO Write the export of the implementation class that extends the base class
    }

}

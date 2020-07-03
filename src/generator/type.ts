import { Definition } from "./swagger/definition";
import { Generator } from "./generator";

export class TypeGenerator extends Generator {

    constructor(
        private definition: Definition
    ) {
        super("Type");
        // TODO Initialize the class content
        // TODO Initialize the class constructor
    }

    public generate() {
        // TODO Import Spiget + SpigetType
        // TODO For each property and implement it in the content
        // TODO Write everything into the generated file
    }

    private generateProperty() {
        // TODO Check if the property has a description and if so include it as comment
        // TODO Check if it's a number and assume the type is Id ( which is a number by the way )
        // TODO Write the property with the type
        // TODO Write the check if the property exists in the source in the construction
        // TODO Check if there's any required imports to implement 
    }

    private writeProperty() {
        // TODO Write the property name and its type in the content
    }

    private writeConstructorChecker() {
        // TODO Write the if statement to check if the property name exists in the source
        // TODO If so we will take that object and reference it in this object instead of the source object
    }

    private writeImports() {
        // TODO Check if there's any required imports to add it
        // TODO Write it to the imports array
    }

    private save() {
        // TODO if the generated file exists then delete it
        // TODO Open the write stream of generated file to write
        // TODO Write the imports in the file
        // TODO Write the contents in the file
        // TODO Close the write stream
    }

}
